---
obsidianUIMode: preview
---
# tasks.js

This is the main Dataview script and is located in:

```
Utility/Scripts/Dataview/tasks.js
```

You may wish to edit the configuration at the top of the file. Full explanation of all options is found in the [Documentation](Documentation.md).

This is the default configuration:

```js
/*
 * ---------------------
 * CONFIGURATION OPTIONS
 * ---------------------
 *
 * Add the folders, tags, and headings which should be excluded.
 * Tasks found on pages with these tags or paths will not appear in the Tasks page.
 * Headings will to exclude tasks that fall under a heading with this name.
 */
const globalExclude = {
  folders: [
    'Utility'
  ],
  tags: [
    '#exclude-master-tasklist',
    '#completed'
  ],
  headings: [
    '🌱 Daily Habits'
  ]
}
/*
 * When displaying tasks from a project, tasks that fall under headings with these
 * names won't have these headings displayed when showing the project info
 */
const hideSubsectionName = [
  'Todo',
  'Tasks'
]
```
