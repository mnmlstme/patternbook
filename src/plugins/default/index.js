import React from 'react'

const pluginName = 'Patternbook Plaintext'

function compile (source) {
    return {
        component: () => (<pre>{source}</pre>)
    }
}

module.exports = {
    pluginName,
    compile
};
