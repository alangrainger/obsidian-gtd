---
name: <% tp.file.title.replace('@', '') %>
tags: person
created: <% moment().format() %>
template_title: "👤"
template_destination_folder: People
---
# <% tp.file.title.replace('👤', '') %>



```dataviewjs
await dv.view("Scripts/Dataview/mentions-table", 3)
```

