import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createBrowserHistory } from 'history'

import Page from './layouts/Page'
import Home from './layouts/Home'
import Category from './layouts/Category'
import Pattern from './layouts/Pattern'

import Show from './components/Show'
import Source from './components/Source'
import Render from './components/Render'
import Scope from './components/Scope'

import DefaultTheme from './themes/DefaultTheme'

function NotFound(props) {
    let path = props.params.splat

    return (
        <section>
            <h3>Not found:</h3>
            <p>{path}</p>
        </section>
    )
}

function Patternbook(props) {
    let history = createBrowserHistory()
    let ConfiguredPage = p =>
        <Page configuration={props.configuration} {...p} />

    /* Routes:
        /
            Home (entry point)
        /dir1[/dir2...]/
            Category (trailing slash)
        /dir1[/dir2...]/name
            Pattern (no trailing slash)
    */

    return (
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
    )
}

function config(object) {
    let configuration = Object.assign(
        {},
        {
            entry: 'README',
            extension: '.md'
        },
        object
    )

    return {
        configuration,
        render: el =>
            ReactDOM.render(
                React.createElement(Patternbook, {
                    configuration
                }),
                el
            )
    }
}

function convertSvgToSymbol(id, string) {
    return string
        .replace('<svg', `<symbol id="${id}"`)
        .replace('</svg>', '</symbol>')
}

Object.assign(Patternbook, {
    Show,
    Render,
    Source,
    Scope,
    DefaultTheme,
    config,
    convertSvgToSymbol
})

module.exports = Patternbook
