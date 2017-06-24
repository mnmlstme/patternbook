import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite/no-important'
const prismCSS = require('prismjs/themes/prism.css').toString()

class Page extends React.Component {
    static childContextTypes = {
        entry: PropTypes.string,
        requireFromTarget: PropTypes.func
    }

    getChildContext() {
        return this.props.configuration
    }

    render() {
        return (
            <article className={css(classes.article)}>
                <style>
                    {['body,h1,h2{margin:0;}', '*{box-sizing:border-box}'].join(
                        '\n'
                    )}
                </style>
                <style>{prismCSS}</style>
                <header className={css(classes.header)}>
                    patternbook
                </header>
                <section className={css(classes.body)}>
                    {this.props.children}
                </section>
                <footer className={css(classes.footer)}>
                    presented by patternbook
                </footer>
            </article>
        )
    }
}

const classes = StyleSheet.create({
    article: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Georgia, serif',
        background: '#f1eeee',
        color: '#58344d',
        minHeight: '100vh'
    },
    header: {
        fontFamily: 'Input, Courier, monospace',
        fontSize: '1.25rem',
        height: '2rem'
    },
    body: {
        margin: '2em',
        fontSize: '1rem',
        flexGrow: 1
    },
    footer: {
        fontFamily: 'Input, Courier, monospace',
        fontSize: '.75rem',
        height: '1rem'
    }
})

module.exports = Page
