import React from 'react'

function Show (props) {
    let {children} = props

    return (
        <figure>
            {children}
        </figure>
    )
}

module.exports = Show
