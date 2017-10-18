import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import { wrapper } from '../components/layout'

let DefaultTheme = props => (
    <div className={props.className}>{props.children}</div>
)

function Wrapper(props) {
    let { themeClass, theme, children, width, height } = props
    let Theme = theme || DefaultTheme
    themeClass = themeClass || 'pbReset'

    return (
        <div className={css(classes.wrapper)}>
            <div className={[css(classes.wrapped)].join(' ')}>
                <Theme className={themeClass}>{children}</Theme>
            </div>
            <div className={css(classes.ruler, classes.ruler_top)} />
            <div className={css(classes.ruler, classes.ruler_left)} />
            <div className={css(classes.ruler, classes.ruler_bottom)}>
                <span className={css(classes.dim, classes.dim_bottom)}>
                    {`${width.toFixed(1)}px`}
                </span>
            </div>
            <div className={css(classes.ruler, classes.ruler_right)}>
                <span className={css(classes.dim, classes.dim_right)}>
                    {`${height.toFixed(1)}px`}
                </span>
            </div>
        </div>
    )
}

const rulerSize = `${wrapper.tickLength}rem`
const rulerLocation = `-${wrapper.tickLength + wrapper.tickOffset}rem`
const rulerOverhang = `-${wrapper.tickWidth}px`

const bg = 'white' // should be themed

const classes = StyleSheet.create({
    wrapper: {
        position: 'relative',
        maxWidth: '100%',
        maxHeight: '100%'
    },
    wrapped: {
        background: bg,
        color: '#333',
        fontFamily: 'Helvetica,Arial,sans-serif',
        maxWidth: '100%',
        maxHeight: '100%'
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
        left: rulerOverhang,
        right: rulerOverhang,
        top: rulerLocation,
        height: rulerSize,
        borderStyle: 'none solid',
        background: `linear-gradient(to top, ${bg}, rgba(255,255,255,0))`
    },
    ruler_right: {
        top: rulerOverhang,
        bottom: rulerOverhang,
        right: rulerLocation,
        width: rulerSize,
        borderStyle: 'solid none',
        background: `linear-gradient(to right, ${bg}, rgba(255,255,255,0))`
    },
    ruler_bottom: {
        left: rulerOverhang,
        right: rulerOverhang,
        bottom: rulerLocation,
        height: rulerSize,
        borderStyle: 'none solid',
        background: `linear-gradient(to bottom, ${bg}, rgba(255,255,255,0))`
    },
    ruler_left: {
        top: rulerOverhang,
        bottom: rulerOverhang,
        left: rulerLocation,
        width: rulerSize,
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
