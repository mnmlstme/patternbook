import React from 'react'

function Category(props) {
    let { requireFromTarget } = props.config
    let { category } = props.params
    let path = [category, 'index.md'].join('/')
    let content = requireFromTarget(path)()

    return content
}

module.exports = Category
