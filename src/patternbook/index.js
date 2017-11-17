import React from 'react'
import ReactDOM from 'react-dom'
let ReactRouter = require('react-router')
let { Router, Route, IndexRoute, browserHistory } = ReactRouter
let Redux = require('redux')
let ReactRedux = require('react-redux')
let { Provider } = ReactRedux
let ReactRouterRedux = require('react-router-redux')
import thunkMiddleware from 'redux-thunk'

import Page from './layouts/Page'
import Home from './layouts/Home'
import Category from './layouts/Category'
import Pattern from './layouts/Pattern'

import components from './components'

import ErrorPage from './layouts/ErrorPage'

import basicReducers from './reducers'

function NotFound(props) {
    let path = props.params.splat

    return (
        <ErrorPage title="Invalid Route">
            The path "{path}" does not match any available route
        </ErrorPage>
    )
}

function Patternbook(props) {
    let ConfiguredPage = p => (
        <Page configuration={props.configuration} {...p} />
    )

    /* Routes:
        /
            Home (entry point)
        /dir1[/dir2...]/
            Category (trailing slash)
        /dir1[/dir2...]/name
            Pattern (no trailing slash)
    */

    return (
        <Provider store={props.store}>
            <Router history={browserHistory}>
                <Route path="/" component={ConfiguredPage}>
                    <IndexRoute component={Home} />
                    <Route path="**/">
                        <IndexRoute component={Category} />
                        <Route path=":pattern" component={Pattern} />
                    </Route>
                    <Route path="**" component={NotFound} />
                </Route>
            </Router>
        </Provider>
    )
}

function config(object) {
    let configuration = Object.assign(
        {},
        {
            entry: 'README',
            extension: '.md',
            themeClass: 'no-theme'
        },
        object
    )

    let rootReducer = Redux.combineReducers(
        Object.assign({}, basicReducers, configuration.reducers || {})
    )

    function render(el) {
        // Create flux store
        let store = Redux.createStore(
            rootReducer,
            Redux.compose(
                Redux.applyMiddleware(thunkMiddleware),
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
        )

        // Connect browser history to Flux store
        let history = ReactRouterRedux.syncHistoryWithStore(
            ReactRouter.browserHistory,
            store
        )

        ReactDOM.render(
            React.createElement(Patternbook, {
                store,
                history,
                configuration
            }),
            el
        )
    }

    return {
        configuration,
        render
    }
}

function convertSvgToSymbol(id, string) {
    return string
        .replace('<svg', `<symbol id="${id}"`)
        .replace('</svg>', '</symbol>')
}

Object.assign(
    Patternbook,
    Object.assign({}, components, {
        config,
        convertSvgToSymbol
    })
)

module.exports = Patternbook
