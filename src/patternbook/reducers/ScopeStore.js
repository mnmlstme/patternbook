import Im from 'immutable'

const types = {
    SET: 'patternbook.set',
    RESET: 'patternbook.reset',
    INIT: 'patternbook.init'
}

function getSignature(state) {
    return state ? state.get('signature') : Im.List()
}

function getLocal(state) {
    return state ? state.get('local') : Im.Map()
}

function getGlobal(state) {
    return state ? state.get('global') : Im.Map()
}

function scopeReducer(state, action) {
    state = state || Im.Map()

    switch (action.type) {
        case types.SET:
            return state.mergeIn(['local'], action.assignments)
        case types.INIT:
            state = state.merge(action.scopes)
            state = state
                .set('signature', state.get('initial').keys())
                .set('global', state.get('imports')
                    .merge(state.get('messages')))
            // and RESET...
        case types.RESET:
            return state.set('local', state.get('initial'))
        default:
            return state
    }
}

const msgTypes = {
    Set: function(assignments) {
        return { type: types.SET, assignments }
    },
    Reset: function() {
        return { type: types.RESET }
    },
    Init: function(scopes) {
        return { type: types.INIT, scopes }
    }
}

module.exports = {
    types,
    getLocal,
    getGlobal,
    scopeReducer,
    msgTypes
}
