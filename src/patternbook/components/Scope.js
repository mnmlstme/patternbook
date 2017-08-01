import React from 'react'
let ReactRedux = require('react-redux')

import ScopeStore from '../reducers/ScopeStore'
const { Init } = ScopeStore.msgTypes

class Scope extends React.Component {
    constructor(props) {
        let { dispatch, initial } = props
        super(props)
        dispatch(Init(initial))
    }

    render() {
        let { component } = this.props

        return React.createElement(component, this.props, [])
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        scope: ScopeStore.getAll(state.scope),
        messages: {
            scope: ScopeStore.msgTypes
            // TODO: inject method types for other reducers here
        }
    }
}

module.exports = ReactRedux.connect(mapStateToProps)(Scope)
