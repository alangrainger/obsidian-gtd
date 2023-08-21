---
obsidianUIMode: preview
---

```dataviewjs
dv.view('toc')
```


## Tasks

A "task" in GTD is more correctly termed a [[Next Actions|Next Action]]. I'll be using the term "task" just to make things simple. Here's a [[Next Actions|refresher course on next actions]], including [[Next Actions#Why a "Next Action list" is so critical compared to a task list|the difference between a Next Action list and a standard task list]].

### Your Master Task List

Your tasks from everywhere in your vault are collected into a single master task list: [[✅ Tasks]]. It is split up into four sections:

1. **⚠️ Projects without next actions**. Any project that shows up in this list needs you to go in and add "the next visible physical activity required to move the project forward" [(see GTD docs)](https://gettingthingsdone.com/2011/02/how-is-a-next-action-list-different-from-a-to-do-list/).
2. **🔼 Priority**. These are next actions that you have marked as priority.
3. **✅ Next actions**. Every other actionable item that is not priority.
4. **💤 Someday**. A someday/maybe list is where you track anything that you might want to do "some day". 

### Next Actions list

The master task list will automatically collect tasks from anywhere in your vault, it doesn't matter. But if you want to add individual tasks in a single location, you can use the [[📝 Next actions list]] list.

As you get more and more completed tasks on that page, you'll likely want to [[#Clean-up/Archive completed tasks]].

### Excluding tasks

Sometimes you want to add tasks/todos that you don't want included in your master task list. There are a few ways of doing this:

#### Exclude all tasks in a note

To exclude all tasks in a note from your master task list, add the tag #exclude-master-tasklist anywhere in the note. Because I have just used the tag, every task in this readme is helpfully excluded from the master task list.

#### Exclude tasks under a named heading

Have a look at [[2023-08-18|this daily note]] for an example. There is a **🌱 Daily Habits** section where I'm tracking the habits I want to do each day. I don't want these to show up in my master task list, so I have excluded it in the configuration in [[02 Documentation/tasks.js|tasks.js]]:

```js
const globalExclude = {
  headings: [
    '🌱 Daily Habits'
  ]
}
```

#### Exclude tasks under a heading via tag #exclude

You can also exclude tasks under a heading by adding #exclude to that heading.

#### Exclude all tasks in a folder and sub-folders

This is especially important for excluding your templates folder. Just add the folder(s) into the configuration section in [[02 Documentation/tasks.js|tasks.js]].

```js
const globalExclude = {
  folders: [
    '99 Utility',
    'Add any folders you like...'
  ]
}
```

## Projects

### Creating a project

Add the tag #project into any note and you're done - it's now a project. The note can be located anywhere in your vault. I put most of my projects into `02 Project Management/Projects` for easy management, but it's not necessary.

### Master projects list

You can find a list of all your projects in the [[🗃️ Projects list]] master list page. This is a basic [Dataview query](https://blacksmithgu.github.io/obsidian-dataview/queries/structure/), so you can customise this however you like.

### Sequencing tasks

Inside a project, by default tasks inside each heading block are treated as steps that need to be completed sequentially (i.e. each task is dependent on the one before).

In [[Overhaul TPS reports system|this example project]], the task to meet with David is waiting for the first task to be completed before it will show up in the task list.

![[Pasted image 20230820170011.png|600]]

**If you don't want the tasks inside a project to be sequential**, you can include the 🟰 emoji anywhere in the heading for that section, and the tasks will be treated as if they are to be done in parallel.

## Priority

Pure GTD [doesn't make distinctions for priority](https://gettingthingsdone.com/2008/08/determining-priority-gtd-style/) in the context of your actions list, but it's nice to have a way to indicate what you should be working on first. In my Obsidian setup, there are no levels of priority, just a flag for "is priority" or not.

To mark any **task** as priority, add the 🔼 symbol anywhere in the task text.

To mark a **project** as priority, add a #🔼 tag. All of the tasks in this project will be marked as priority automatically.

## Someday/Maybe

To flag a task as someday/maybe, just add the tag #someday to the task. You can toggle this quickly by using the task hotkey `Alt+T` and choosing `Toggle #someday`.

## Clean-up/Archive completed tasks

If you have a lot of completed tasks on a page and want to archive them to a central location, there's a handy shortcut for that.

On any page press `Alt+T` and choose `Archive/Remove completed tasks`. This will move tasks from that page to the [[🗄️ Completed tasks]] page.