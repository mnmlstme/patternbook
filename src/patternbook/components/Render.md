---
imports:
    Render: ./Render
    Article: ./Article
---

Render
====

```render jsx
<Article>
    <Render>
        <button>Hit me</button>
    </Render>
    <p>Here is a button</p>
</Article>
```

The `Render` component is used to display the rendered output
of the components in the demos (when the `render` and `demo`
custom code fences are used in patternbook Markdown).

By default, the rendered output area is about half the width
of the page layout.  But if the fence has additional words after
the language, those are passed to `Render` through the `mod`
property. For example, to get a wide rendering area, use:

```markdown
    ```render html wide
    <table width="100%"> ... </table>
    ```
```

> Note that on this page, because `Render` is being used to render
> itself, you will see two sets of registration marks, one for the
> outer render of the example, and one for the `Render` component
> which appears in the examples

`mod="aside"`
----

The `aside` modifier causes the rendered area to be placed aside the
flow of text, to the left.  If the rendering is too large to fit
in the left margin, it will push text over.

```demo jsx wide
<Article>
  <p>Stuff before...</p>
  <Render mod="aside">
    <button>Click me</button>
  </Render>
  <p>Stuff after...</p>
</Article>
```

`mod="wide"`
----

The `wide` modifier is used to make the rendered output as wide
as possible, within the constraints of the page layout.
This is useful for demoing layouts which are wide but flexible.

```demo jsx wide
<Article>
  <p>Stuff before...</p>
  <Render mod="wide">
    <article>
      <table width="100%"><tbody><tr>
        <th><h1>My Left Side</h1></th>
        <th><h1>My Right Side</h1></th>
      </tr></tbody></table>
    </article>
  </Render>
  <p>Stuff after...</p>
 </Article>
```

`mod="screen"`
----

The `screen` modifier causes the rendered content to be reduced
in size so that a full screen can be shown in a limited space.
This is useful for demoing layouts which use viewport (`vw`, `vh`)
units or would otherwise not fit within the page layout.

```demo jsx wide
<Article>
  <p>Stuff before...</p>
  <Render mod="screen">
    <article style={{
        height: "100vh",
        width: "100vw",
        padding: "20%",
        border: "1px solid"}}>
      <h1>My Page</h1>
      <p>Here is my new page.</p>
    </article>
  </Render>
  <p>Stuff after...</p>
</Article>
```
