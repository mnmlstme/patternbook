import Patternbook from 'patternbook'

function importFromTarget (path) {
  // Dynamic import
  return import(
    /* webpackInclude: /\.md$/ */
    /* webpackMode: "lazy" */
    `TARGET/${path}` )
}

Patternbook.config({
    importFromTarget
}).render(document.getElementById('patternbook-mountpoint'))
