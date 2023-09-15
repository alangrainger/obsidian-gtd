<%*
// New note template configuration

const templatesFolders = ['Utility/Templates/New note templates']
const openNewNoteInSplit = true // Set this to true if you want the new note to open in a split to the right

// -------------------------------------
// Nothing to configure after this point
// -------------------------------------

const templateFiles = []
for (const folder of templatesFolders) {
  const files = (await app.vault.adapter.list(folder))?.files || []
  files.sort((a, b) => a.localeCompare(b)) // Sort alphabetically
  templateFiles.push(...files)
}
if (!templateFiles) return
const templates = templateFiles.map(path => {
  const file = app.vault.getAbstractFileByPath(path)
  const meta = app.metadataCache.getFileCache(file)?.frontmatter || {}
  let title = meta.template_title || ''
  // Date/time placeholder replacement
  const match = title.match(/MOMENT\((.*?)\)/)
  if (match) title = title.replace(/(MOMENT\(.*?\))/, moment().format(match[1]))

  return {
    label: file.basename,
    title,
    templatePath: file.path,
    destinationFolder: meta.template_destination_folder
  }
})

createFromTemplate = async function (templatePath, newNoteName, destinationFolder, openNewNote) {
  destinationFolder = destinationFolder || tp.file.folder(true)
  const newFile = await tp.file.create_new(tp.file.find_tfile(templatePath), newNoteName, openNewNote, app.vault.getAbstractFileByPath(destinationFolder))
  // Remove the template properties from the new file
  app.fileManager.processFrontMatter(newFile, (frontmatter) => {
    delete frontmatter.template_destination_folder
    delete frontmatter.template_title
  })
  return openNewNote ? '' : `[[${newNoteName}]]`
}

const chosen = await tp.system.suggester(templates.map(x => x.label), templates)
if (!chosen) return ''
const name = (await tp.system.prompt('Name for the new file. Will use the current date/time if no value given.', chosen.title || '')) || moment().format('YYYY-MM-DD HH꞉mm꞉ss')
const addLink = await tp.system.suggester(['Yes', 'No'], [true, false], false, 'Insert link in the current file? (Escape = no)')
const destination = chosen.destinationFolder || tp.file.folder(true)
const result = await createFromTemplate(chosen.templatePath, name, destination, !addLink && !openNewNoteInSplit)
if (openNewNoteInSplit) {
  // Open the new file in a pane to the right
  const file = app.vault.getAbstractFileByPath(`${destination}/${name}.md`)
  // Create the new leaf
  const newLeaf = app.workspace.getLeaf('split')
  await newLeaf.openFile(file)
  // Set the view to edit mode
  const view = newLeaf.getViewState()
  view.state.mode = 'source'
  newLeaf.setViewState(view)
  // Give focus to the new leaf
  app.workspace.setActiveLeaf(newLeaf, { focus: true })
  // Move the cursor to the end of the new note
  app.workspace.activeLeaf.view.editor?.setCursor({ line: 999, ch: 0 })
}
return result
%>