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
                <style>{'body { margin: 0; }'}</style>
                <style>{prismCSS}</style>
                <header className={css(classes.header)}>
                    <h6> patternbook </h6>
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
        fontFamily: 'Georgia, serif',
        background: '#f1eeee',
        color: '#58344d',
        minHeight: '100vh'
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
