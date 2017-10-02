import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import { article } from './layout'

const reset =
    '.pbReset{fontFamily:Helvetica,Arial,sans-serif}.pbReset * { margin: 0; padding: 0; box-sizing: border-box }'

function Article({ children }) {
    return (
        <section className={css(classes.article)}>
            <style>
                {reset}
            </style>
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
