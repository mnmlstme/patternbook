---
imports:
    Button: ./Button.jsx

scope:
    label: Hit me
    count: 5

messages:
    Set: scope.Set
    Reset: scope.Reset
---

# Button

```jsx render hero
<Button onClick={() => dispatch(Reset())}>
    Reset
</Button>
```

The button component creates buttons.

```jsx demo
<Button onClick={() => dispatch(Set({count: count - 1}))}>
    {label}
</Button>
<p>{count}</p>
```

Buttons usually have an action set via the `onClick` property.
