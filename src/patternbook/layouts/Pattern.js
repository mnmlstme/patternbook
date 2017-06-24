import React from 'react'

function Pattern(props) {
    let { requireFromTarget } = props.config
    let { category, pattern } = props.params
    let path = [category, pattern + '.md'].join('/')
    let content = requireFromTarget(path)()

    return content
}

module.exports = Pattern
