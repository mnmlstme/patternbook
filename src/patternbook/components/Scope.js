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
        let { children } = this.props

        return <div>{children}</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        scope: ScopeStore.getAll(state.scope),
    }
}

module.exports = ReactRedux.connect(mapStateToProps)(Scope)
