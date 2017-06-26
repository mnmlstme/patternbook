import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite/no-important'
const prismCSS = require('prismjs/themes/prism.css').toString()

class Page extends React.Component {
    static childContextTypes = {
        entry: PropTypes.string,
        extension: PropTypes.string,
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
                    <Link to="/">patternbook</Link>
                </header>
                <section className={css(classes.body)}>
                    {this.props.children}
                </section>
                <footer className={css(classes.footer)}>
                    presented by{' '}
                    <a href="https://github.com/mnmlstme/patternbook">
                        patternbook
                    </a>
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
        height: '100%',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0
    },
    header: {
        fontFamily: 'Input, Courier, monospace',
        fontSize: '1.25rem',
        height: '2rem'
    },
    body: {
        padding: '2rem',
        fontSize: '1rem',
        flexGrow: 1,
        overflow: 'auto'
    },
    footer: {
        fontFamily: 'Input, Courier, monospace',
        fontSize: '.75rem',
        height: '1rem'
    }
})

module.exports = Page
