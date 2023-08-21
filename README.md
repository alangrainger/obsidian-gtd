---
obsidianUIMode: preview
---
# GTD in Obsidian

## Introduction

For a long time I resisted doing my task management in Obsidian. I've always worked in the GTD task management style, and I found that there were two critical functions that I could not do in Obsidian: Sequencing of tasks in a project, and having a project appear in your next actions list *when it has no tasks* - e.g. when you need to add a next action to it.

After some trial-and-error, I managed to write a workable implementation with Dataview. Even if you don't use GTD or don't want to implement it the same way, there are quite likely some useful gems in this script - for example having Dataview display a project info line underneath a task.

## Features

- Task sequencing
- Priority, Waiting-On, and Someday tasks
- Notification of projects without next actions
- Requires only the Dataview plugin to be installed (Templater is also recommended)
- Compatible with Tasks plugin
- If a task is part of a project, the project information is displayed along with the task in the master task list
- Everything is done from a single Dataview script, which makes it highly configurable and adaptable for almost any use case

![](02%20Documentation/attachments/Pasted%20image%2020230821133422.png)

## How to set up

1. [Download the GTD demo vault](https://github.com/alangrainger/obsidian-gtd/archive/refs/heads/main.zip) and test it out. This is an already-configured working vault which will give you an idea of whether you like the system, and what features of it you might want to implement in your own vault.
2. The "brains" of the system is a single Dataview script: [tasks.js](02%20Documentation/tasks.js.md). You can put this anywhere in your vault and Dataview will find it. I personally like to put all my scripts in a single folder, like `Utility/Scripts/Dataview`.
3. You can optionally add the [Task Menu template](02%20Documentation/Task%20menu%20template.md) from the `Utility/Scripts/Templater` and `Utility/Templates` folders. If you use this template, make sure to assign it to a hotkey.

## Next steps

[See it in action](01%20Project%20Management/✅%20Tasks.md) or [Check out the documentation](02%20Documentation/How%20this%20works.md)
