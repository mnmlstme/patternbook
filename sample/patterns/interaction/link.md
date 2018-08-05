---
theme: ../Theme.jsx
styles:
    - ./link.css
scope:
    linktext: Interaction
---

# Links

Links are created using plain HTML; styling is added by using
the `link` class.

```html demo aside
This is a link to <a class="link" href="./">the current folder</a>.
```

Even when writing plain HTML, you can use JSX as a templating engine
Just remember to use `className` to `class`.

```jsx demo aside
This is a link to <a className="link" href="./">{linktext}</a>.
```
