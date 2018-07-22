import React from 'react';
import PropTypes from 'prop-types';
import LazyLoadPage from './LazyLoadPage';

class Home extends React.Component {
    static contextTypes = {
        entry: PropTypes.string
    };

    render() {
        let { entry } = this.context

        return <LazyLoadPage path={entry}/>
    }
}

module.exports = Home;
