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
        fontFamily: 'Input, Courier, monospace',
        fontSize: '.875rem'
    }
})

module.exports = Source
