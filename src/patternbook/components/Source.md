---
imports:
    Source: ./Source
---

Source
====

```jsx render aside
<Source lang="html">
&lt;h1&gt;{" "}
    Hello, World{" "}
&lt;/h1&gt;
</Source>
```

`Source` is used to present source code that appears
in Patternbook Markdown code fences.
The body of the `Source` component contains the code,
and needs to be HTML/JSX escaped.

```jsx demo
<Source lang="html">
&lt;a href=&quot;/home&quot;&gt;{" "}
    Time to go home{" "}
&lt;a&gt;{" "}
</Source>
```
