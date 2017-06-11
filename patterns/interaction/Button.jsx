import React from 'react'

function Button (props) {
    let {children} = props
    return (
        <button className="button">
            {children}
        </button>
    )
}

module.exports = Button
