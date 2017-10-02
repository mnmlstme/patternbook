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
        margin: '1em 0',
        // flex: '1 1 auto',
        fontFamily: 'Input, Courier, monospace',
        fontSize: '.875rem',
        display: 'inline-block'
    },
    label: {
        margin: 0,
        position: 'absolute',
        top: 0,
        left: '100%',
        paddingLeft: '1rem',
        textTransform: 'uppercase',
        color: 'rgba(0,0,0,0.4)'
    },
    pre: {
        margin: 0
    },
    code: {
        lineHeight: '1.1em'
    }
})

module.exports = Source
