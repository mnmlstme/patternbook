import React from 'react'

function Page (props) {
    return (
        <article>
            <header>
                <h6> patternbook </h6>
            </header>
            {props.children}
            <footer>
                presented by patternbook
            </footer>
        </article>
    )
}

module.exports = Page
