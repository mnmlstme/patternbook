import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

function Demo(props) {
    let { mod, children } = props

    return (
        <figure
            className={css(classes.demo, classes['demo_' + (mod || 'default')])}
        >
            {children}
        </figure>
    )
}

const classes = StyleSheet.create({
    demo: {
        margin: 0,
        clear: 'both',
        display: 'flex'
    },
    demo_wide: {
        display: 'block'
    }
})

module.exports = Demo
