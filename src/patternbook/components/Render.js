import React, {Component, PureComponent} from 'react'
import { connect }  from 'react-redux'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { StyleSheet, css } from 'aphrodite/no-important'
import textContent from 'react-addons-text-content'

import { getLocal, getGlobal, getSignature } from '../reducers/ScopeStore'

import { wrapper } from './layout'

const RESIZE_DEBOUNCE_TIME = 200 // milliseconds

let DefaultTheme = props => (
    <div className={props.className}>{props.children}</div>
)

const reduction = 0.3
const buffer = `${wrapper.buffer}px` // buffer (padding) around wrapped content
const fringe = `${wrapper.fringe}px` // fringing effect on mask
const rulerWidth = `${wrapper.tickLength}rem`
const bg = 'white' // should be themed

class Renderer extends PureComponent {

    static propTypes = {
        source: PropTypes.string.isRequired,
        scope: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        plugin: PropTypes.object.isRequired
    }

    constructor (props) {
        super(props)
        this.state = {
            error: null,
            component: null,
            sourceForComponent: null,
            signatureForComponent: null,
            globalsForComponent: null
        }
    }

    static getDerivedStateFromProps (props, state) {
        let { source, signature, globals, plugin } = props;
        let { sourceForComponent, signatureForComponent, globalsForComponent } = state;

        if ( source !== sourceForComponent ||
            signature !== signatureForComponent ||
            globals !== globalsForComponent) {

            let pluginState = plugin
                .compile(source, signature.toArray(), globals.toJS())

            if ( pluginState.component ) {
                return Object.assign({
                    sourceForComponent: source,
                    signatureForComponent: signature,
                    globalsForComponent: globals
                }, pluginState)
            } else {
                return pluginState
            }
        }

        return {}
    }

    componentDidCatch(error, info) {
        this.setState({
            error,
            errorType: 'Component Rendering Error'
        })
    }

    render () {
        let { dispatch, scope } = this.props
        let { component, moduleCode, error, errorType } = this.state

        if ( error ) {
            return ( <div>
                {errorType && (<h2>{errorType}</h2>)}
                <pre>{error.toString()}</pre>
                <pre>{moduleCode}</pre>
            </div> )
        } else if ( component ) {
            return React.createElement(
                component,
                Object.assign({}, {dispatch, scope: scope.toJS()}),
                [])
        } else {
            return null
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        scope: getLocal(state.scope),
        globals: getGlobal(state.scope),
        signature: getSignature(state.scope)
    }
}

const ScopedRenderer = connect(mapStateToProps)(Renderer)

class Render extends Component {
    static contextTypes = {
        themeClass: PropTypes.string,
        plugins: PropTypes.object
    }

    constructor(props) {
        super(props)
        this.state = {
            initialized: null
        }
    }

    render() {
        let { children, mod, lang, theme } = this.props
        let { initialized, top, left, width, height } = this.state
        let plugin = this.context.plugins[lang] || this.context.plugins.default
        let source = textContent(children)
        let themeClass = this.context.themeClass || 'pbReset'
        let mods = mod ? mod.split(' ') : ['default']
        let Theme = theme || DefaultTheme
        let dimensions = { width, height }
        let scale = mods.find(s => s === 'screen') ? reduction : 1
        let tpx = top && `${top.toFixed(0)}px`
        let lpx = left && `${left.toFixed(0)}px`
        let wpx = width && `${width.toFixed(0)}px`
        let hpx = height && `${height.toFixed(0)}px`
        let swpx = width && `${(width / scale).toFixed(0)}px`
        let shpx = height && `${(height / scale).toFixed(0)}px`

        return (
            <div
                className={css(
                    classes.render,
                    mods.map(m => classes['render_' + m])
                )}>
                <div
                    className={css(
                        classes.wrapper,
                        mods.map(m => classes['wrapper_' + m])
                    )}>
                    <div
                        className={css(
                            classes.content,
                            mods.map(m => classes['content_' + m])
                        )}
                        ref={node => (this._content = node)}>
                        <Theme className={themeClass}>
                            {initialized &&
                                <ScopedRenderer
                                    plugin={plugin}
                                    source={source}
                                />}
                        </Theme>
                    </div>
                    {initialized && [
                        <div key="mask" className={css(classes.mask)} />,
                        <div
                            key="ruler_top"
                            className={css(classes.ruler, classes.ruler_top)}
                            style={{ width: wpx, left: lpx }}
                        />,
                        <div
                            key="ruler_left"
                            className={css(classes.ruler, classes.ruler_left)}
                            style={{ height: hpx, top: tpx }}
                        />,
                        <div
                            key="ruler_bottom"
                            className={css(classes.ruler, classes.ruler_bottom)}
                            style={{ width: wpx, left: lpx }}>
                            <span
                                className={css(
                                    classes.dim,
                                    classes.dim_bottom
                                )}>
                                {swpx}
                            </span>
                        </div>,
                        <div
                            key="ruler_right"
                            className={css(classes.ruler, classes.ruler_right)}
                            style={{ height: hpx, top: tpx }}>
                            <span
                                className={css(classes.dim, classes.dim_right)}>
                                {shpx}
                            </span>
                        </div>
                    ]}
                </div>
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this))
        // TODO: add MutationObserver here

