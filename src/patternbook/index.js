
import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createBrowserHistory } from 'history'


import Page from './Page'
import Home from './Home'
import Category from './Category'
import Pattern from './Pattern'

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

module.exports = Patternbook
