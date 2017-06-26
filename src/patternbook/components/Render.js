import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import DefaultTheme from '../themes/DefaultTheme'

function Render(props) {
    let { children, size, theme } = props
    let Theme = theme || DefaultTheme

    return (
        <div className={css(classes.render, classes['render_' + size])}>
            <div className={css(classes.content, classes['content_' + size])}>
                <Theme>
                    {children}
                </Theme>
            </div>
        </div>
    )
}

const reduction = 0.4

const classes = StyleSheet.create({
    render: {
        margin: 0,
        padding: '1em',
        flex: '0 0 auto',
        background: '#fff',
        boxShadow: '0 5px 5px rgba(0,0,0,0.4)'
    },
    render_screen: {
        boxSizing: 'content-box',
        width: `${100 * reduction}vw`,
        height: `${100 * reduction}vh`
    },
    content: {
        transformOrigin: '0 0'
    },
    content_screen: {
        width: '100vw',
        height: '100vh',
        transform: `scale(${reduction},${reduction})`
    }
})

module.exports = Render
