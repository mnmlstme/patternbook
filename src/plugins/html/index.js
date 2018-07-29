import React from 'react'

function HtmlRenderer (props) {
    let { source } = props
    let htmlSource = { __html: source }

    return <div dangerouslySetInnerHTML={htmlSource}/>
}

module.exports = { renderer: HtmlRenderer };
