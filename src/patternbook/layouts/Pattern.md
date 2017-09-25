---
imports:
    Pattern: ./Pattern.js
---

Home
----
The `Pattern` layout displays a single pattern, which usually
corresponds to a single component.
It may contain multiple examples of the pattern, but all examples
run in the same scope, using the same data.

```show html screen
<Pattern params={{splat: 'layouts', pattern: 'Pattern'}}>
</Pattern>
```
