const tasks = dv.current().file.tasks
const percent = Math.round(tasks.filter(x => x.completed).length / tasks.length * 100)
dv.paragraph(`![](https://progress-bar.dev/${percent}/?width=200&title=Progress&color=333333)`)