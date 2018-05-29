let frontMatter = require('front-matter')
let Remarkable = require('remarkable')

function loader(content) {
    const callback = this.async()

    parse(content)
        .then(toModule)
        .then(component => callback(null, component))
        .catch(callback)
}

let remarkable = new Remarkable({
    // allow HTML/JSX tags in Markdown:
    html: true,
    typographer: true,
    // linkifying could affect code:
    linkify: false,
    // JSX is like XHTML (no implied tags)
    xhtmlOut: true
})

Object.assign(remarkable.renderer.rules, {
    link_open : (tokens, idx, options) =>
        `<Patternbook.Link to="${tokens[idx].href}">`,

    link_close: () => '</Patternbook.Link>',

    code: (tokens, idx) =>
        `<Patternbook.Code>${escapeJsx(tokens[idx].content)}</Patternbook.Code>`,

    heading_open: (tokens, idx) =>
        `<Patternbook.Heading level="${tokens[idx].hLevel}">`,

    heading_close: () => '</Patternbook.Heading>',

    paragraph_open: (tokens, idx) =>
        tokens[idx].tight ? '' : '<Patternbook.Paragraph>',

    paragraph_close: (tokens, idx) =>
        tokens[idx].tight ? '' : '</Patternbook.Paragraph>',

    bullet_list_open: () => '<Patternbook.UList>',

    bullet_list_close: (tokens, idx) => '</Patternbook.UList>',

    ordered_list_open: (tokens, idx) => {
        var token = tokens[idx]
        var order = token.order > 1 ? ' start="' + token.order + '"' : ''
        return `<Patternbook.OList ${order}>`
    },

    ordered_list_close: (tokens, idx) => '</Patternbook.OList>',

    table_open: () => '<Patternbook.Table>',

    table_close: () => '</Patternbook.Table>',

    thead_open: () => '<Patternbook.THead>',

    thead_close: () => '</Patternbook.THead>',

    tbody_open: () => '<Patternbook.TBody>',

    tbody_close: () => '</Patternbook.TBody>',

    tr_open: () => '<Patternbook.TRow>',

    tr_close: () =>'</Patternbook.TRow>',

    td_open: (tokens, idx) => {
        var token = tokens[idx]
        return (
            '<Patternbook.TData' +
            (token.align ? ' align="' + token.align + '"' : '') +
            '>'
        )
    },

    td_close: () =>'</Patternbook.TData>',

    th_open: (tokens, idx) => {
        var token = tokens[idx]
        return (
            '<Patternbook.THeading' +
            (token.align ? ' align="' + token.align + '"' : '') +
            '>'
        )
    },

    th_close: () => '</Patternbook.THeading>',

    blockquote_open: () => '<Patternbook.Blockquote>',

    blockquote_close: () => '</Patternbook.Blockquote>',

    strong_open: () => '<Patternbook.Strong>',

    strong_close: () => '</Patternbook.Strong>',

    em_open: () => '<Patternbook.Emphasis>',

    em_close: () => '</Patternbook.Emphasis>',

    fence: (tokens, idx, options) => {
        let tags = tokens[idx].params.split(/\s+/g)
        let lang = tags.shift()
        let type = tags.shift()
        let attrs = tags.map(s => s.split('=')).reduce((o, pair) => {
            let [key, value] = pair.length > 1 ? pair : [pair[0], true]
            o[key] = value
            return o
        }, {})
        let content = tokens[idx].content
        let source = escapeJsx(content)
        let mod = Object.keys(attrs)
          .filter(k => attrs[k] === true)
          .join(' ')

        return `<Patternbook.Source lang="${lang}" mod="${mod}">${source}</Patternbook.Source>`
    }
})

function parse(content) {
    return new Promise((resolve, reject) => {
        try {
            let { body, attributes } = frontMatter(content)
            let html = remarkable.render(body)
            resolve({ html, attributes })
        } catch (err) {
            reject(err)
        }
    })
}

function escapeJsx(jsx) {
    const rx = /[&<>{}"]/g
    const entity = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '{': '&#123;',
        '}': '&#125;',
        '"': '&quot;'
    }

    return (rx.test(jsx) ? jsx.replace(rx, ch => entity[ch]) : jsx).replace(
        /\n/g,
        '{"\\n"}'
    )
}

function generateImports(imports) {
    return Object.keys(imports).map(
        module => `let ${module} = require('${imports[module]}')`
    )
}

function generateTheme(theme) {
    return theme ? [`let Theme = require('${theme}')`] : ['let Theme = null']
}

function generateScopeInitial(scope) {
    return ['let initial = {'].concat(
        Object.keys(scope).map(
            variable => variable + ':' + JSON.stringify(scope[variable]) + ','
        ),
        ['}']
    )
}

function generateStyles(styles) {
    return ['let styles = ['].concat(
        styles.map(file => `require('${file}'),`),
        ['].join("")']
    )
}

function generateSymbols(symbols) {
    let keys = Object.keys(symbols)
    return ['let symbols = {__html: ['].concat(
        keys.map(
            k =>
                `Patternbook.convertSvgToSymbol('${k}',require('${symbols[
                    k
                ]}')),`
        ),
        ['].join("")}']
    )
}

function generateMessages(messages) {
    let keys = Object.keys(messages)
    return [
        'function messages(root) {',
        '  return {',
        keys.map(k => `${k}: root.${messages[k]}`).join(','),
        '  }',
        '}'
    ]
}

function generateComponent(jsx, vars, msgtypes) {
    return [
        'let Component = function (props) {',
        '  props = props || {}',
        '  let dispatch = props.dispatch',
        '  let { ',
        (vars || []).join(','),
        '  } = props.scope || {}',
        '  let { ',
        (msgtypes || []).join(','),
        '  } = messages(props.messages)',
        '  return (<Patternbook.Article>',
        '    <svg width="0" height="0" style={{position:"absolute"}}>',
        '      <defs dangerouslySetInnerHTML={symbols}></defs></svg>',
        '    <style>{styles}</style>',
        jsx,
        '  </Patternbook.Article>)',
        '}'
    ]
}

function toModule(payload) {
    let { html, attributes } = payload
    let jsx = html
        // add whitespace where JSX ignores but HTML doesn't
        .replace(/(>)\n\s+([^<])/g, '$1 $2')
        .replace(/([^>])\n\s*(<[^/])/g, '$1 $2')
        .replace(/(<[/][\w.]+>)\n([^<])/g, '$1 $2')

    let output = [
        "import React from 'react'",
        "import Patternbook from 'patternbook'"
    ].concat(
        generateImports(attributes.imports || {}),
        ['module.exports = function () {'],
        generateTheme(attributes.theme),
        generateScopeInitial(attributes.scope || {}),
        generateStyles(attributes.styles || []),
        generateSymbols(attributes.symbols || {}),
        generateMessages(attributes.messages || {}),
        generateComponent(
            jsx,
            attributes.scope && Object.keys(attributes.scope),
            attributes.messages && Object.keys(attributes.messages)
        ),
        [
            'return React.createElement(Patternbook.Scope, ',
            '    {component: Component, initial: initial}, [])',
            '}'
        ]
    )

    // console.log('\n====\n', output.join('\n'), '\n====\n')

    return output.join('\n')
}

module.exports = loader
