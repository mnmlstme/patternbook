import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import textContent from 'react-addons-text-content'
import { Link as RRLink } from 'react-router-dom'

import Article from './Article'
import Source from './Source'
import Render from './Render'
import Demo from './Demo'
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
    return (
        <ul className={css(classes.block, classes.list, classes.ulist)}>
            {children}
        </ul>
    )
}

function OList({ start, children }) {
    return (
        <ol
            start={start}
            className={css(classes.block, classes.list, classes.olist)}>
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

function Strong({ children }) {
    return <strong className={css(classes.strong)}>{children}</strong>
}

function Emphasis({ children }) {
    return <em className={css(classes.emphasis)}>{children}</em>
}

function Link({ to, children }) {
    const ReactRouter = require('react-router')

    // Note: ReactRouter Link does not properly handle relative paths in the `to` prop
    if (to.startsWith('/')) {
        return (
            <RRLink to={to} className={css(classes.link)}>
                {children}
            </RRLink>
        )
    } else {
        return (
            <a href={to} className={css(classes.link)}>
                {children}
            </a>
        )
    }
}

function Code({ children }) {
    let text = textContent(children)

    return <code className={css(classes.code)}>{text}</code>
}

function Table({ children }) {
    return (
        <table className={css(classes.block, classes.table)}>{children}</table>
    )
}

function THead({ children }) {
    return <thead className={css(classes.thead)}>{children}</thead>
}

function TBody({ children }) {
    return <tbody className={css(classes.tbody)}>{children}</tbody>
}

function TRow({ children }) {
    return <tr className={css(classes.trow)}>{children}</tr>
}

function TData({ children, align }) {
    return (
        <td
            className={css(
                classes.tdata,
                classes['talign_' + (align || 'left')]
            )}>
            {children}
        </td>
    )
}

function THeading({ children, align }) {
    return (
        <th
            className={css(
                classes.theading,
                classes['talign_' + (align || 'left')]
            )}>
            {children}
        </th>
    )
}

const classes = StyleSheet.create({
    block: {
        gridColumn: 'start-right / end-right',
        font: 'inherit',
        lineHeight: '1.5em',
        padding: 0,
        margin: 0,
        color: 'inherit'
    },
    h: {
        fontFamily: 'Futura, "Gill Sans", "Trebuchet MS", sans-serif',
        lineHeight: '1.2em'
    },
    h_1: {
        gridColumn: 'start-left / end-right',
        fontSize: '4rem',
        marginBottom: '4rem'
    },
    h_2: {
        gridColumn: 'start-aside / end-aside',
        fontSize: '1.4rem',
        marginBottom: '2rem'
    },
    paragraph: {},
    list: {
        paddingLeft: '2rem',
        ':nth-child(1n) > li': {
            padding: 0,
            margin: 0,
            lineHeight: '1.5'
        },
        ':nth-child(1n) > li + li': {
            marginTop: '0.5em'
        }
    },
    ulist: {
        listStyleType: 'disc'
    },
    olist: {
        listStyleType: 'decimal'
    },
    blockquote: {
        fontFamily: 'Futura, "Gill Sans", "Trebuchet MS", sans-serif',
        fontStyle: 'oblique',
        padding: '1em 4rem',
        fontSize: '1.2rem',
        borderLeft: '2px solid rgba(0,0,0,0.2)'
    },
    link: {
        fontFamily: 'Futura, "Gill Sans", "Trebuchet MS", sans-serif',
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
        fontSize: '85%',
        textShadow: '0 1px white'
    },
    strong: {
        fontFamily: 'Futura, "Gill Sans", "Trebuchet MS", sans-serif',
        fontWeight: 500
    },
    emphasis: {
        fontFamily: 'Futura, "Gill Sans", "Trebuchet MS", sans-serif',
        fontStyle: 'oblique'
    },
    table: {
        fontFamily: 'Futura, "Gill Sans", "Trebuchet MS", sans-serif',
        fontSize: '85%',
        border: 'none',
        borderSpacing: 0
    },
    thead: {
        fontWeight: 500
    },
    tbody: {
        fontWeight: 300
    },
    trow: {},
    tdata: {
        fontWeight: 300,
        padding: '.25em .5em',
        borderBottom: '1px solid #ccc'
    },
    theading: {
        fontWeight: 600,
        padding: '.25em .5em',
        borderTop: '1px solid',
        borderBottom: '1px solid',
        backgroundColor: 'rgba(200, 200, 200, 0.5)'
    },
    talign_left: {
        textAlign: 'left'
    },
    talign_right: {
        textAlign: 'right'
    },
    talign_center: {
        textAlign: 'center'
    }
})

module.exports = {
    Article,
    Source,
    Render,
    Scope,
    Demo,
    Link,
    Code,
    Heading,
    Paragraph,
    UList,
    OList,
    Table,
    THead,
    TBody,
    TRow,
    TData,
    THeading,
    Blockquote,
    Strong,
    Emphasis
}
