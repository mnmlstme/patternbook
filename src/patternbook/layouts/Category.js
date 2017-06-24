import React from 'react'
import PropTypes from 'prop-types'

class Category extends React.Component {
    static contextTypes = {
        requireFromTarget: PropTypes.func
    }

    render() {
        let { requireFromTarget } = this.context
        let { splat } = this.props.params
        let dirpath = splat.split('/')
        // the file will have the same name as the last directory
        let filepath = dirpath.concat(dirpath.slice(-1))
        let content = requireFromTarget(filepath.join('/'))()

        return content
    }
}

module.exports = Category
