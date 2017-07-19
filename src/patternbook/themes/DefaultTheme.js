import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

function DefaultTheme(props) {
    let { themeClass, children } = props

    return (
        <div className={[css(classes.theme), themeClass].join(' ')}>
            {children}
        </div>
    )
}

const classes = StyleSheet.create({
    theme: {
        fontFamily: 'Helvetica, Arial, sans-serif'
    }
})

module.exports = DefaultTheme
