import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import { wrapper } from '../components/layout'

function DefaultWrapper(props) {
    let { themeClass, children, width, height } = props
    let dimensions = { width, height }
    themeClass = themeClass || 'pbReset'

    return (
        <div
            className={[css(classes.wrapper), themeClass].join(' ')}
            style={dimensions}
        >
            {children}
            <div className={css(classes.ruler, classes.ruler_top)} />
            <div className={css(classes.ruler, classes.ruler_right)} />
            <div className={css(classes.ruler, classes.ruler_bottom)} />
            <div className={css(classes.ruler, classes.ruler_left)} />
        </div>
    )
}

const rulerSize = `${wrapper.tickLength}em`
const rulerLocation = `-${wrapper.tickLength + wrapper.tickOffset}em`
const rulerOverhang = `-${wrapper.tickWidth}px`

const classes = StyleSheet.create({
    wrapper: {
        position: 'relative',
        // should be themed
        background: 'white',
        boxShadow: '0 0 2em 1em white',
        color: '#333',
        fontFamily: 'Helvetica,Arial,sans-serif'
    },
    ruler: {
        position: 'absolute',
        boxSizing: 'content-box',
        borderColor: 'rgba(88, 52, 77, 0.4)',
        borderWidth: `${wrapper.tickWidth}px`
    },
    ruler_top: {
        left: rulerOverhang,
        right: rulerOverhang,
        top: rulerLocation,
        height: rulerSize,
        borderStyle: 'none solid'
    },
    ruler_right: {
        top: rulerOverhang,
        bottom: rulerOverhang,
        right: rulerLocation,
        width: rulerSize,
        borderStyle: 'solid none'
    },
    ruler_bottom: {
        left: rulerOverhang,
        right: rulerOverhang,
        bottom: rulerLocation,
        height: rulerSize,
        borderStyle: 'none solid'
    },
    ruler_left: {
        top: rulerOverhang,
        bottom: rulerOverhang,
        left: rulerLocation,
        width: rulerSize,
        borderStyle: 'solid none'
    }
})

module.exports = DefaultWrapper
