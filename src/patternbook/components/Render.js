import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { StyleSheet, css } from 'aphrodite/no-important'

import { article, wrapper } from './layout'

const RESIZE_DEBOUNCE_TIME = 200 // milliseconds

let DefaultTheme = props => (
    <div className={props.className}>{props.children}</div>
)

const reduction = 0.3
const buffer = `${wrapper.buffer}px` // buffer (padding) around wrapped content
const fringe = `${wrapper.fringe}px` // fringing effect on mask
const rulerWidth = `${wrapper.tickLength}rem`
const bg = 'white' // should be themed

class Render extends React.Component {
    static contextTypes = {
        themeClass: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {
            width: null,
            height: null
        }
    }

    render() {
        let { children, mod, theme } = this.props
        let { width, height } = this.state
        let themeClass = this.context.themeClass || 'pbReset'
        let mods = mod ? mod.split(' ') : ['default']
        let Theme = theme || DefaultTheme
        let dimensions = { width, height }
        let wpx = width && `${width.toFixed(1)}px`
        let hpx = height && `${height.toFixed(1)}px`
        let dimstyle =
            width && height
                ? {
                      width: wpx,
                      height: hpx
                  }
                : {}

        return (
            <div
                className={css(
                    classes.render,
                    mods.map(m => classes['render_' + m])
                )}
                style={dimstyle}>
                <div className={css(classes.background)} />
                <div
                    className={css(
                        classes.content,
                        mods.map(m => classes['content_' + m])
                    )}
                    ref={node => (this._content = node)}>
                    <Theme className={themeClass}>{children}</Theme>
                </div>
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

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this))
        this.componentDidUpdate()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    componentDidUpdate() {
        this.afterApplyingStyles(this.setActualDimensions.bind(this))
    }

    afterApplyingStyles(fn) {
        // Aphrodite does not apply styles until the next rendering cycle
        setTimeout(fn, 0)
    }

    handleResize() {
        debounce(this.setActualDimensions().bind(this), RESIZE_DEBOUNCE_TIME)
    }

    setActualDimensions() {
        let content = this._content
        let s = this.state

        if (content) {
            let { width, height } = content.getBoundingClientRect()
            //debugger
            if (s.width !== width || s.height !== height) {
                console.log(
                    `resizing: ${s.width} => ${width}, ${s.height} => ${height}`
                )
                //this.setState({ width, height })
            }
        }
    }
}

const classes = StyleSheet.create({
    render: {
        gridColumn: 1,
        height: 'auto',
        overflow: 'auto',
        alignSelf: 'start',
        maxWidth: '100%',
        position: 'relative',
        padding: buffer
    },
    content: {
        display: 'block',
        transformOrigin: '0 0',
        margin: 0,
        maxWidth: '100%',
        color: '#333',
        fontFamily: 'Helvetica,Arial,sans-serif'
    },
    render_fit: {
        justifySelf: 'end'
    },
    content_fit: {
        display: 'inline-block'
    },
    render_fill: {
        width: '100%',
        height: 0,
        paddingBottom: '75%'
    },
    content_fill: {
        width: '100%',
        height: '100%'
    },
    render_screen: {
        alignSelf: 'start',
        justifySelf: 'start'
    },
    content_screen: {
        width: '100vw',
        height: '100vh',
        transform: `scale(${reduction},${reduction})`
    },
    render_wide: {
        gridColumn: '1 / 2'
    },
    content_wide: {
        display: 'block',
        width: '100%',
        height: 'auto'
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: bg
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
        top: 0,
        left: buffer,
        right: buffer,
        height: rulerWidth,
        borderStyle: 'none solid'
    },
    ruler_right: {
        right: 0,
        top: buffer,
        bottom: buffer,
        width: rulerWidth,
        borderStyle: 'solid none'
    },
    ruler_bottom: {
        bottom: 0,
        left: buffer,
        right: buffer,
        height: rulerWidth,
        borderStyle: 'none solid'
    },
    ruler_left: {
        left: 0,
        top: buffer,
        bottom: buffer,
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

module.exports = Render
