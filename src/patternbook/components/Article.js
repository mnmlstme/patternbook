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
        boxSizing: 'border-box',
        width: `${article.percent}%`,
        margin: '0 auto',
        padding: 0,
        paddingLeft: `${article.percentLeft}%`,
        '::after': {
            content: '""',
            display: 'block',
            clear: 'both',
            height: 0
        }
    }
})

module.exports = Article
