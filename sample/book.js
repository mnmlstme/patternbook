import Patternbook from 'patternbook'

console.log('import Patternbook:', Patternbook)

Patternbook.config({
    requireFromTarget: path => require('TARGET/' + path)
}).render(document.getElementById('patternbook-mountpoint'))
