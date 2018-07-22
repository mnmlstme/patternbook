import React from 'react'
import PropTypes from 'prop-types'
import LazyLoadPage from './LazyLoadPage'

class Pattern extends React.Component {

    render() {
        let { splat, pattern } = this.props.params
        let filepath = [splat, pattern]

        return <LazyLoadPage path={filepath.join('/')} />
    }
}

module.exports = Pattern
