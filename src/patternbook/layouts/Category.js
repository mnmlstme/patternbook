import React from 'react';
import PropTypes from 'prop-types';
import LazyLoadPage from './LazyLoadPage';

class Category extends React.Component {
  render() {
    let splat = this.props.match.params[0];
    let dirpath = splat.split('/');
    // the file will have the same name as the last directory
    let filepath = dirpath.concat(dirpath.slice(-1));

    return <LazyLoadPage path={filepath.join('/')}/>
  }
}

module.exports = Category;
