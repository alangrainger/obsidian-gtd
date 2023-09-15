---
obsidianUIMode: preview
---
# Start here

If you want to jump straight in and see it in action, here's the [Master Task List](01%20Project%20Management/✅%20Tasks.md).

> 👉 **NOTE:** This file is part of an [Obsidian](https://obsidian.md/) vault. You should be viewing this file through Obsidian, not Github.

# GTD in Obsidian

## Introduction

For a long time I resisted doing my task management in Obsidian. I've always worked in the GTD task management style, and I found that there were two critical functions that I could not do in Obsidian: Sequencing of tasks in a project, and having a project appear in your next actions list *when it has no tasks* - e.g. when you need to add a next action to it.

After some trial-and-error, I managed to write a workable implementation with Dataview. Even if you don’t use GTD or don’t want to implement it the same way, there are quite likely some useful gems in this script - for example having Dataview display a project info line underneath a task.

## Features

- Task sequencing
- Priority, Waiting-On, and Someday tasks
- Notification of projects without next actions
- Requires only the Dataview plugin to be installed (Templater is also recommended)
- Compatible with Tasks plugin
- If a task is part of a project, the project information is displayed along with the task in the master task list
- Everything is done from a single Dataview script, which makes it highly configurable and adaptable for almost any use case

![](00%20Documentation/attachments/Pasted%20image%2020230821133422.png)

## Why a Dataview script and not a plugin?

GTD implementations are quite specific. Everybody likes to set theirs up “just so” in their own custom way - for example the layout of your master task list or projects list page. It’s **hard** to modify a plugin, and impossible to cover every use case. It’s (fairly) easy to modify a Dataview script to customise it exactly how you want.

## How to set up

1. [Download the GTD demo vault](https://github.com/alangrainger/obsidian-gtd/archive/refs/heads/main.zip) and test it out. This is an already-configured working vault which will give you an idea of whether you like the system, and what features of it you might want to implement in your own vault.
2. The "brains" of the system is a single Dataview script: [tasks.js](00%20Documentation/tasks.js.md). You can put this anywhere in your vault and Dataview will find it. I personally like to put all my scripts in a single folder, like `Utility/Scripts/Dataview`.
3. You can optionally add the [Task Menu template](00%20Documentation/Task%20menu%20template.md) from the `Utility/Scripts/Templater` and `Utility/Templates` folders. If you use this template, make sure to assign it to a hotkey.

## Get help / send feedback

Visit the [discussion on the Obsidian forum](https://forum.obsidian.md/t/65502).

## Next steps

[See it in action](01%20Project%20Management/✅%20Tasks.md) or [Check out the documentation](00%20Documentation/Documentation.md)
