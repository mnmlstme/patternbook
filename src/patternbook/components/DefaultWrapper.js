import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import { wrapper } from '../components/layout'

function DefaultWrapper(props) {
    let { themeClass, children } = props
    themeClass = themeClass || 'pbReset'

    return (
        <div className={css(classes.wrapper)}>
            <div className={themeClass}>
                {children}
            </div>
            <div className={css(classes.ruler_top)} />
            <div className={css(classes.ruler_right)} />
            <div className={css(classes.ruler_bottom)} />
            <div className={css(classes.ruler_left)} />
        </div>
    )
}

const rulerSize = `${wrapper.tickLength}em`
const rulerLocation = `-${wrapper.tickLength + wrapper.tickOffset}em`

const classes = StyleSheet.create({
    wrapper: {
        position: 'relative'
    },
    ruler_top: {
        position: 'absolute',
        left: 0,
        top: rulerLocation,
        boxSizing: 'content-box',
        height: rulerSize,
        width: '100%',
        border: 'solid',
        borderWidth: '0 0.5px',
        opacity: 0.25
    },
    ruler_right: {
        position: 'absolute',
        top: 0,
        right: rulerLocation,
        width: rulerSize,
        boxSizing: 'content-box',
        height: '100%',
        border: 'solid',
        borderWidth: '0.5px 0',
        opacity: 0.25
    },
    ruler_bottom: {
        position: 'absolute',
        left: 0,
        bottom: rulerLocation,
        boxSizing: 'content-box',
        height: rulerSize,
        width: '100%',
        border: 'solid',
        borderWidth: '0 0.5px',
        opacity: 0.25
    },
    ruler_left: {
        position: 'absolute',
        top: 0,
        left: rulerLocation,
        boxSizing: 'content-box',
        width: rulerSize,
        height: '100%',
        border: 'solid',
        borderWidth: '0.5px 0',
        opacity: 0.25
    }
})

module.exports = DefaultWrapper
