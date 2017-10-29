---
imports:
    Home: ../layouts/Home.js
scope:
    hero: http://unsplash.it/1000/200
    landscape: http://unsplash.it/960/720
---

```jsx render hero
<div style={{width: '100%', height: '100%', backgroundImage: hero, backgroundSize: 'cover'}}/>
```

Example
====

This is a typical block context example:

```jsx demo
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
<button style={{backgroundColor: 'blue', color: 'white'}}>Click me</button>
```

This demo expands to fill the width but has its own height:

```jsx demo
<img src={landscape} style={{maxWidth: '100%'}}/>
```

This demo is wide:

```jsx demo wide
<table width="100%">
    <tr> <td>Vanilla</td> <td>Chocolate</td> <td>Strawberry</td> </tr>
</table>
```

This demo needs to have a width and a height on its container:

```jsx demo pane
<div style={{width: '100%', height: '100%', backgroundImage: landscape, backgroundSize: 'cover'}}/>
```

This demo is a reduced copy of the entire screen:

```jsx demo screen
<Home>
</Home>
```

The `Home` layout is only used for the very first page of
the patternbook, the one based (by default) on `README.md`
