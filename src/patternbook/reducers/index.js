const Redux = require('redux')
const ReactRouterRedux = require('react-router-redux')
import ScopeStore from './ScopeStore'

var rootReducer = Redux.combineReducers({
    routing: ReactRouterRedux.routerReducer,
    scope: ScopeStore.scopeReducer
})

module.exports = rootReducer
