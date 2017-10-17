import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { article } from './layout'

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
        gridColumn: 'block-start / block-end',
        position: 'relative',
        fontFamily: 'Input, Courier, monospace',
        fontSize: '.875rem'
    },
    source_demo: {},
    label: {
        margin: 0,
        position: 'absolute',
        bottom: '100%',
        left: 0,
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
