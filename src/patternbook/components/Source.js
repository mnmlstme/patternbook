import React from 'react'

function Source (props) {
    let {lang, children} = props

    return (
        <pre>
            <code className={lang && 'language-' + lang}>
                {children}
            </code>
        </pre>
    )
}

module.exports = Source
