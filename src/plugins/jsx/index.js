import { transform } from "@babel/standalone"
import React from 'react'

const pluginName = 'Patternbook JSX'

const defaultConfig = { presets: ['react', 'es2015'] };

function compile (source, signature, globals) {

    globals = Object.assign({React}, globals)
    let globalSignature = Object.keys(globals)
    let config = defaultConfig // TODO: configuration from book.js

    let moduleCode = `
({ ${ globalSignature.join(',') } }) =>
(({ dispatch, scope }) =>
(({ ${ signature.join(',') } }) => (
<React.Fragment>
${source}
</React.Fragment>))(scope))
`

    let result = {
        moduleCode
    }

    try {
        result.errorType = 'Babel Error'
        let compiled = transform(moduleCode, config)

        result.errorType = 'Module Load Error'
        let module = eval(compiled.code)

        result.errorType = 'Runtime Error'
        result.component = module( globals || {} )
    } catch (err) {
        result.error = err.toString()
    }

    return result
}


module.exports = {
    pluginName,
    defaultConfig,
    compile
};
