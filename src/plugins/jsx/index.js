import React, { PureComponent } from 'react'
import { transform } from "@babel/standalone";
import PropTypes from 'prop-types';

const defaultConfig = { presets: ['react', 'es2015'] };

class JsxRenderer extends PureComponent {

    static propTypes = {
        source: PropTypes.string.isRequired,
        scope: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        config: PropTypes.object
    }

    constructor (props) {
        super(props)
        this.state = {
            error: null,
            component: null,
            sourceForComponent: null
        }
    }

    static getDerivedStateFromProps (props, state) {
        let { source, config, scope } = props;
        let { sourceForComponent } = state;
        let nextState = {};
        const listkeys = dict => Object.keys(dict || {}).join(',')
        let moduleScope = Object.assign({},{ React }, scope)
        config = config || defaultConfig

        if ( source !== sourceForComponent ) {
            let moduleCode = `
({ ${ listkeys(moduleScope) } }) => (({dispatch, ${ listkeys(scope) } }) => (
<React.Fragment>

${source}

</React.Fragment>))
`

            nextState = {
                sourceForComponent: source,
                moduleCode,
                component: null,
                errorType: null,
                error: null,
            }

            try {
                nextState.errorType = 'Babel Error'
                let compiled = transform(moduleCode, config)

                nextState.errorType = 'Module Load Error'
                let module = eval(compiled.code)

                nextState.errorType = 'Runtime Error'
                nextState.component = module( moduleScope || {} )
            } catch (err) {
                nextState.error = err.toString()
            }

        }

        return nextState
    }

    componentDidCatch(error, info) {
        this.setState({
            error,
            errorType: 'Component Rendering Error'
        })
    }

    render () {
        let { dispatch, scope } = this.props
        let { component, moduleCode, error, errorType } = this.state

        if ( error ) {
            return ( <div>
                {errorType && (<h2>{errorType}</h2>)}
                <pre>{error.toString()}</pre>
                <pre>{moduleCode}</pre>
            </div> )
        } else if ( component ) {
            return React.createElement(
                component,
                Object.assign({}, {dispatch}, scope),
                [])
        } else {
            return null
        }
    }
}

module.exports = { renderer: JsxRenderer };
