import React from 'react';
import PropTypes from 'prop-types';

import ErrorPage from './ErrorPage';
import ScopeStore from '../reducers/ScopeStore'

class LazyLoadPage extends React.Component {
    static contextTypes = {
        importFromTarget: PropTypes.func,
        extension: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            module: null,
            error: null,
            errorPath: ''
        };
    }

    componentDidCatch(error, info) {
        let { path } = this.props

        this.setState({
            error,
            errorPath: path
        })
    }

    render() {
        let { extension, importFromTarget } = this.context
        let { path } = this.props
        let { module, error, errorPath } = this.state

        if ( error && errorPath === path ) {
            return <ErrorPage title="Error">
                Error loading "{path}": {error.message}
            </ErrorPage>
        }

        let content
        if (!module) {
            content = <h1>Loading Content&hellip;</h1>;
            console.log(`Requesting "${path}"`)
            importFromTarget(path + extension)
                .then(module => {
                    console.log(`Loaded "${path}"`)
                    this.setState({ module, error: null, errorPath: '' })
                })
                .catch(error => {
                    console.log(`Error loading "${path}": ${error}`);
                    this.setState({ module: null, error, errorPath: path })
                });
        } else {
            let messages = {
                // TODO: make this configurable
                scope: ScopeStore.msgTypes
            }
            if (typeof module === 'function') {
                content = module({messages})
            } else if (typeof module === 'object' && typeof module.default === 'function') {
                content = module.default({messages})
            } else {
                throw `Cannot execute module loaded for ${path}`
            }
        }

        return content;
    }
}

module.exports = LazyLoadPage;
