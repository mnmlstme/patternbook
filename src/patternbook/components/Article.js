import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { article } from './layout'

function Article({ children }) {
    return (
        <section className={css(classes.article)}>
            {children}
        </section>
    )
}

const classes = StyleSheet.create({
    article: {
        display: 'grid',
        gridGap: '2rem',
        gridTemplateRows: 'none',
        gridTemplateColumns: [
            '[aside-start aside-end wide-start render-start heading-start] minmax(20%, 1fr)',
            '[block-start render-end] minmax(20%, 1fr)',
            '[source-start] minmax(40%, 2fr)',
            '[block-end source-end heading-end]'
        ].join(' '),
        boxSizing: 'border-box',
        width: '100%',
        minWidth: '45rem',
        margin: '0 auto',
        padding: 0
    }
})

module.exports = Article
