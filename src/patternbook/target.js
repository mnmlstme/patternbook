

function requireFromTarget (path) {
    // dynamic require from 'target' alias
    let content = require('TARGET/' + path);

    if ( typeof content !== 'function' ) {
        // loader not upgraded to webpack 2 ?
        content = content.default()
    }

    return content
}


module.exports = {
    requireFromTarget
}
