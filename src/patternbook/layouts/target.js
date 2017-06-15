

function requireFromTarget (path) {
    // dynamic require from 'target' alias
    let fn = require('TARGET/' + path);

    if ( typeof fn !== 'function' ) {
        // loader not upgraded to webpack 2 ?
        fn = fn.default()
    }

    return fn()
}


module.exports = {
    requireFromTarget
}
