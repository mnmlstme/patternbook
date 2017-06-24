import React from 'react'
import PropTypes from 'prop-types'

class Pattern extends React.Component {
    static contextTypes = {
        requireFromTarget: PropTypes.func
    }

    render() {
        let { requireFromTarget } = this.context
        let { splat, pattern } = this.props.params
        let filepath = [splat, pattern]
        let content = requireFromTarget(filepath.join('/'))()

        return content
    }
}

module.exports = Pattern
