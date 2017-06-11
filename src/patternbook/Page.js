import React from 'react'

function Page (props) {
    return (
        <article>
            <header>
                <h1> Page </h1>
            </header>
            <section>
                {props.children}
            </section>
            <footer>
                patternbook
            </footer>
        </article>
    )
}

module.exports = Page
