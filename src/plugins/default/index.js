import React from 'react'

const pluginName = 'Patternbook Default'

function compile (source) {
    return {
        component: () => (<div>{htmlSource}</div>)
    }
}

module.exports = {
    pluginName,
    compile
};
