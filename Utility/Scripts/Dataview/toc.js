/*
Insert a table-of-contents anywhere with:

```dataviewjs
dv.view('toc')
```

You can specify some optional parameters:

```dataviewjs
dv.view('toc', {
    style: '-', // change to bullet style instead of number style
    level: 2, // start at level number X (ignore the levels preceeding that)
    heading: false // disable the "Table of contents" heading
})
```
*/
const startAtLevel = input?.level || 2
const content = await dv.io.load(dv.current().file.path)
const toc = content.match(new RegExp(`^#{${startAtLevel},} \\S.*`, 'mg'))
    .map(heading => {
        const [_, level, text] = heading.match(/^(#+) (.+)$/)
        const link = dv.current().file.path + '#' + text
        return '\t'.repeat(level.length - startAtLevel) + `${input?.style || '1.'} [[${link}|${text}]]`
    })
if (input?.heading !== false) {
    dv.header(2, 'Table of contents')
}
dv.paragraph(toc.join('\n'))
