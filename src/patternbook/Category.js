import React from 'react'
import {requireFromTarget} from './target'

function Category (props) {

    let {category} = props.params
    let path = [category, 'index.md'].join('/')
    let content = requireFromTarget(path)

    return content
}

module.exports = Category
