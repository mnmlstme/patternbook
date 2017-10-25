import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import { wrapper } from '../components/layout'

function Wrapper(props) {
    let { children, width, height } = props
    let wpx = width && `${width.toFixed(1)}px`
    let hpx = height && `${height.toFixed(1)}px`
    let style =
        width && height
            ? {
                  width: wpx,
                  height: hpx,
                  overflow: 'hidden'
              }
            : {}

    return (
        <div className={css(classes.wrapper)} style={style}>
            {children}
            <div className={css(classes.mask)} />
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
const fringe = '10px' // fringing effect on mask
const rulerWidth = `${wrapper.tickLength}rem`
const bg = 'white' // should be themed

const classes = StyleSheet.create({
    wrapper: {
        // display: 'inline-block',
        position: 'relative',
        background: bg,
        color: '#333',
        fontFamily: 'Helvetica,Arial,sans-serif',
        padding: buffer,
        boxSizing: 'content-box'
    },
    mask: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        boxShadow: `inset 0 0 ${fringe} calc(${buffer} - ${fringe}) ${bg}`,
        top: 0,
        left: 0,
        pointerEvents: 'none'
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
        borderStyle: 'none solid'
    },
    ruler_right: {
        top: buffer,
        right: 0,
        width: rulerWidth,
        borderStyle: 'solid none'
    },
    ruler_bottom: {
        left: buffer,
        bottom: 0,
        height: rulerWidth,
        borderStyle: 'none solid'
    },
    ruler_left: {
        top: buffer,
        left: 0,
        width: rulerWidth,
        borderStyle: 'solid none'
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
