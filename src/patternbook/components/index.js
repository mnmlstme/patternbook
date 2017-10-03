import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import Article from './Article'
import Demo from './Demo'
import Source from './Source'
import Render from './Render'
import Scope from './Scope'

import { article } from './layout'

function Heading({ level, children }) {
    let hN = React.createElement(
        'h' + level,
        {
            className: css(classes.h, classes['h_' + level])
        },
        children
    )

    return (
        <heading className={css(classes.block, classes.heading)}>
            {hN}
        </heading>
    )
}

function Paragraph({ children }) {
    return (
        <p className={css(classes.block, classes.paragraph)}>
            {children}
        </p>
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

const headingOffset = `-${100 * (article.percentLeft / article.percentRight)}%`

const classes = StyleSheet.create({
    block: {
        boxSizing: 'border-box',
        margin: '1rem 0 0 0',
        fontSize: '1rem',
        lineHeight: '1.5rem'
    },
    heading: {
        width: `${100 * article.percent / article.percentRight}%`,
        clear: 'both',
        '::before': {
            // align floated headings with text flow
            content: '""',
            display: 'block',
            height: '1em'
        }
    },
    h: {
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontWeight: 300,
        marginLeft: headingOffset
    },
    h_1: {
        fontSize: '2rem',
        width: '100%',
        marginBottom: '2rem'
    },
    h_2: {
        fontSize: '1.4rem',
        marginBottom: '1rem',
        float: 'left',
        width: `${article.percentLeft}%`,
        paddingRight: '1rem',
        marginTop: '.8rem' // vertical rhythm correction for font-size change
    },
    paragraph: {
        ':first-child': {
            marginTop: 0
        }
    },
    blockquote: {
        padding: '1em 2rem',
        border: '2px solid rgba(88, 52, 77, 0.4)'
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
    Blockquote
}
