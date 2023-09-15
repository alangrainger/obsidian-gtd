/*
 * ---------------------
 * CONFIGURATION OPTIONS
 * ---------------------
 *
 * Add the folders, tags, and headings which should be excluded.
 * Tasks found on pages with these tags or paths will not appear in the Tasks page.
 * Headings will to exclude tasks that fall under a heading with this name.
 */
const globalExclude = {
  folders: [
    'Utility'
  ],
  tags: [
    '#exclude-master-tasklist',
    '#completed'
  ],
  headings: [
    '🌱 Daily Habits'
  ]
}
/*
 * When displaying tasks from a project, tasks that fall under headings with these
 * names won't have these headings displayed when showing the project info
 */
const hideSubsectionName = [
  'Todo',
  'Tasks'
]

/*
 * ----------------------------
 * END OF CONFIGURATION OPTIONS
 * ----------------------------
 */

// Set up the variables to store the tasks and projects
const tasks = []
const noNextAction = []
const excludeItems = ['', ...globalExclude.tags]
globalExclude.folders.forEach(folder => excludeItems.push(`"${folder}"`))
const globalExcludeString = excludeItems.join(' AND -')

// Define groups for master tasklist page
const Groups = {
  Waiting:  0,
  Priority: 1,
  Normal:   2,
  Someday:  3
}

/**
 * Take a task and the page it's from, and return a formatted element for the tasks array
 * @param {*} task 
 * @param {*} page 
 * @returns {object}
 */
function generateTaskElement(task, page) {
  let group = Groups.Normal
  if (task.tags.includes('#someday')) {
    group = Groups.Someday
  } else if (task.tags.includes('#waiting-on')) {
    group = Groups.Waiting
  } else if (task.text.includes('🔼') || page.tags.includes('#🔼')) {
    group = Groups.Priority
  }
  return {
    task: task,
    date: (page.created ? page.created.ts || moment(page.created).valueOf() : null) || page.ctime.ts,
    group: group
  }
}

/*
 * Process projects
 */
dv.pages('#project' + globalExcludeString).file
  .forEach(project => {
    const sections = []
    if (!project.tasks.filter(t => !t.completed && t.text).length) {
      // There is no next action for this project
      noNextAction.push(project)
    } else {
      project.tasks
        .where(t => !t.completed && t.text)
        .forEach(task => {
          const sectionName = task.section.subpath || 'root'
          // Select only the first task from each section. This allows task sequencing.
          if ((!sections.includes(sectionName) && !sectionName.includes('exclude')) || sectionName.includes('🟰')) {
            sections.push(sectionName)
            let subSection = ''
            let headingLine = 1
            if (
              // There is a subpath/heading
              task.section.subpath &&
              // And it's not one of our whitelisted headings which don't require a notated sub-section
              !hideSubsectionName.includes(sectionName) &&
              // And it doesn't match the project name
              sectionName !== project.name.replace(/\W/g, ' ')
            ) {
              // Add it as a sub-section to the project name
              subSection = ` > ${sectionName}`
              // Find the line-position of the heading for this task
              const file = app.fileManager.vault.getAbstractFileByPath(project.path)
              const headings = app.metadataCache.getFileCache(file).headings
              const match = headings.find(x => x.heading === sectionName)
              headingLine = match ? match.position.start.line : task.line - 1
            }
            // By adding this subtask, we can get a sub-line with the project and/or heading names
            task.subtasks.push({
              children: [],
              path: task.path,
              link: task.link,
              line: headingLine, // We need this to be able to jump to the heading when clicked
              lineCount: task.lineCount,
              position: task.position,
              text: `🗃️ *${project.name}${subSection}*`
            })
            tasks.push(generateTaskElement(task, project))
          }
        })
    }
  })

/*
 * Process tasks
 */
dv.pages('-#project' + globalExcludeString)
  .where(p => p.file.tasks.length && !p['kanban-plugin'] && !p['exclude_master_tasklist']).file
  .forEach(page => {
    page.tasks
      .where(t =>
        t.text && // where the task has text (is not blank)
        !t.completed && // and not completed
        !t.tags.includes('#exclude') && // and not excluded
        (!t.header.subpath || !t.header.subpath.includes('exclude')) &&
        !globalExclude.headings.includes(t.header.subpath) // and the heading is not excluded
      )
      .forEach(task => tasks.push(generateTaskElement(task, page)))
  })

// Sort tasks into groups, then ascending by created time
tasks.sort((a, b) => a.group - b.group || a.date - b.date)

/**
 * Output a formatted task list
 * @param {number|null} group - Filter for tasks in a particular group, or null for all tasks
 * @param {string|null} header - The text header for the task list
 */
function taskList(group, header) {
  const list = isNaN(group) ? tasks : tasks.filter(x => x.group === group)
  if (list.length) {
    if (header) dv.header(2, header)
    dv.taskList(list.map(x => x.task), false)
  }
}

// Projects without next action
if (noNextAction.length) {
  dv.header(2, '🚩 Projects without next actions')
  dv.list(noNextAction.map(p => p.link))
}

// Output the task list
taskList(Groups.Priority, '🔼 Priority',)
taskList(Groups.Waiting,  '⏳ Waiting on...')
taskList(Groups.Normal,   '✅ Next actions')
taskList(Groups.Someday,  '💤 Someday')
