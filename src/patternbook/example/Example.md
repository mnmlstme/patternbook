---
imports:
    Home: ../layouts/Home.js
scope:
    hero: http://unsplash.it/1000/200
    landscape: http://unsplash.it/960/720
---

```jsx demo hero
<div style={{
    width: '100%',
    height: '100%',
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover'}}/>
```

Example
====

This is a typical block context example:

```html demo
<p>
    One morning, when
    <a href="/">Gregor Samsa</a>
    woke from
    troubled dreams, he found himself transformed
    in his bed into a horrible vermin.
    He lay on his armour-like back, and if he lifted
    his head a little he could see his brown belly,
    slightly domed and divided
    by arches into stiff sections.
</p>
```

This example is a small inline element which can be shown `aside`:

```jsx demo aside
<button style={{backgroundColor: 'blue', color: 'white'}}>
    Click me
    </button>
```

This demo expands to fill the width but has its own height:

```jsx demo
<img src={landscape}
    style={{maxWidth: '100%'}}/>
```

This is what happens when you put wide content into a default demo:

```jsx demo
<div style={{width: '60vw'}}>
    <table width="100%">
        <tr> <td>Vanilla</td> <td>Chocolate</td> <td>Strawberry</td> </tr>
    </table>
</div>
```

This demo is `wide`:

```html demo wide
<table width="100%">
    <tr> <td>Vanilla</td> <td>Chocolate</td> <td>Strawberry</td> </tr>
</table>
```

This demo is rendered in a `pane`, which sets a fixed width and height:

```jsx demo pane
<div style={{
    width: '100%',
    height: '100%',
    backgroundImage: `url(${landscape})`,
    backgroundSize: 'cover'}}/>
```

This demo is a reduced copy of the entire `screen`:

```jsx demo screen
<Home>
</Home>
```

Typography can be **strong** or _emphasized_

> This is a Blockquote
> that should be inset

This is a Markdown table:

column A | column B | column C
--- |:---:| ---:
left | centered | right
