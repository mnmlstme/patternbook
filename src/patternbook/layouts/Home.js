import React from 'react'

function Home(props) {
    let { requireFromTarget } = props.config
    let path = 'README.md'
    let content = requireFromTarget(path)()

    return content
}

module.exports = Home
