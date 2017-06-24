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

function NotFound(props) {
    let path = props.params.splat

    return (
        <section>
            <h3>No route</h3>
            <p>{path}</p>
        </section>
    )
}

function Patternbook(props) {
    let history = createBrowserHistory()
    let { config } = props
    let confed = comp => p =>
        React.createElement(comp, Object.assign({ config }, p))

    return (
        <Router history={browserHistory}>
            <Route path="/" component={Page}>
                <IndexRoute component={confed(Home)} />
                <Route path=":category">
                    <IndexRoute component={confed(Category)} />
                    <Route path=":pattern" component={confed(Pattern)} />
                </Route>
                <Route path="**" component={NotFound} />
            </Route>
        </Router>
    )
}

function config(object) {
    let config = Object.assign({}, object)
    config.render = el =>
        ReactDOM.render(React.createElement(Patternbook, { config }), el)
    return config
}

function render(el) {}

Object.assign(Patternbook, {
    Show,
    Render,
    Source,
    Scope,
    config
})

module.exports = Patternbook
