const tasks = dv.current().file.tasks
const percent = Math.round(tasks.filter(x => x.completed).length / tasks.length * 100)
dv.paragraph(`<progress max="100" value="${percent}"></progress> ${percent}%`)
