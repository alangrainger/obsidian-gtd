<%* 
// Get the list of people
const people = app.plugins.plugins.dataview.api.pages('"People"')
  .sort(x => x.file.inlinks.length, 'desc')
  .file.name

// Pop the suggester
const person = await tp.system.suggester(people.map(x => x.replace(/^\W+/, '')), people)

return person ? `[[${person}]] ` : ''
%>