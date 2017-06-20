import React from 'react'
import {StyleSheet, css} from 'aphrodite/no-important'

//const { StyleSheet: newStyleSheet, css: newCss } = StyleSheet.extend([myExtension]);

function Page (props) {
    return (
        <article className={css(classes.article)}>
            <header>
                <h6> patternbook </h6>
            </header>
            {props.children}
            <footer>
                presented by patternbook
            </footer>
        </article>
    )
}

const classes = StyleSheet.create({
    article: {
        fontFamily: 'Georgia, serif'
    }
})

module.exports = Page
