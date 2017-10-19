import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import { wrapper } from '../components/layout'

function Wrapper(props) {
    let { children, width, height } = props
    let wpx = `${width.toFixed(1)}px`
    let hpx = `${height.toFixed(1)}px`

    return (
        <div className={css(classes.wrapper)}>
            <div className={[css(classes.wrapped)].join(' ')}>{children}</div>
            <div
                className={css(classes.ruler, classes.ruler_top)}
                style={{ width: wpx }}
            />
            <div
                className={css(classes.ruler, classes.ruler_left)}
                style={{ height: hpx }}
            />
            <div
                className={css(classes.ruler, classes.ruler_bottom)}
                style={{ width: wpx }}>
                <span className={css(classes.dim, classes.dim_bottom)}>
                    {wpx}
                </span>
            </div>
            <div
                className={css(classes.ruler, classes.ruler_right)}
                style={{ height: hpx }}>
                <span className={css(classes.dim, classes.dim_right)}>
                    {hpx}
                </span>
            </div>
        </div>
    )
}

const buffer = '2rem' // buffer (padding) around wrapped content
const rulerWidth = `${wrapper.tickLength}rem`
const bg = 'white' // should be themed

const classes = StyleSheet.create({
    wrapper: {
        display: 'inline-block',
        position: 'relative',
        maxWidth: '100%',
        maxHeight: '100%',
        background: bg,
        color: '#333',
        fontFamily: 'Helvetica,Arial,sans-serif',
        padding: buffer
    },
    ruler: {
        position: 'absolute',
        boxSizing: 'content-box',
        borderColor: 'rgba(88, 52, 77, 0.4)',
        borderWidth: `${wrapper.tickWidth}px`,
        fontSize: '10px',
        fontFamily:
            'Monaco, Consolas, "Lucida Sans Typewriter", "Lucida Console"'
    },
    ruler_top: {
        left: buffer,
        top: 0,
        height: rulerWidth,
        borderStyle: 'none solid',
        background: `linear-gradient(to top, ${bg}, rgba(255,255,255,0))`
    },
    ruler_right: {
        top: buffer,
        right: 0,
        width: rulerWidth,
        borderStyle: 'solid none',
        background: `linear-gradient(to right, ${bg}, rgba(255,255,255,0))`
    },
    ruler_bottom: {
        left: buffer,
        bottom: 0,
        height: rulerWidth,
        borderStyle: 'none solid',
        background: `linear-gradient(to bottom, ${bg}, rgba(255,255,255,0))`
    },
    ruler_left: {
        top: buffer,
        left: 0,
        width: rulerWidth,
        borderStyle: 'solid none',
        background: `linear-gradient(to left, ${bg}, rgba(255,255,255,0))`
    },
    dim: {
        position: 'absolute'
    },
    dim_bottom: {
        bottom: 0,
        right: 0,
        textAlign: 'right'
    },
    dim_right: {
        bottom: 0,
        left: '100%',
        transformOrigin: 'bottom left',
        transform: 'rotate(-90deg)'
    }
})

module.exports = Wrapper
