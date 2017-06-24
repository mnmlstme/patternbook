import React from 'react'

function Home(props) {
    let { requireFromTarget } = props.config
    // TODO: use mainFiles to set README
    let path = 'README'
    let content = requireFromTarget(path)()

    return content
}

module.exports = Home
