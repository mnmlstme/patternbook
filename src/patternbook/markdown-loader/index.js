let frontMatter = require('front-matter')
let Remarkable = require('remarkable')

function loader(content) {
    const callback = this.async()

    parse(content)
        .then(toModule)
        .then(component => callback(null, component))
        .catch(callback)
}

function codeBlock(componentName, content, lang, attrs) {
    let source = escapeJsx(content)
    let mod = Object.keys(attrs)
        .filter(k => attrs[k] === true)
        .join(' ')

    return `<Patternbook.${componentName}
            lang="${lang}"
            mod="${mod}"
            theme={Theme}
        >
            ${source}
        </Patternbook.${componentName}>
    `
}

const fences = {
    render: function(content, lang, attrs) {
        return codeBlock('Render', content, lang, attrs)
    },

    source: function(content, lang, attrs) {
        return codeBlock('Source', content, lang, attrs)
    },

    demo: function(content, lang, attrs) {
        return codeBlock('Demo', content, lang, attrs)
    }
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

remarkable.renderer.rules.link_open = function(tokens, idx, options) {
    return `<Patternbook.Link to="${tokens[idx].href}">`
}

remarkable.renderer.rules.link_close = function() {
    return '</Patternbook.Link>'
}

remarkable.renderer.rules.code = function(tokens, idx /*, options, env */) {
    let code = escapeJsx(tokens[idx].content)

    return `<Patternbook.Code>${code}</Patternbook.Code>`
}

remarkable.renderer.rules.heading_open = function(tokens, idx) {
    return `<Patternbook.Heading level="${tokens[idx].hLevel}">`
}

remarkable.renderer.rules.heading_close = function() {
    return '</Patternbook.Heading>'
}

remarkable.renderer.rules.paragraph_open = function(tokens, idx) {
    return tokens[idx].tight ? '' : '<Patternbook.Paragraph>'
}

remarkable.renderer.rules.paragraph_close = function(tokens, idx) {
    return tokens[idx].tight ? '' : '</Patternbook.Paragraph>'
}

remarkable.renderer.rules.bullet_list_open = function(/* tokens, idx, options, env */) {
    return '<Patternbook.UList>'
}
remarkable.renderer.rules.bullet_list_close = function(tokens, idx /*, options, env */) {
    return '</Patternbook.UList>'
}

remarkable.renderer.rules.ordered_list_open = function(tokens, idx /*, options, env */) {
    var token = tokens[idx]
    var order = token.order > 1 ? ' start="' + token.order + '"' : ''
    return `<Patternbook.OList ${order}>`
}
remarkable.renderer.rules.ordered_list_close = function(tokens, idx /*, options, env */) {
    return '</Patternbook.OList>'
}

remarkable.renderer.rules.table_open = function() {
    return '<Patternbook.Table>'
}

remarkable.renderer.rules.table_close = function() {
    return '</Patternbook.Table>'
}

remarkable.renderer.rules.thead_open = function() {
    return '<Patternbook.THead>'
}

remarkable.renderer.rules.thead_close = function() {
    return '</Patternbook.THead>'
}

remarkable.renderer.rules.tbody_open = function() {
    return '<Patternbook.TBody>'
}

remarkable.renderer.rules.tbody_close = function() {
    return '</Patternbook.TBody>'
}

remarkable.renderer.rules.tr_open = function() {
    return '<Patternbook.TRow>'
}

remarkable.renderer.rules.tr_close = function() {
    return '</Patternbook.TRow>'
}

remarkable.renderer.rules.td_open = function(tokens, idx) {
    var token = tokens[idx]
    return '<Patternbook.TData' + (token.align ? ' align="' + token.align + '"' : '') + '>'
}

remarkable.renderer.rules.td_close = function() {
    return '</Patternbook.TData>'
}

remarkable.renderer.rules.th_open = function(tokens, idx) {
    var token = tokens[idx]
    return '<Patternbook.THeading' + (token.align ? ' align="' + token.align + '"' : '') + '>'
}

remarkable.renderer.rules.th_close = function() {
    return '</Patternbook.THeading>'
}

remarkable.renderer.rules.blockquote_open = function() {
    return '<Patternbook.Blockquote>'
}

remarkable.renderer.rules.blockquote_close = function() {
    return '</Patternbook.Blockquote>'
}

remarkable.renderer.rules.strong_open = function() {
    return '<Patternbook.Strong>'
}

remarkable.renderer.rules.strong_close = function() {
    return '</Patternbook.Strong>'
}

remarkable.renderer.rules.em_open = function() {
    return '<Patternbook.Emphasis>'
}

remarkable.renderer.rules.em_close = function() {
    return '</Patternbook.Emphasis>'
}

remarkable.renderer.rules.fence = function(tokens, idx, options) {
    let tags = tokens[idx].params.split(/\s+/g)
    let lang = tags.shift()
    let type = tags.shift()
    let render = fences[type] || fences.source
    let attrs = tags.map(s => s.split('=')).reduce((o, pair) => {
        let [key, value] = pair.length > 1 ? pair : [pair[0], true]
        o[key] = value
        return o
    }, {})
    let content = tokens[idx].content

    return render(content, lang, attrs)
}

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

    return (rx.test(jsx) ? jsx.replace(rx, ch => entity[ch]) : jsx).replace(/\n/g, '{"\\n"}')
}

function generateStyles(styles) {
    let list = styles.map(file => `require('${file}')`).join(',')
    return `let styles = [${list}]`
}

function generateSymbols(symbols) {
    let list = Object.keys(symbols)
        .map(k => `Patternbook.convertSvgToSymbol('${k}',require('${symbols[k]}')),`)
        .join(',')

    return `let symbols = {__html: [ ${list} ].join('') }`
}

function generateTheme(theme) {
  return theme ? [`let Theme = require('${theme}')`] : ['let Theme = null'];
}

function toModule(payload) {
    let { html, attributes } = payload
    let { imports, scope, messages, styles, symbols, theme } = attributes || {}
    let importStatements = Object.keys(imports || {})
      .map(module => `import ${module} from '${imports[module]}';`)
      .join('\n')
    let importList = Object.keys(imports || {})
    let scopeList = Object.keys(scope || {})
        .map(key => [key, JSON.stringify(scope[key])].join(':'))
    let messageList = Object.keys(messages || {})
        .map(key => [key, `props.messages.${messages[key]}`].join(':'))
    let initialMap = importList.concat(messageList, scopeList)
        .join(',')
    let jsx = html
        // add whitespace where JSX ignores but HTML doesn't
        .replace(/(>)\n\s+([^<])/g, '$1 $2')
        .replace(/([^>])\n\s*(<[^/])/g, '$1 $2')
        .replace(/(<[/][\w.]+>)\n([^<])/g, '$1 $2')

    let module = `
import React from 'react';
import Patternbook from 'patternbook';
${importStatements}
export default function (props) {
    ${generateStyles(styles || [])}
    ${generateSymbols(symbols || {})}
    ${generateTheme(theme)}

    return (
        <Patternbook.Scope
            initial={ {${initialMap}} }
        >
            <Patternbook.Article>
                <svg
                    width="0"
                    height="0"
                    style={{position:"absolute"}}
                >
                    <defs dangerouslySetInnerHTML={symbols}></defs>
                </svg>'
                <style>{styles}</style>
                ${jsx}
            </Patternbook.Article>
        </Patternbook.Scope>
    );
}
`
    console.log('\n====\n', module, '\n====\n')

    return module
}

module.exports = loader
