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
        background: 'rgba(0,50,50,.2)',
    }
})

module.exports = Source
