import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite/no-important'
const prismCSS = require('prism-themes/themes/prism-hopscotch.css').toString()

const PREFIX = 'pb-'

let prefixClassCss = css =>
    css
        .split('\n')
        .map(
            s =>
                s.match(/^\s*[^@]/)
                    ? s.replace(/(\.)([A-Za-z_]\w*)/gm, '$1' + PREFIX + '$2')
                    : s
        )
        .join('\n')

class Page extends React.Component {
    static childContextTypes = {
        entry: PropTypes.string,
        extension: PropTypes.string,
        themeClass: PropTypes.string,
        importFromTarget: PropTypes.func,
        stylesheet: PropTypes.string,
        reducers: PropTypes.object
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
                        /
                    </Link>
                    <a
                        className={css(classes.link, classes.attribution)}
                        target="_blank"
                        href="https://github.com/mnmlstme/patternbook">
                        patternbook
                    </a>
                </header>
                <section className={css(classes.body)}>
                    {this.props.children}
                </section>
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
        left: 0,
        paddingLeft: '3rem'
    },
    header: {
        fontFamily:
            'Monaco, Consolas, "Lucida Sans Typewriter", "Lucida Console", monospace',
        color: '#905',
        fontSize: '1.25rem',
        height: '100%',
        width: '3rem',
        color: '#faf8fc',
        backgroundColor: '#7b6073',
        textAlign: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: '0.25rem'
    },
    body: {
        flexGrow: 1,
        overflow: 'auto'
    },
    attribution: {
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'rotate(-90deg)',
        transformOrigin: '0 50%'
    },
    link: {
        fontFamily:
            'Monaco, Consolas, "Lucida Sans Typewriter", "Lucida Console"',
        color: 'inherit',
        padding: '0 .25em',
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        border: '1px solid transparent',
        borderRadius: '.25em',
        textDecoration: 'none',
        ':hover': {
            borderColor: 'currentColor'
        }
    }
})

module.exports = Page
