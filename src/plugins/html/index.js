import React from 'react'

const pluginName = 'Patternbook HTML'

function compile (source) {
    let htmlSource = { __html: source }

    return {
        component: props => (<div dangerouslySetInnerHTML={htmlSource}/>)
    }
}

module.exports = {
    pluginName,
    compile
};
