import React from 'react';
import PropTypes from 'prop-types';
import ErrorPage from './ErrorPage';

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

    render() {
        let { extension, importFromTarget } = this.context
        let { path } = this.props
        let { module, error, errorPath } = this.state
        let content;

        if ( error && errorPath === path ) {
            return <ErrorPage title="Error">
                Error loading "{path}": {error.message}
            </ErrorPage>
        }

        if (!module) {
            content = <h1>Loading Content&hellip;</h1>;
            console.log(`Requesting "${path}"`)
            importFromTarget(path + extension)
                .then(module => {
                    console.log(`Loaded "${path}"`)
                    this.setState({ module, error: null, errorPath: '' })
                })
                .catch(error => {
                    debugger
                    console.log(`Error loading "${path}": ${error}`);
                    this.setState({ module: null, error, errorPath: path })
                });
        } else {
            try {
                if (typeof module === 'function') {
                    content = module()
                } else if (typeof module === 'object' && typeof module.default === 'function') {
                    content = module.default()
                } else {
                    throw `Cannot execute module loaded for ${path}`
                }
            } catch (e) {
                error = e
                this.setState({ error, errorPath: path })
            }
        }

        return content;
    }
}

module.exports = LazyLoadPage;
