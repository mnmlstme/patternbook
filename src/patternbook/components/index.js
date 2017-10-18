import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import textContent from 'react-addons-text-content'

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

function Code({ children }) {
    let text = textContent(children)

    return <code className={css(classes.code)}>{text}</code>
}

const classes = StyleSheet.create({
    block: {
        gridColumn: 'block-start / block-end',
        lineHeight: '1.5'
    },
    h: {
        fontFamily: 'Futura, Geneva, "Gill Sans", "Trebuchet MS", sans-serif'
    },
    h_1: {
        gridColumn: 'heading-start / heading-end',
        fontSize: '4rem',
        fontWeight: 300,
        marginBottom: '4rem'
    },
    h_2: {
        gridColumn: 'aside-start / aside-end',
        fontSize: '1.4rem',
        fontWeight: 900,
        marginBottom: '2rem'
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
        fontWeight: 500,
        letterSpacing: '0.05em',
        border: '2px solid rgba(0,0,0,0.2)'
    },
    link: {
        fontFamily: 'Futura, Geneva, "Gill Sans", "Trebuchet MS", sans-serif',
        color: 'inherit',
        padding: '0 .25em',
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        border: '1px solid transparent',
        borderRadius: '.25em',
        textDecoration: 'none',
        ':hover': {
            borderColor: 'currentColor'
        }
    },
    code: {
        fontFamily:
            'Monaco, Consolas, "Lucida Sans Typewriter", "Lucida Console"',
        color: '#905',
        fontWeight: 600
    }
})

module.exports = {
    Article,
    Source,
    Render,
    Scope,
    Link,
    Code,
    Heading,
    Paragraph,
    UList,
    OList,
    Blockquote
}
