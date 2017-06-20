---
theme: '../Theme.jsx'

imports:
    Button: './Button.jsx'

scope:
    label: 'Hit me'
    count: 0
---

Button
====

The button component creates buttons.

```render html
<Button onClick={() => dispatch(RESET)}>
    Reset
</Button>
```

Buttons look like this:

```show html
<Button onClick={() => dispatch(SET, {count: count + 1})}>
    {label}
</Button>
<p>{count}</p>
```
