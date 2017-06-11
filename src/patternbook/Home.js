import React from 'react'

function Home (props) {

    let content = getContent()

    return content

    function getContent () {
        let path = 'README.md'
        // dynamic require
        let content = require('../../patterns/' + path);
        if ( typeof content !== 'function' ) {
            // loader not upgraded to webpack 2 ?
            content = content.default()
        }
        return content
    }
}

module.exports = Home
