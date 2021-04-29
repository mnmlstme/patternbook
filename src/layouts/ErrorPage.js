import React from 'react'

// TODO: CSS

function ErrorPage({ title, children }) {
    return (
        <div>
            <header><h1>{title}</h1></header>
            <p>There was an error loading this page:</p>
            <pre>
                {children}
            </pre>
        </div>
    )
}

module.exports = ErrorPage
