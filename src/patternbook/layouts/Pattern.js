import React from 'react'
import PropTypes from 'prop-types'
import ErrorPage from './ErrorPage'

class Pattern extends React.Component {
    static contextTypes = {
        extension: PropTypes.string,
        requireFromTarget: PropTypes.func
    }

    render() {
        let { requireFromTarget, extension } = this.context
        let { splat, pattern } = this.props.params
        let filepath = [splat, pattern]
        let content
        let error

        try {
            content = requireFromTarget(filepath.join('/') + extension)()
        } catch (error) {
            content = (
                <ErrorPage title={pattern}>
                    {error.message}
                </ErrorPage>
            )
        }

        return content
    }
}

module.exports = Pattern
