let frontMatter = require('front-matter')
let Prism = require('prismjs')
let Remarkable = require('remarkable')

function loader(content) {
    const callback = this.async()

    parse(content)
        .then(toModule)
        .then(component => callback(null, component))
        .catch(callback)
}

function renderBlock(content, lang, attrs) {
    let mod = Object.keys(attrs).filter(k => attrs[k] === true).join(' ')

    return [
        '<Patternbook.Render theme={Wrapper}',
        mod ? ' mod="' + mod + '"' : '',
        '>',
        content,
        '</Patternbook.Render>'
    ]
}

function sourceBlock(content, lang, attrs) {
    let source = markupSource(content, lang)
    let mod = Object.keys(attrs).filter(k => attrs[k] === true).join(' ')

    return [
        '<Patternbook.Source lang="',
        lang,
        '"',
        mod ? ' mod="' + mod + '"' : '',
        '>',
        source,
        '</Patternbook.Source>'
    ]
}

const fences = {
    render: function(content, lang, attrs) {
        return renderBlock(content, lang, attrs).join('')
    },

    source: function(content, lang, attrs) {
        return sourceBlock(content, lang, attrs).join('')
    },

    demo: function(content, lang, attrs) {
        let mod = Object.keys(attrs).filter(k => attrs[k] === true).join(' ')

        return ['<Patternbook.Demo', mod ? ' mod="' + mod + '"' : '', '>']
            .concat(
                renderBlock(content, lang, attrs),
                sourceBlock(content, lang, attrs),
                '</Patternbook.Demo>'
            )
            .join('')
    }
}

let remarkable = new Remarkable()

remarkable.set({
    highlight: highlight,
    xhtmlOut: true
})

remarkable.renderer.rules.link_open = function(tokens, idx, options) {
    return '<Patternbook.Link to="' + tokens[idx].href + '">'
}

remarkable.renderer.rules.link_close = function() {
    return '</Patternbook.Link>'
}

remarkable.renderer.rules.heading_open = function(tokens, idx) {
    return '<Patternbook.Heading level={' + tokens[idx].hLevel + '}>'
}

remarkable.renderer.rules.heading_close = function() {
    return '</Patternbook.Heading>'
}

remarkable.renderer.rules.paragraph_open = function() {
    return '<Patternbook.Paragraph>'
}

remarkable.renderer.rules.paragraph_close = function() {
    return '</Patternbook.Paragraph>'
}

remarkable.renderer.rules.blockquote_open = function() {
    return '<Patternbook.Blockquote>'
}

remarkable.renderer.rules.blockquote_close = function() {
    return '</Patternbook.Blockquote>'
}

Object.keys(fences).map(key => {
    remarkable.renderer.rules.fence_custom[key] = function(
        tokens,
        idx,
        options
    ) {
        let tags = tokens[idx].params.split(/\s+/g)
        let type = tags.shift()
        let lang = tags.shift()
        let attrs = tags.map(s => s.split('=')).reduce((o, pair) => {
            let [key, value] = pair.length > 1 ? pair : [pair[0], true]
            o[key] = value
            return o
        }, {})
        let content = tokens[idx].content
        return fences[key](content, lang, attrs)
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

function markupSource(content, lang) {
    return highlight(content, lang)
        .replace(/[{}]+/g, '{"$&"}')
        .replace(/(\n)/g, '{"\\n"}')
        .replace(/class=/g, 'className=')
}

function highlight(code, lang) {
    const language = Prism.languages[lang] || Prism.languages.markup
    return Prism.highlight(code, language)
}

function generateImports(imports) {
    return Object.keys(imports).map(
        module => `let ${module} = require('${imports[module]}')`
    )
}

function generateWrapper(theme) {
    return theme
        ? [`let Wrapper = require('${theme}')`]
        : ['let Wrapper = Patternbook.DefaultWrapper']
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
    let jsx = html.replace(/class=/g, 'className=')

    let output = [
        "import React from 'react'",
        "import Patternbook from 'patternbook'"
    ].concat(
        generateImports(attributes.imports || {}),
        ['module.exports = function () {'],
        generateWrapper(attributes.theme),
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

    console.log('\n====\n', output.join('\n'), '\n====\n')
    return output.join('\n')
}

module.exports = loader
