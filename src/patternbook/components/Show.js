import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

function Show(props) {
    let { children } = props

    return (
        <figure className={css(classes.show)}>
            {children}
        </figure>
    )
}

const classes = StyleSheet.create({
    show: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        margin: 0
    }
})

module.exports = Show
