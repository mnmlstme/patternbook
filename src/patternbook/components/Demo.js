import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

function Show(props) {
    let { children } = props

    return (
        <figure className={css(classes.demo)}>
            {children}
        </figure>
    )
}

const classes = StyleSheet.create({
    demo: {
        /*
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        */
        margin: 0,
        clear: 'both'
    }
})

module.exports = Show
