import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import Page from './layouts/Page'
import Home from './layouts/Home'
import Category from './layouts/Category'
import Pattern from './layouts/Pattern'

import ErrorPage from './layouts/ErrorPage'

import basicReducers from './reducers'

import HtmlPlugin from './plugins/html'
import DefaultPlugin from './plugins/default'
import JsxPlugin from './plugins/jsx'

function NotFound(props) {
    let path = props.match.params[0]

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
            <BrowserRouter>
                <ConfiguredPage emptyPage={NotFound}>
                    <Route exact path="/" component={Home} />
                    <Route exact strict path="/**/" component={Category}/>
                    <Route exact strict path="/**/:pattern" component={Pattern} />
                </ConfiguredPage>
            </BrowserRouter>
        </Provider>
    )
}

function config(object) {
    object = object || {}
    let plugins = Object.assign(
        {},
        {
            html: HtmlPlugin,
            jsx: JsxPlugin,
            'default': DefaultPlugin
        },
        object
    )
    let configuration = Object.assign(
        {},
        {
            entry: 'README',
            extension: '.md',
            themeClass: 'no-theme'
        },
        object,
        {
            plugins
        }
    )

    let rootReducer = combineReducers(
        Object.assign({}, basicReducers, configuration.reducers || {})
    )

    function render(el) {
        // Create flux store
        let store = createStore(
            rootReducer,
            compose(
                applyMiddleware(thunkMiddleware),
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
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

Object.assign(Patternbook, {config})

module.exports = Patternbook
