import React from 'react'

function DefaultRenderer (props) {
    let { source } = props

    return <div>{source}</div>
}

module.exports = { renderer: DefaultRenderer };
