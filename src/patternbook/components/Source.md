---
imports:
    Source: ./Source
---

Source
====

```render jsx aside
<Source lang="html">
  <span class="token tag">
    <span class="token tag">
      <span class="token punctuation">&lt;</span>
      h1
    </span>
    <span class="token punctuation">&gt;</span>
  </span>
  {'\n  Hello, World\n'}
  <span class="token tag">
    <span class="token tag">
      <span class="token punctuation">&lt;/</span>
      h1
    </span>
    <span class="token punctuation">&gt;</span>
  </span>
</Source>
```

`Source` is used to present source code that appears
in Patternbook Markdown code fences.
The body of the `Source` component contains the code,
and may be marked up for syntax highlighting.

```demo jsx
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
```
