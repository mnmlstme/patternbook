import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { StyleSheet, css } from 'aphrodite/no-important'

import DefaultWrapper from './DefaultWrapper'
import { article } from './layout'

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
        let Wrapper = theme || DefaultWrapper
        let { themeClass } = this.context
        // Do not render children until size of rendering pane is known:
        let rendered = !!width && !!height && children
        let dimensions = mod === 'screen'
            ? { width, height }
            : { width: '100%', height: 'auto' }

        return (
            <div
                className={css(
                    classes.render,
                    classes['render_' + (mod || 'default')]
                )}
            >
                <Wrapper themeClass={themeClass} {...dimensions}>
                    <div
                        className={css(
                            classes.content,
                            classes['content_' + mod]
                        )}
                        ref={node => (this._content = node)}
                    >
                        {rendered}
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

const reduction = 0.4
const width = `${100 * (article.percentLeft / article.percentRight)}%`
const offset = `-${width}`

const classes = StyleSheet.create({
    render: {
        float: 'left',
        boxSizing: 'border-box',
        margin: `1rem 2rem 1rem ${offset}`
    },
    render_default: {
        width: `${50 * (100 / article.percentRight)}%`
    },
    render_screen: {
        width: `${100 * reduction}vw`,
        height: `${100 * reduction}vh`
    },
    render_wide: {
        float: 'none',
        boxSizing: 'border-box',
        width: `${100 * (100 / article.percentRight)}%`,
        height: 'auto',
        marginTop: '2rem',
        marginBottom: '2rem'
    },
    render_aside: {
        boxSizing: 'border-box',
        height: 'auto',
        marginLeft: offset
    },
    content: {
        boxSizing: 'content-box',
        transformOrigin: '0 0',
        minHeight: '1em',
        minWidth: '1em'
    },
    content_screen: {
        boxSizing: 'border-box',
        width: '100vw',
        height: '100vh',
        transform: `scale(${reduction},${reduction})`
    },
    content_wide: {
        boxSizing: 'border-box',
        width: '100%',
        height: 'auto'
    }
})

module.exports = Render
