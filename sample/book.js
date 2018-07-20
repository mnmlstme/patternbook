import Patternbook from 'patternbook'

console.log('import Patternbook:', Patternbook)

function requireFromTarget (path) {
  // Dynamic import
  const chunkName = path.replace(/[^a-zA-Z_0-9]/, '_' )
  const fullPath = 'TARGET/' + path

  return import( /* webpackChunkName: chunkName*/ fullPath )
    .then( content => content )
    .catch( error => 'Error while loading "' + fullPath + '":' + error )
}

Patternbook.config({
    requireFromTarget
}).render(document.getElementById('patternbook-mountpoint'))
