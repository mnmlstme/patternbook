import React from 'react'

function Pattern (props) {

    let content = getContent(props.params)

    return content

    function getContent (params) {
        let category = params.category
        let pattern = params.pattern
        let path = [category, pattern + '.md'].join('/')
        // dynamic require
        let content = require('../../patterns/' + path);
        if ( typeof content !== 'function' ) {
            // loader not upgraded to webpack 2 ?
            content = content.default()
        }
        return content
    }
}

module.exports = Pattern
