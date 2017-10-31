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
            <pre
                className={css(classes.pre) + ' language-' + (lang || 'markup')}
                dangerouslySetInnerHTML={code}
            />
        </div>
    )
}

const classes = StyleSheet.create({
    source: {
        gridColumn: 'start-source / end-source',
        position: 'relative',
        fontSize: '.875rem',
        lineHeight: 'inherit',
        opacity: 0.8,
        transition: 'opacity 500ms',
        ':hover': {
            opacity: 1
        }
    },
    source_aside: {
        gridColumn: 'end-aside / end-right'
    },
    source_wide: {
        gridColumn: 'start-left / end-right'
    },
    source_hero: {
        gridColumn: 'start-left / end-right',
        height: '3em',
        transform: 'translate(0,-2rem)',
        opacity: 0.2,
        ':hover': {
            height: 'auto'
        }
    },
    label: {
        fontFamily: 'Futura, Geneva, "Gill Sans", "Trebuchet MS", sans-serif',
        fontSize: '8px',
        margin: 0,
        position: 'absolute',
        top: '.5em',
        right: '.5em',
        fontWeight: 300,
        textTransform: 'uppercase',
        color: '#322931',
        background: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '2px',
        padding: '.25em',
        lineHeight: 1
    },
    pre: {
        maxHeight: '100%',
        // override PrismJS and theme
        margin: '0 !important',
        whiteSpace: 'pre !important',
        fontSize: 'inherit !important',
        lineHeight: 'inherit !important'
    }
})

module.exports = Source
