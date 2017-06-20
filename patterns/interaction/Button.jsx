import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important';

function Button (props) {
    let {children, onClick} = props
    return (
        <button className={css(styles.button)}
            onClick={onClick}>
            {children}
        </button>
    )
}

const styles = StyleSheet.create({
    button: {
        fontFamily: 'inherit',
        fontSize: '100%',
        color: 'rgb(93, 47, 2)',
        backgroundColor: 'rgb(253, 245, 237)',
        borderRadius: 2,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgb(162, 84, 7)',
        boxShadow: '0 1px 1px rgba(0,0,0,0.3)',
    }
})

module.exports = Button
