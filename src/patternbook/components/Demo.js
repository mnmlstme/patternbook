import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'
import Source from './Source'
import Render from './Render'

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
        flex: '0 0 100%',
        width: '100%',
        margin: 0,
        padding: 0,
        clear: 'both',
        display: 'flex',
        boxSizing: 'border-box',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'space-start'
    },
    demo_wide: {
        justifyContent: 'flex-end',
        flexFlow: 'row wrap'
    }
})

module.exports = Demo
