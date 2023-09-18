---
exclude_master_tasklist: true
obsidianUIMode: preview
---
# Task menu template

There is an optional [Templater](https://github.com/SilentVoid13/Templater) template which you can assign to a hotkey, to give a handy task menu. The default hotkey is `Alt+T`.

![](attachments/Pasted%20image%2020230821132802.png)

The template requires two things to work:

1. The [Tasks menu.md](../Utility/Templates/Tasks%20menu.md) template file. This needs to be placed in your Templater **Template folder location**.
2. The two Templater user scripts in the `Utilty/Scripts/Templater` folder: [_init_template.js](https://github.com/alangrainger/obsidian-gtd/blob/main/Utility/Scripts/Templater/_init_template.js) and [templater_tasks.js](https://github.com/alangrainger/obsidian-gtd/blob/main/Utility/Scripts/Templater/templater_tasks.js). These need to be placed in your Templater **User Scripts folder**.

## Insert task

This is a quick way to add a task on any page. If the page is in **reading mode**, it will set the page to edit mode and then add the task at the end of the page.

If the page is in **edit mode**, it will add a new task where the cursor is, adding a line-break if necessary. Tasks will be added with a created date, using the Tasks plugin [created date format](https://publish.obsidian.md/tasks/Getting+Started/Dates#Created+date), like this:

- [ ] Here's an example task showing a created date ➕2023-08-21

If you don't like having the date you can remove it from the template.

## Insert waiting on task

This will pre-populate the new task with the #waiting-on tag:

- [ ] `#waiting-on` Dave to deliver the report ➕2023-08-21

## Toggle somedate

Toggles the `#someday` tag on the current task.

## Archive/Remove completed tasks

Will move all completed tasks from the current page to the [🗄️ Completed tasks](../01%20Project%20Management/🗄️%20Completed%20tasks.md) page. This is especially handy for cleaning up the [📝 Next actions list](../01%20Project%20Management/📝%20Next%20actions%20list.md).

To use this feature you will need to configure the location of the note you want to store your completed tasks. On line 5 of `templater_tasks.js`, change this to be the full path to your desired note:

```javascript
const completedTasksNote = '01 Project management/🗄️ Completed tasks.md'
```
