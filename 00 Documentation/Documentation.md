---
obsidianUIMode: preview
---
# Documentation

```dataviewjs
dv.view('toc')
```

## How to set up

1. [Download the GTD demo vault](https://github.com/alangrainger/obsidian-gtd/archive/refs/heads/main.zip) and test it out. This is an already-configured working vault which will give you an idea of whether you like the system, and what features of it you might want to implement in your own vault.
2. The "brains" of the system is a single Dataview script: [tasks.js](tasks.js.md). You can put this anywhere in your vault and Dataview will find it. I personally like to put all my scripts in a single folder, like `Utility/Scripts/Dataview`.
3. You can optionally add the Task Menu template to allow you to quickly perform actions via a hotkey. [Installation instructions are here](Task%20menu%20template.md).

## Tasks

> [!info] A sidenote about tasks
> 
> A "task" in GTD is more correctly termed a [Next Action](GTD/Next%20Actions.md). I'll be using the term "task" just to make things simple. Here's a [refresher course on next actions](GTD/Next%20Actions.md), including [the difference between a Next Action list and a standard task list](GTD/Next%20Actions.md#Why%20a%20"Next%20Action%20list"%20is%20so%20critical%20compared%20to%20a%20task%20list).

### Your Master Task List

Your tasks from everywhere in your vault are collected into a single master task list: [✅ Tasks](../01%20Project%20Management/✅%20Tasks.md). It is split up into five sections:

1. **⚠️ Projects without next actions**. Any project that shows up in this list needs you to go in and add "the next visible physical activity required to move the project forward" [(see GTD docs)](https://gettingthingsdone.com/2011/02/how-is-a-next-action-list-different-from-a-to-do-list/).
2. **🔼 Priority**. These are next actions that you have marked as priority.
3. **⏳ Waiting on**. Tasks which are waiting for someone else to take an action before you can move to the next step.
4. **✅ Next actions**. Every other actionable item that is not priority.
5. **💤 Someday**. A someday/maybe list is where you track anything that you might want to do "some day". 

### Next Actions list

The master task list will automatically collect tasks from anywhere in your vault, it doesn't matter. But if you want to add individual tasks in a single location, you can use the [📝 Next actions list](../01%20Project%20Management/📝%20Next%20actions%20list.md).

As you get more and more completed tasks on that page, you'll likely want to [Clean-up/Archive completed tasks](#Clean-up/Archive%20completed%20tasks).

### Excluding tasks

Sometimes you want to add tasks/todos that you don't want included in your master task list. There are a few ways of doing this:

#### Exclude all tasks in a note

To exclude all tasks in a note from your master task list, add the tag #exclude-master-tasklist anywhere in the note. Because I have just used the tag, every task in this readme is helpfully excluded from the master task list.

#### Exclude tasks under a named heading

Have a look at [this daily note](../Periodic%20notes/2023-08-18.md) for an example. There is a **🌱 Daily Habits** section where I'm tracking the habits I want to do each day. I don't want these to show up in my master task list, so I have excluded it in the configuration in [tasks.js](tasks.js.md):

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

This is especially important for excluding your templates folder. Just add the folder(s) into the configuration section in [tasks.js](tasks.js.md)

```js
const globalExclude = {
  folders: [
    '99 Utility',
    'Add any folders you like...'
  ]
}
```

### Capturing tasks on mobile

Capturing tasks quickly on Obsidian mobile can be quite a pain. When you need it the most it's gone into deep hibernation and takes about 20 seconds to start up.

You can create your own quick-add tool for Android like this: [Mobile quick add](Mobile%20quick%20add.md)

## Projects

### Creating a project

Add the tag #project into any note and you're done - it's now a project. The note can be located anywhere in your vault. I put most of my projects into `02 Project Management/Projects` for easy management, but it's not necessary.

### Master projects list

You can find a list of all your projects in the [🗃️ Projects list](../01%20Project%20Management/🗃️%20Projects%20list.md) page. This is a basic [Dataview query](https://blacksmithgu.github.io/obsidian-dataview/queries/structure/), so you can customise this however you like.

### Sequencing tasks

Inside a project, by default tasks inside each heading block are treated as steps that need to be completed sequentially (i.e. each task is dependent on the one before).

In [this example project](../01%20Project%20Management/Projects/Overhaul%20TPS%20reports%20system.md), the task to meet with David is waiting for the first task to be completed before it will show up in the task list.

![600](attachments/Pasted%20image%2020230820170011.png)

**If you don't want the tasks inside a project to be sequential**, you can include the 🟰 emoji anywhere in the heading for that section, and the tasks will be treated as if they are to be done in parallel.

## Statuses

### Priority

Pure GTD [doesn't make distinctions for priority](https://gettingthingsdone.com/2008/08/determining-priority-gtd-style/) in the context of your actions list, but it's nice to have a way to indicate what you should be working on first. In my Obsidian setup, there are no levels of priority, just a flag for "is priority" or not.

To mark any **task** as priority, add the 🔼 symbol anywhere in the task text.

To mark a **project** as priority, add a #🔼 tag. All of the tasks in this project will be marked as priority automatically.

### Waiting on

Quickly create a new #waiting-on task by using the `Alt+T` hotkey and choosing `Insert waiting on task`. This is useful when you're in a sequence of tasks in a project. You'll need to set up the [Task menu template](Task%20menu%20template.md) for this to work.

### Someday/Maybe

To flag a task as someday/maybe, just add the tag #someday to the task. You can toggle this quickly by using the task hotkey `Alt+T` and choosing `Toggle #someday`. You'll need to set up the [Task menu template](Task%20menu%20template.md) for this to work.

## Clean-up/Archive completed tasks

If you have a lot of completed tasks on a page and want to archive them to a central location, there's a handy shortcut for that.

On any page press `Alt+T` and choose `Archive/Remove completed tasks`. This will move tasks from that page to the [🗄️ Completed tasks](../01%20Project%20Management/🗄️%20Completed%20tasks.md) page. You'll need to set up the [Task menu template](Task%20menu%20template.md) for this to work.