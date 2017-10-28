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
        gridTemplateColumns: '3fr 4fr',
        boxSizing: 'border-box',
        width: '100%',
        minWidth: '45rem',
        margin: '0 auto',
        padding: 0
    }
})

module.exports = Article
