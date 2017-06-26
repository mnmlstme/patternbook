import React from 'react'
import PropTypes from 'prop-types'

class Pattern extends React.Component {
    static contextTypes = {
        extension: PropTypes.string,
        requireFromTarget: PropTypes.func
    }

    render() {
        let { requireFromTarget, extension } = this.context
        let { splat, pattern } = this.props.params
        let filepath = [splat, pattern]
        let content = requireFromTarget(filepath.join('/') + extension)()

        return content
    }
}

module.exports = Pattern
