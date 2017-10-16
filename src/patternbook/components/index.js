import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import Article from './Article'
import Demo from './Demo'
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
    return (
        <p className={css(classes.block, classes.paragraph)}>
            {children}
        </p>
    )
}

function UList({ children }) {
    return (
        <ul className={css(classes.block, classes.ulist)}>
            {children}
        </ul>
    )
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
        flex: `0 ${article.percentTotal}%`,
        boxSizing: 'border-box',
        margin: '1rem 0 0 0',
        paddingLeft: `${article.percentLeft}%`,
        lineHeight: '1.5rem',
        ':first-child': {
            marginTop: 0
        }
    },
    h: {
        paddingLeft: 0,
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontWeight: 300
    },
    h_1: {
        flex: `0 ${article.percentTotal}%`,
        alignSelf: 'flex-start',
        fontSize: '2rem',
        marginBottom: '2rem'
    },
    h_2: {
        flex: `0 ${article.percentLeft}%`,
        alignSelf: 'flex-start',
        ':nth-child(1n) + *': {
            flex: `1 ${article.percentRight}%`,
            paddingLeft: 0
        },
        fontSize: '1.4rem',
        marginBottom: '1rem',
        paddingRight: '1rem'
    },
    paragraph: {},
    ulist: {
        ':nth-child(1n) > li': {
            marginLeft: '2rem'
        }
    },
    olist: {
        ':nth-child(1n) > li': {
            marginLeft: '2rem'
        }
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
    Demo,
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
