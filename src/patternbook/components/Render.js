import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

function Render (props) {
    let {children, styles, theme} = props

    return (
        <div className={css(classes.render, styles)}>
            {
                theme
                    ? React.createElement(theme, {}, children)
                    : children
            }
        </div>
    )
}

const classes = StyleSheet.create({
    render: {
    }
})

module.exports = Render
