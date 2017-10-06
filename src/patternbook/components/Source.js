import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

function Source(props) {
    let { lang, mod, children } = props
    let mods = mod ? mod.split(' ') : []

    return (
        <div
            className={css(
                classes.source,
                mods.map(m => classes['source_' + m])
            )}
        >
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
        border: 'solid rgba(88, 52, 77, 0.4)',
        borderWidth: '0 1px',
        paddingLeft: '1em'
    },
    source_demo: {
        margin: 0
    },
    label: {
        margin: 0,
        padding: '.25em 0',
        position: 'absolute',
        bottom: '100%',
        right: '100%',
        transformOrigin: 'bottom right',
        transform: 'rotate(-90deg)',
        fontWeight: 300,
        textTransform: 'uppercase',
        opacity: 0.4
    },
    pre: {
        margin: 0
    },
    code: {
        lineHeight: '1.1em'
    }
})

module.exports = Source
