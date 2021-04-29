import React from 'react'
let ReactRedux = require('react-redux')

import ScopeStore from '../reducers/ScopeStore'
const { Init } = ScopeStore.msgTypes

class Scope extends React.Component {
    constructor(props) {
        let { dispatch, initial, imports, messages} = props
        super(props)
        dispatch(Init({imports, messages, initial}))
    }

    render() {
        let { children } = this.props

        return <div>{children}</div>
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

module.exports = ReactRedux.connect(mapStateToProps)(Scope)
