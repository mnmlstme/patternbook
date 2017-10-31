import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite/no-important'
const prismCSS = require('prism-themes/themes/prism-hopscotch.css').toString()

const PREFIX = 'pb-'

let prefixClassCss = s => s.replace(/\.([A-Za-z_]\w*)/g, '.' + PREFIX + '$1')

class Page extends React.Component {
    static childContextTypes = {
        entry: PropTypes.string,
        extension: PropTypes.string,
        themeClass: PropTypes.string,
        requireFromTarget: PropTypes.func,
        stylesheet: PropTypes.string
    }

    getChildContext() {
        return this.props.configuration
    }

    render() {
        let { stylesheet } = this.getChildContext()
        let stylesheet_html = { __html: stylesheet || '' }

        return (
            <article className={css(classes.article)}>
                <style>{'*{margin:0; box-sizing:border-box}'}</style>
                <style>{prefixClassCss(prismCSS)}</style>
                <style dangerouslySetInnerHTML={stylesheet_html} />
                <header className={css(classes.header)}>
                    <Link className={css(classes.link)} to="/">
                        patternbook
                    </Link>
                </header>
                <section className={css(classes.body)}>
                    {this.props.children}
                </section>
                <footer className={css(classes.footer)}>
                    presented by{' '}
                    <a
                        className={css(classes.link)}
                        href="https://github.com/mnmlstme/patternbook">
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
        fontFamily: 'Didot, Cambria, Georgia, serif',
        fontSize: '1.125rem',
        lineHeight: '1.5',
        background: '#faf8fc',
        color: '#7b6073',
        height: '100%',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0
    },
    header: {
        fontFamily:
            'Monaco, Consolas, "Lucida Sans Typewriter", "Lucida Console", monospace',
        color: '#905',
        fontSize: '1.25rem',
        height: '2rem'
    },
    body: {
        flexGrow: 1,
        overflow: 'auto'
    },
    footer: {
        fontSize: '.75rem',
        height: '1rem'
    },
    link: {
        fontFamily:
            'Monaco, Consolas, "Lucida Sans Typewriter", "Lucida Console"',
        color: '#905',
        ':hover': {
            color: '#905'
        }
    }
})

module.exports = Page
