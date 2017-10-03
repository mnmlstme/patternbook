import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

function Source(props) {
    let { lang, children } = props

    return (
        <div className={css(classes.source)}>
            <h6 className={css(classes.label)}>{lang}</h6>
            <pre className={css(classes.pre)}>
                <code
                    className={
                        css(classes.code) + (lang && ' language-' + lang)
                    }
                >
                    {children}
                </code>
            </pre>
        </div>
    )
}

const classes = StyleSheet.create({
    source: {
        position: 'relative',
        flexGrow: 1,
        margin: '1rem 0',
        fontFamily: 'Input, Courier, monospace',
        fontSize: '.875rem',
        borderLeft: '2px solid rgba(88, 52, 77, 0.4)',
        paddingLeft: '1em'
    },
    label: {
        margin: 0,
        position: 'absolute',
        top: 0,
        right: 0,
        textTransform: 'uppercase',
        opacity: 0.5
    },
    pre: {
        margin: 0
    },
    code: {
        lineHeight: '1.1em'
    }
})

module.exports = Source
