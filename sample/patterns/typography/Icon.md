---
imports:
    Icon: ./Icon.jsx
symbols:
    circle: ./svg/circle.svg
    opencircle: ./svg/opencircle.svg
    content: ./svg/content.svg
    fontsize: ./svg/fontsize.svg
    pagesize: ./svg/pagesize.svg
    scale: ./svg/scale.svg
    fullscreen: ./svg/fullscreen.svg
---

# Icons

Icons are produced as SVG and injected as `<symbol>`s
into the page.
They are referenced via the `<Icon>` component,
which generates an SVG `<use>` element.

```jsx demo aside
<Icon symbol="circle"/>
<Icon symbol="opencircle"/>
<Icon symbol="content"/>
<Icon symbol="fontsize"/>
<Icon symbol="pagesize"/>
<Icon symbol="scale"/>
<Icon symbol="fullscreen"/>
```
