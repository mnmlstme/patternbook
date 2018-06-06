import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './ErrorPage';

class Category extends React.Component {
  static contextTypes = {
    extension: PropTypes.string,
    requireFromTarget: PropTypes.func
  };

  render() {
    let { requireFromTarget, extension } = this.context;
    let { splat } = this.props.params;
    let dirpath = splat.split('/');
    // the file will have the same name as the last directory
    let filepath = dirpath.concat(dirpath.slice(-1));
    let content;
    let error;

    try {
      content = requireFromTarget(filepath.join('/') + extension)();
    } catch (error) {
      content = <ErrorPage title={dirpath[dirpath.length - 1]}>{error.message}</ErrorPage>;
    }

    return content;
  }
}

module.exports = Category;
