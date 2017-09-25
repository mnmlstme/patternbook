import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { StyleSheet, css } from 'aphrodite/no-important'
import DefaultTheme from '../themes/DefaultTheme'

const RESIZE_DEBOUNCE_TIME = 500 // milliseconds

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
        let Theme = theme || DefaultTheme
        let { themeClass } = this.context
        // Do not render children until size of rendering pane is known:
        let rendered = !!width && !!height && children

        return (
            <div className={css(classes.render, classes['render_' + mod])}>
                <div
                    className={css(classes.content, classes['content_' + mod])}
                    ref={node => (this._content = node)}
                >
                    <Theme
                        themeClass={themeClass}
                        width={width}
                        height={height}
                    >
                        {rendered}
                    </Theme>
                </div>
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

const reduction = 0.4

const classes = StyleSheet.create({
    render: {
        padding: '1em',
        margin: '0 -1em',
        marginLeft: 'calc(-20vw - 1em)',
        flex: '0 0 auto',
        background: '#fff',
        boxShadow: '0 0 4px 1px rgba(0,0,0,0.1)',
        borderRadius: '2px'
    },
    render_screen: {
        boxSizing: 'content-box',
        width: `${100 * reduction}vw`,
        height: `${100 * reduction}vh`
    },
    render_wide: {
        width: `1024px`,
        height: `576px`
    },
    content: {
        transformOrigin: '0 0',
        minHeight: '1em',
        minWidth: '1em'
    },
    content_screen: {
        width: '100vw',
        height: '100vh',
        transform: `scale(${reduction},${reduction})`
    },
    content_wide: {
        width: '100%',
        height: '100%'
    }
})

module.exports = Render
