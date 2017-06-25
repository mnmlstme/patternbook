import Patternbook from 'patternbook'

Patternbook.config({
    requireFromTarget: path => require('TARGET/' + path)
}).render(document.getElementById('patternbook-mountpoint'))
