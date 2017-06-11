import React from 'react'

function Category (props) {

    let content = getContent(props.params)

    return content

    function getContent (params) {
        let category = params.category
        let path = [category, 'index.md'].join('/')
        // dynamic require
        let content = require('../../patterns/' + path);
        if ( typeof content !== 'function' ) {
            // loader not upgraded to webpack 2 ?
            content = content.default()
        }
        return content
    }
}

module.exports = Category
