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
of the components in the demos (custom code fences
in Markdown).

By default, the rendered output area is about half the width
of the page layout.

Mod 'aside'
----

```demo jsx
<Article>
  <p>Stuff before...</p>
  <Render mod="aside">
    <button>Click me</button>
  </Render>
  <p>Stuff after...</p>
</Article>
```

Mod `wide`
----

```demo jsx
<Article>
  <p>Stuff before...</p>
  <Render mod="wide">
    <article>
      <table width="100%">
        <tbody>
          <tr>
            <td>
              <h1>My Left Side</h1>
            </td>
            <td>
              <h1>My Right Side</h1>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  </Render>
  <p>Stuff after...</p>
 </Article>
```

The `wide` modification is used to make the rendered output as wide
as possible, within the constraints of the page layout.
This is useful for demoing layouts which are wide but flexible.

Mod `screen`
----

```demo jsx
<Article>
  <p>Stuff before...</p>
  <Render mod="screen">
    <article style={{margin: "25vh 25vw", border: "1px solid"}}>
      <h1>My Page</h1>
      <p>Here is my new page.</p>
    </article>
  </Render>
  <p>Stuff after...</p>
</Article>
```

The `screen` modification cause the rendered content to be reduced
in size so that a full screen can be shown in a limited space.
This is useful for demoing layouts which use viewport (`vw`, `vh`)
units or would otherwise not fit within the page layout.
