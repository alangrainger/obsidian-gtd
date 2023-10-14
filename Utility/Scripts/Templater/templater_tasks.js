/*
 * Set this to be the full path for the note where you want to store your completed tasks
 * Docs: https://github.com/alangrainger/obsidian-gtd/blob/main/00%20Documentation/Task%20menu%20template.md#archiveremove-completed-tasks
*/
const completedTasksNote = '01 Project Management/🗄️ Completed tasks.md'
const taskLinePattern = /^[ \t]*- \[[ x]\]/

const isLineATask = (line) => line.match(taskLinePattern) !== null

const toggleIndicator = (note, indicator) => {
  if (!note.isEditMode()) {
    // Not in editing mode, so it's uncertain which task we want to affect
    return ''
  }
  const line = note.getCurrentLine()
  if (!isLineATask(line)) {
    return
  }
  const indicatorWithWhitespacePattern = new RegExp(` *${indicator} *`, 'g')

  if (line.match(indicator)) {
    // remove indicator anywhere in the line including adjacent whitespace and trim the end of it
    note.setCurrentLine(line.replaceAll(indicatorWithWhitespacePattern, ' ').trimEnd())
    return
  } else {
    // append indicator to end of line
    note.setCurrentLine(`${line} ${indicator}`)
    return
  }
}

class main {
  constructor() {
    const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object
    tp.user._init_template(this)
  }

  async openMenu() {
    const options = [
      {
        label: 'Insert task',
        function: this.insertNewTask
      },
      {
        label: 'Insert waiting on task',
        function: this.insertNewTask,
        params: {
          type: 'waiting-on'
        }
      },
      {
        label: 'Toggle #someday',
        function: this.toggleSomeday
      },
      {
        label: 'Toggle priority 🔼',
        function: this.togglePriority
      },
      {
        label: 'Archive/Remove completed tasks',
        function: this.removeCompletedTasks
      }
    ]

    const chosen = await this.tp.system.suggester(options.map(x => x.label), options)
    if (chosen) {
      return chosen.function(this, chosen.params)
    } else {
      return ''
    }
  }

  /**
   * Inserts a new task. 
   * If the file is in edit mode, it inserts the task at the current position. 
   * If the file is in read mode, it changes to edit mode and adds the task at the end of the file.
   */
  insertNewTask(note, params) {
    if (!note.isEditMode()) {
      // File is currently in Read mode
      note.setEditMode(true)
      note.view.editor.setCursor({ line: 999, ch: 999 }) // Move the cursor to the end of the file
    }
    const cursor = note.view.editor.getCursor()
    const currentLine = note.getCurrentLine()
    let prefix = '- [ ] '
    if (currentLine === prefix) {
      prefix = '' // We're already on a new task line
    } else if (cursor.ch > 0) {
      prefix = '\n' + prefix
    }

    const taskCreated = '➕' + moment().format('YYYY-MM-DD')
    let task = ` ${taskCreated}`

    if (params) {
      if (params.type === 'waiting-on') {
        task = `#waiting-on  ${taskCreated}`
      }
    }

    setTimeout(() => {
      // After inserting the task, move the cursor before the date-added value.
      // Yes a timeout is a "bad" way to do this, but it's simple and it works.
      const cursor = note.view.editor.getCursor()
      cursor.ch -= (taskCreated.length + 1)
      note.view.editor.setCursor(cursor)
    }, 150)

    return prefix + task
  }

  toggleSomeday(note) {
    toggleIndicator(note, '#someday')
    return ''
  }

  togglePriority(note) {
    toggleIndicator(note, '🔼')
    return ''
  }

  async removeCompletedTasks(note) {
    if (note.file.path === completedTasksNote) {
      // Don't perform archive function if we're inside the completed tasks note
      return
    }

    // Find all completed tasks in the current note
    const currentNoteContents = await note.getContents()
    const taskRegex = /(?<=(^|\n))[ \t]*- \[x\].*?(\n|$)/sg
    const completedTasks = currentNoteContents.match(taskRegex)

    if (!completedTasks) {
      // Don't perform archive function if there is nothing to archive
      return
    }

    // Append tasks to the achive completed tasks note
    let completedNoteContent = await note.getContents(completedTasksNote)
    completedNoteContent += completedTasks
      .map(task => {
        task = task.trimEnd()
        // Check to see if there is a completed date in the task, and add one if it's not there
        if (!task.match(/✅\s?\d{4}-\d{2}-\d{2}/)) {
          task += ' ✅' + moment().format('YYYY-MM-DD')
        }
        return task + '\n'
      })
      .join('')
    note.setContents(completedNoteContent, completedTasksNote).then()

    // Remove tasks from the current note
    await note.setContents(currentNoteContents.replace(taskRegex, ''))
  }
}
module.exports = main
