import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import Article from './Article'
import Source from './Source'
import Render from './Render'
import Scope from './Scope'

import { article } from './layout'

function Heading({ level, children }) {
    return React.createElement(
        'h' + level,
        {
            className: css(classes.block, classes.h, classes['h_' + level])
        },
        children
    )
}

function Paragraph({ children }) {
    return <p className={css(classes.block, classes.paragraph)}>{children}</p>
}

function UList({ children }) {
    return <ul className={css(classes.block, classes.ulist)}>{children}</ul>
}

function OList({ start, children }) {
    return (
        <ol start={start} className={css(classes.block, classes.olist)}>
            {children}
        </ol>
    )
}

function Blockquote({ children }) {
    return (
        <blockquote className={css(classes.block, classes.blockquote)}>
            {children}
        </blockquote>
    )
}

function Link({ to, children }) {
    const ReactRouter = require('react-router')

    // Note: Link does not properly handle relative paths in the `to` prop

    return (
        <ReactRouter.Link to={to} className={css(classes.link)}>
            {children}
        </ReactRouter.Link>
    )
}

const classes = StyleSheet.create({
    block: {
        gridColumn: 'block-start / block-end',
        lineHeight: '1.5rem'
    },
    h: {
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontWeight: 300
    },
    h_1: {
        gridColumn: 'heading-start / heading-end',
        fontSize: '2rem'
    },
    h_2: {
        gridColumn: 'aside-start / aside-end',
        fontSize: '1.4rem'
    },
    paragraph: {},
    ulist: {
        paddingLeft: '2rem',
        listStyleType: 'disc'
    },
    olist: {
        paddingLeft: '2rem',
        listStyleType: 'decimal'
    },
    blockquote: {
        padding: '1em 4rem',
        fontSize: '120%',
        fontStyle: 'italic'
    },
    link: {
        textDecoration: 'none',
        ':hover': {
            textDecoration: 'underline'
        }
    }
})

module.exports = {
    Article,
    Source,
    Render,
    Scope,
    Link,
    Heading,
    Paragraph,
    UList,
    OList,
    Blockquote
}
