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
            className: css(
                classes.block,
                classes.heading,
                classes['heading_' + level]
            )
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
        boxSizing: 'border-box',
        marginLeft: headingOffset,
        fontSize: '1rem',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontWeight: 'normal',
        clear: 'left'
    },
    heading_1: {
        fontSize: '2rem',
        marginBottom: '2rem',
        width: '100%'
    },
    heading_2: {
        fontSize: '1.4rem',
        marginBottom: '1rem',
        float: 'left',
        paddingRight: '1rem',
        marginTop: '.8rem' // vertical rhythm correction for font-size change
    },
    paragraph: {},
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
    Paragraph
}
