import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createBrowserHistory } from 'history'


import Page from './layouts/Page'
import Home from './layouts/Home'
import Category from './layouts/Category'
import Pattern from './layouts/Pattern'

import Show from './components/Show'
import Source from './components/Source'
import Render from './components/Render'

function NotFound (props) {
    let path = props.params.splat

    return (
        <section>
            <h3>No route</h3>
            <p>{path}</p>
        </section>
    )
}

function Patternbook (props) {
    let history = createBrowserHistory();

    return (
        <Router history={browserHistory}>
            <Route path="/" component={Page}>
                <IndexRoute component={Home}/>
                <Route path=":category">
                    <IndexRoute component={Category}/>
                    <Route path=":pattern" component={Pattern}/>
                </Route>
                <Route path="**" component={NotFound}/>
            </Route>
        </Router>
    )
}

Object.assign(Patternbook, {
    Show,
    Render,
    Source
})

module.exports = Patternbook
