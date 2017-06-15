import React from 'react'
import {requireFromTarget} from './target'

function Pattern (props) {

    let {category, pattern} = props.params
    let path = [category, pattern + '.md'].join('/')
    let content = requireFromTarget(path)

    return content
}

module.exports = Pattern
