import React from 'react'

function Render (props) {
    let {children} = props
    
    return (
        <div>
            {children}
        </div>
    )
}

module.exports = Render
