import React from 'react'
import PropTypes from 'prop-types'

class Home extends React.Component {
    static contextTypes = {
        entry: PropTypes.string,
        requireFromTarget: PropTypes.func
    }

    render() {
        let { requireFromTarget, entry } = this.context
        let content = requireFromTarget(entry)()

        return content
    }
}

module.exports = Home
