import React from 'react'

import Show from './Show'
import Source from './Source'
import Render from './Render'
import Scope from './Scope'

function Article({ children }) {
    return (
        <section>
            {children}
        </section>
    )
}

function Heading({ level, children }) {
    let tag = 'h' + level
    return React.createElement(tag, {}, children)
}

function Link({ to, children }) {
    const ReactRouter = require('react-router')

    // Note: Link does not properly handle relative paths in the `to` prop

    return (
        <ReactRouter.Link to={to}>
            {children}
        </ReactRouter.Link>
    )
}

module.exports = {
    Show,
    Source,
    Render,
    Scope,
    Article,
    Link,
    Heading
}
