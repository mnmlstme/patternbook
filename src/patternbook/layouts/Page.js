import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
let prismCSS = require('prismjs/themes/prism.css').toString()

//const { StyleSheet: newStyleSheet, css: newCss } = StyleSheet.extend([myExtension]);

function Page(props) {
    return (
        <article className={css(classes.article)}>
            <style>{'body { margin: 0; }'}</style>
            <style>{prismCSS}</style>
            <header className={css(classes.header)}>
                <h6> patternbook </h6>
            </header>
            <section className={css(classes.body)}>
                {props.children}
            </section>
            <footer className={css(classes.footer)}>
                presented by patternbook
            </footer>
        </article>
    )
}

const classes = StyleSheet.create({
    article: {
        fontFamily: 'Georgia, serif',
        background: '#faf8f8'
    },
    header: {
        fontFamily: 'Input, Courier, monospace',
        fontSize: '1.25rem'
    },
    body: {
        margin: '2em',
        fontSize: '1rem'
    },
    footer: {
        fontFamily: 'Input, Courier, monospace',
        fontSize: '.75rem'
    }
})

module.exports = Page
