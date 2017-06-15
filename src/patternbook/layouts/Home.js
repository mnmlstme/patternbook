import React from 'react'
import {requireFromTarget} from './target'

function Home (props) {

    let path = 'README.md'
    let content = requireFromTarget(path)

    return content
}

module.exports = Home
