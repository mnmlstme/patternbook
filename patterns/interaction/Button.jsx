import React from 'react'

function Button (props) {
    let {children, onClick} = props
    return (
        <button className="button"
            onClick={onClick}>
            {children}
        </button>
    )
}

module.exports = Button
