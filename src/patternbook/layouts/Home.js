import React from 'react'
import PropTypes from 'prop-types'

class Home extends React.Component {
    static contextTypes = {
        entry: PropTypes.string,
        extension: PropTypes.string,
        requireFromTarget: PropTypes.func
    }

    render() {
        let { requireFromTarget, entry, extension } = this.context
        let content = requireFromTarget(entry + extension)()

        return content
    }
}

module.exports = Home
