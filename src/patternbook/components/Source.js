import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import { article } from './layout'
import textContent from 'react-addons-text-content'

let Prism = require('prismjs')
// disable Prism's auto-highlighting, thank you.
document.removeEventListener('DOMContentLoaded', Prism.highlightAll)
require('prismjs/components/prism-jsx')

function highlight(code, lang) {
    const language = Prism.languages[lang] || Prism.languages.markup
    return Prism.highlight(code, language)
}

function Source(props) {
    let { lang, mod, children } = props
    let mods = mod ? mod.split(' ') : []
    let content = textContent(children).replace(/^\s+/, '')
    let code = { __html: highlight(content, lang) }

    return (
        <div
            className={css(
                classes.source,
                mods.map(m => classes['source_' + m])
            )}>
            <h6 className={css(classes.label)}>{lang}</h6>
            <pre className={css(classes.pre)}>
                <code
                    className={
                        css(classes.code) + (lang && ' language-' + lang)
                    }
                    dangerouslySetInnerHTML={code}
                />
            </pre>
        </div>
    )
}

const classes = StyleSheet.create({
    source: {
        gridColumn: 'block-start / block-end',
        position: 'relative',
        fontSize: '.875rem'
    },
    source_demo: {},
    label: {
        fontFamily: 'Futura, Geneva, "Gill Sans", "Trebuchet MS", sans-serif',
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
        fontFamily:
            'Monaco, Consolas, "Lucida Sans Typewriter", "Lucida Console"',
        ':nth-child(1n) .tag': {
            // Prism override
            padding: 0
        }
    }
})

module.exports = Source
