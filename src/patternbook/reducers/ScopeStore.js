import Im from 'immutable'

const store_context = 'patternbook.scope'

const types = {
    SET: 'patternbook.set',
    RESET: 'patternbook.reset',
    INIT: 'patternbook.init'
}

function getAll(state) {
    return state ? state.toJS() : {}
}

// TODO: each page should have its own scope, not global
var initState = Im.Map()

function scopeReducer(state, action) {
    state = state || initState

    switch (action.type) {
        case types.SET:
            return state.merge(action.assignments)
        case types.RESET:
            return initState
        default:
            return (initState = Im.Map(action.assignments))
    }
}

const msgTypes = {
    Set: function(assignments) {
        return { type: types.SET, assignments }
    },
    Reset: function() {
        return { type: types.RESET }
    },
    Init: function(assignments) {
        return { type: types.INIT, assignments }
    }
}

module.exports = {
    types,
    getAll,
    scopeReducer,
    msgTypes
}
