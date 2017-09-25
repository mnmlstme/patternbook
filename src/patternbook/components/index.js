import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import Show from './Show'
import Source from './Source'
import Render from './Render'
import Scope from './Scope'

function Article({ children }) {
    return (
        <section className={css(classes.article)}>
            {children}
        </section>
    )
}

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

const classes = StyleSheet.create({
    article: {
        width: '80vw',
        margin: '0 auto',
        padding: 0,
        paddingLeft: '20vw'
    },
    block: {
        margin: '1rem 0 0 0',
        fontSize: '1rem',
        lineHeight: '1.5rem'
    },
    heading: {
        marginLeft: '-20vw',
        fontSize: '1rem',
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontWeight: 'normal'
    },
    heading_1: {
        fontSize: '2rem',
        marginBottom: '1em'
    },
    heading_2: {
        fontSize: '1.4rem',
        width: '20vw',
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
    Show,
    Source,
    Render,
    Scope,
    Article,
    Link,
    Heading,
    Paragraph
}
