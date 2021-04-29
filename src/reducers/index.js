const ReactRouterRedux = require('react-router-redux')
import ScopeStore from './ScopeStore'

module.exports = {
    routing: ReactRouterRedux.routerReducer,
    scope: ScopeStore.scopeReducer
}
