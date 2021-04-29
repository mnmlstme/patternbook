import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { article } from './layout'

function Article({ children }) {
    return <section className={css(classes.article)}>{children}</section>
}

const classes = StyleSheet.create({
    article: {
        display: 'grid',
        gridGap: '2rem',
        gridTemplateRows: 'none',
        gridTemplateColumns: [
            '[start-row] minmax(2rem, 1fr)',
            '[start-left start-aside] minmax(15rem, 3fr)',
            '[start-right end-aside] minmax(5rem, 2fr)',
            '[end-left start-source] minmax(20rem, 5fr)',
            '[end-right end-source] minmax(2rem, 1fr)',
            '[end-row]'
        ].join(' '),
        boxSizing: 'border-box',
        width: '100%',
        minWidth: '45rem',
        margin: '0 auto 4rem auto',
        padding: 0
    }
})

module.exports = Article
