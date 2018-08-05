import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'
import { StyleSheet, css } from 'aphrodite/no-important'

import Source from './Source'
import Render from './Render'

function Demo (props) {
    let { lang, mod, theme, children } = props
    let mods = mod ? mod.split(' ') : []
    let demoMod = mods.concat(['demo']).join(' ')

    return (
        <React.Fragment>
            <Render lang={lang} mod={demoMod} theme={theme}>
                {children}
            </Render>
            <Source lang={lang} mod={demoMod}>
                {children}
            </Source>
        </React.Fragment>
    )
}

module.exports = Demo
