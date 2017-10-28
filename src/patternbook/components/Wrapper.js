import React from 'react'
import { StyleSheet, css } from 'aphrodite/no-important'

import { wrapper } from '../components/layout'

const RESIZE_DEBOUNCE_TIME = 200 // milliseconds

let DefaultTheme = props => (
    <div className={props.className}>{props.children}</div>
)

class Wrapper extends React.Component {
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
        let { children, type } = this.props
        let { themeClass } = this.context
        let Theme = theme || DefaultTheme
        themeClass = themeClass || 'pbReset'

        return null
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
        debounce(() => this.setActualDimensions.RESIZE_DEBOUNCE_TIME)
    }

    setActualDimensions() {
        let content = this._content
        let s = this.state

        if (content) {
            let { width, height } = content.getBoundingClientRect()

            if (s.width !== width || s.height !== height) {
                console.log(
                    `resizing: ${s.width} => ${width}, ${s.height} => ${height}`
                )
                this.setState({ width, height })
            }
        }
    }
}

const classes = StyleSheet.create({})

module.exports = Wrapper
