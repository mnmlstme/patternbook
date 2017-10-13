import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { StyleSheet, css } from 'aphrodite/no-important'

import Wrapper from './Wrapper'
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
        let { themeClass } = this.context
        // Do not render children until size of rendering pane is known:
        let rendered = !!width && !!height && children
        let mods = mod ? mod.split(' ') : []
        let dimensions = { width, height }

        return (
            <div
                className={css(
                    classes.render,
                    mods.map(m => classes['render_' + m])
                )}
            >
                <Wrapper themeClass={themeClass} {...dimensions}>
                    <div
                        className={css(
                            classes.content,
                            mods.map(m => classes['content_' + m])
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
        margin: `0 4rem 2rem ${offset}`,
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
        marginTop: '2rem'
    },
    render_aside: {
        boxSizing: 'border-box',
        height: 'auto',
        marginRight: '2rem',
        width: 'auto'
    },
    content: {
        boxSizing: 'content-box',
        transformOrigin: '0 0',
        minHeight: '1em',
        minWidth: '1em',
        overflow: 'auto'
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
