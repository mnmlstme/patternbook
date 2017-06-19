import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

function Source (props) {
    let {lang, children, styles} = props

    return (
        <pre className={css(classes.source, styles)}>
            <code className={lang && 'language-' + lang}>
                {children}
            </code>
        </pre>
    )
}

const classes = StyleSheet.create({
    source: {
        margin: '1em 4em',
        background: 'rgba(0,50,50,.2)',
        padding: '.5em',
    }
})

module.exports = Source
