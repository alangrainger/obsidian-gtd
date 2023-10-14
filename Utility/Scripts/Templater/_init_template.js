function main(target) {
  const dv = app.plugins.plugins.dataview.api
  const tp = app.plugins.plugins['templater-obsidian'].templater.current_functions_object

  target.app = app
  target.dv = dv
  target.tp = tp
  target.page = dv.page(tp.file.path(true))
  target.file = target.page.file
  target.view = app.workspace.activeLeaf.view

  target.sleep = async function (ms) {
    await new Promise(resolve => setTimeout(resolve, ms))
  }

  /**
   * Create a new file from a template, and return the link or open the file
   * @param {string} templatePath 
   * @param {string} newNoteName 
   * @param {string} destinationFolder - Path to the destination folder. Defaults to current folder
   * @param {boolean} openNewNote - Open the note in a new window, or return a link
   * @returns 
   */
  target.createFromTemplate = async function (templatePath, newNoteName, destinationFolder, openNewNote) {
    destinationFolder = destinationFolder || tp.file.folder(true)
    await tp.file.create_new(tp.file.find_tfile(templatePath), newNoteName, openNewNote, app.vault.getAbstractFileByPath(destinationFolder))
    return openNewNote ? '' : `[[${newNoteName}]]`
  }

  /**
   * Returns true if file is in editing mode
   * @returns {boolean}
   */
  target.isEditMode = function () {
    const curr = app.workspace.activeLeaf.getViewState()
    return curr.state.mode === 'source'
  }

  /**
   * Set file to edit or read mode
   * @param {boolean} canEdit 
   */
  target.setEditMode = function (canEdit) {
    const curr = app.workspace.activeLeaf.getViewState()
    curr.state.mode = canEdit ? 'source' : 'preview'
    app.workspace.activeLeaf.setViewState(curr)
    if (canEdit) {
      target.view.editor?.focus()
    }
  }

  /**
   * Get the text contents of a file, specified by string path
   * @param {string} [path] Optional path, otherwise use current file
   */
  target.getContents = async function (path) {
    const file = app.vault.getAbstractFileByPath(path || target.tp.file.path(true))
    return app.vault.read(file)
  }

  /**
   * Replace the contents of a file
   * @param {string} contents The new file contents
   * @param {string} [path] Optional path, otherwise use current file
   * @returns 
   */
  target.setContents = async function (contents, path) {
    const file = app.vault.getAbstractFileByPath(path || target.tp.file.path(true))
    return app.vault.modify(file, contents)
  }

  /**
   * Get the text of the current line, or false if not in editing mode
   * @returns {false|string}
   */
  target.getCurrentLine = function () {
    if (!target.isEditMode()) {
      // Not in edit mode, current line is unknowable
      return false
    } else {
      const lineNumber = target.view.editor.getCursor().line
      return target.view.editor.getLine(lineNumber)
    }
  }

  /**
   * set the text of the current line, if in editing mode
   * @param {string}
   * @returns {boolean}
   */
  target.setCurrentLine = function (newLineContent) {
    if (!target.isEditMode()) {
      // Not in edit mode, current line is unknowable
      return false
    } else {
      const lineNumber = target.view.editor.getCursor().line
      target.view.editor.setLine(lineNumber, newLineContent)
      // move cursor to end of line
      target.view.editor.setCursor({ line: lineNumber, ch: newLineContent.length })

      return true
    }
  }

  target.goToFile = async function (path) {
    const file = app.vault.getAbstractFileByPath(path)
    if (path !== target.file.path) {
      await app.workspace.getLeaf(false).openFile(file)
    }
  }
}
module.exports = main
