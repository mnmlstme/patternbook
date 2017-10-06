---
imports:
    Article: ./Article
    Demo: ./Demo
    Source: ./Source
    Render: ./Render
---

Demo
====

```render jsx
<Article>
  <Demo mod="aside">
    <Render mod="aside">
        <h1>
            Hello, World
        </h1>
    </Render>
    <Source lang="html">
      <span class="token tag">
        <span class="token tag">
          <span class="token punctuation">&lt;</span>
          h1
        </span>
        <span class="token punctuation">&gt;</span>
      </span>
      {'\n    Hello, World\n'}
      <span class="token tag">
        <span class="token tag">
          <span class="token punctuation">&lt;/</span>
          h1
        </span>
        <span class="token punctuation">&gt;</span>
      </span>
    </Source>
  </Demo>
</Article>
```

`Demo` is used to present, side-by-side or stacked vertically,
the rendering and source of examples that appear
in Patternbook Markdown code fences.
The body of the `Demo` component contains one `Render`
component and one `Source` component.
This means the example is actually entered twice—once as
JSX and once as escaped and highlighted code.
The `demo` code fence handles this duplication automatically
so the example only needs to be entered once in Patternbook Markdown.

```demo jsx wide
<Article>
  <Demo>
    <Render>
        <a href="/home">Time to go home</a>
    </Render>
    <Source lang="html">
      <span class="token tag">
        <span class="token tag">
          <span class="token punctuation">&lt;</span>
          a
        </span>
        <span class="token attr-name"> href</span>
        <span class="token attr-value">
          <span class="token punctuation">=</span>
          <span class="token punctuation">"</span>
          /home
          <span class="token punctuation">"</span>
        </span>
        <span class="token punctuation">&gt;</span>
      </span>
      Time to go home
      <span class="token tag">
        <span class="token tag">
          <span class="token punctuation">&lt;/</span>
          a
        </span>
        <span class="token punctuation">&gt;</span>
      </span>
    </Source>
  </Demo>
  <p>This is the text that comes after the example.</p>
</Article>
```
