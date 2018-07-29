import React from 'react'
import PropTypes from 'prop-types'
import LazyLoadPage from './LazyLoadPage'

class Pattern extends React.Component {

    render() {
        let splat = this.props.match.params[0]
        let { pattern } = this.props.match.params
        let filepath = [splat, pattern]

        return <LazyLoadPage path={filepath.join('/')} />
    }
}

module.exports = Pattern