        // Aphrodite does not apply styles until the next render
        setTimeout(this.updateRulers.bind(this), 0)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    componentDidUpdate() {
        this.updateRulers()
    }

    handleResize() {
        debounce(this.updateRulers.bind(this), RESIZE_DEBOUNCE_TIME)
    }

    updateRulers() {
        // We call this anytime we think the dimensions of the rendering area may change.
        let content = this._content
        let s = this.state

        if (content) {
            let { top, left, width, height } = content.getBoundingClientRect()
            let parent = content.parentElement.getBoundingClientRect()

            top -= parent.top
            left -= parent.left

            if (
                !s.initialized ||
                top !== s.top ||
                left !== s.left ||
                width !== s.width ||
                height !== s.height
            ) {
                this.setState({
                    initialized: true,
                    top,
                    left,
                    width,
                    height
                })
            }
        }
    }
}

const classes = StyleSheet.create({
    render: {
        gridColumn: 'start-left / end-left',
        height: 'auto',
        overflow: 'auto',
        alignSelf: 'start',
        maxWidth: '100%',
        position: 'relative',
        background: bg
    },
    wrapper: {
        display: 'inline-block',
        textAlign: 'center',
        padding: buffer,
        position: 'relative',
        minWidth: '100%',
        overflow: 'hidden'
    },
    content: {
        display: 'inline-block',
        margin: 0,
        textAlign: 'left',
        color: '#333',
        fontFamily: 'Helvetica,Arial,sans-serif',
        fontSize: '16px',
        fontStyle: 'normal',
        transformOrigin: '0 0'
    },
    render_default: {},
    content_default: {},
    render_aside: {
        gridColumn: 'start-aside / end-aside'
    },
    content_aside: {},
    render_pane: {
        width: '100%',
        height: 0,
        paddingBottom: '75%',
        overflow: 'hidden'
    },
    wrapper_pane: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    content_pane: {
        display: 'block'
    },
    render_wide: {
        gridColumn: 'start-left / end-right'
    },
    wrapper_wide: {
        display: 'block',
        width: '100%',
        height: 'auto'
    },
    content_wide: {
        display: 'block'
    },
    render_hero: {
        gridColumn: 'start-left / end-right',
        width: '100%',
        height: '15rem',
        overflow: 'hidden'
    },
    wrapper_hero: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        padding: 0
    },
    content_hero: {
        display: 'block',
        height: '100%',
        width: '100%',
        ':not(:empty) ~ *': {
            // hide mask and rulers
            display: 'none'
        }
    },
    render_screen: {
        width: '100%',
        height: `calc(${100 * reduction}vh + 2*${buffer})`,
        overflow: 'hidden'
    },
    wrapper_screen: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0
    },
    content_screen: {
        width: '100vw',
        height: '100vh',
        transform: `scale(${reduction},${reduction})`
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
        position: 'absolute',
        paddingLeft: '0.25em'
    },
    dim_bottom: {
        bottom: 0,
        left: '100%'
    },
    dim_right: {
        bottom: 0,
        left: '100%',
        transformOrigin: 'bottom left',
        transform: 'rotate(-90deg)'
    }
})

module.exports = Render
