import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

function Render (props) {
    let {children, styles} = props

    return (
        <div className={css(classes.render, styles)}>
            {children}
        </div>
    )
}

const classes = StyleSheet.create({
    render: {
    }
})

module.exports = Render
