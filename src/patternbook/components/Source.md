---
imports:
    Source: ./Source
---

Source
====

```jsx render aside
<Source lang="html">
&lt;h1&gt;
{"\n   "}Hello, World
{"\n"}&lt;/h1&gt;
</Source>
```

`Source` is used to present source code that appears
in Patternbook Markdown code fences.
The body of the `Source` component contains the code,
and needs to be HTML/JSX escaped, including newlines and
whitespace (which are not significant in HTML/JSX)

```jsx demo
<Source lang="html">
&lt;a href=&quot;/home&quot;&gt;
{"\n    "}Time to go home
{"\n"}&lt;a&gt;
</Source>
```
