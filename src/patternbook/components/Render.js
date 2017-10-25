import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { StyleSheet, css } from 'aphrodite/no-important'

import Wrapper from './Wrapper'
import { article } from './layout'

const RESIZE_DEBOUNCE_TIME = 500 // milliseconds

let DefaultTheme = props => (
    <div className={props.className}>{props.children}</div>
)

class Render extends React.Component {
    static contextTypes = {
        themeClass: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0
        }
        this.handleResize = debounce(
            this.setActualDimensions.bind(this),
            RESIZE_DEBOUNCE_TIME
        )
    }

    render() {
        let { children, mod, theme } = this.props
        let { width, height } = this.state
        let { themeClass } = this.context
        let mods = mod ? mod.split(' ') : ['default']
        let dimensions = { width, height }
        let Theme = theme || DefaultTheme
        themeClass = themeClass || 'pbReset'

        return (
            <div
                className={css(
                    classes.render,
                    mods.map(m => classes['render_' + m])
                )}>
                <Wrapper {...dimensions}>
                    <div
                        className={css(
                            classes.content,
                            mods.map(m => classes['content_' + m])
                        )}
                        ref={node => (this._content = node)}>
                        <Theme className={themeClass}>{children}</Theme>
                    </div>
                </Wrapper>
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        this.afterApplyingStyles(this.setActualDimensions.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    componentDidUpdate() {
        this.afterApplyingStyles(this.setActualDimensions.bind(this))
    }

    afterApplyingStyles(fn) {
        // Aphrodite does not apply styles until the next rendering cycle
        setTimeout(fn, 0)
    }

    setActualDimensions() {
        let content = this._content
        let s = this.state

        if (content) {
            let { width, height } = content.getBoundingClientRect()

            if (s.width !== width || s.height !== height) {
                this.setState({ width, height })
            }
        }
    }
}

const reduction = 0.3

const classes = StyleSheet.create({
    render: {
        gridColumn: 'render-start / render-end',
        height: 'auto',
        marginBottom: '2rem',
        ':nth-child(1n) + *': {
            gridColumn: 'source-start / source-end'
        },
        overflow: 'auto'
    },
    content: {
        transformOrigin: '0 0',
        margin: 0
    },
    render_default: {},
    content_default: {
        display: 'block'
    },
    render_aside: {
        textAlign: 'right',
        gridColumn: 'aside-start / aside-end',
        ':nth-child(1n) + *': {
            gridColumn: 'block-start / block-end'
        }
    },
    content_aside: {
        display: 'inline-block',
        textAlign: 'left'
    },
    render_screen: {},
    content_screen: {
        width: '100vw',
        height: '100vh',
        transform: `scale(${reduction},${reduction})`
    },
    render_wide: {
        gridColumn: 'wide-start / wide-end',
        ':nth-child(1n) + *': {
            gridColumn: 'block-start / block-end'
        }
    },
    content_wide: {
        display: 'block',
        width: '100%',
        height: 'auto'
    }
})

module.exports = Render
