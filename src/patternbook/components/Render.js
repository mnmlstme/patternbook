import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

function Render(props) {
    let { children, styles, theme } = props

    return (
        <div className={css(classes.render, styles)}>
            {theme ? React.createElement(theme, {}, children) : children}
        </div>
    )
}

const classes = StyleSheet.create({
    render: {
        margin: 0,
        padding: '1em',
        flexBasis: 'content',
        background: '#fff',
        boxShadow: '0 5px 5px rgba(0,0,0,0.4)'
    }
})

module.exports = Render
