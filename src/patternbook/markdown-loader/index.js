let frontMatter = require('front-matter')
let Prism = require('node-prismjs')
let Remarkable = require('remarkable')

function loader(content) {
    const callback = this.async()

    parse(content)
        .then(toModule)
        .then(component => callback(null, component))
        .catch(callback)
}

const fences = {
    render: function(content, lang) {
        let result =
            '<Patternbook.Show>' +
            '<Patternbook.Render theme={Theme}>' +
            content +
            '</Patternbook.Render>' +
            '</Patternbook.Show>'

        return result
    },

    show: function(content, lang) {
        let source = markupSource(content, lang)

        let result =
            '<Patternbook.Show>' +
            '<Patternbook.Render theme={Theme}>' +
            content +
            '</Patternbook.Render>' +
            '<Patternbook.Source lang="' +
            lang +
            '">' +
            source +
            '</Patternbook.Source>' +
            '</Patternbook.Show>'

        return result
    },

    source: function(content, lang) {
        let source = markupSource(content, lang)

        let result =
            '<Patternbook.Show>' +
            '<Patternbook.Source lang="' +
            lang +
            '">' +
            source +
            '</Patternbook.Source>' +
            '</Patternbook.Show>'

        return result
    }
}

let remarkable = new Remarkable()

remarkable.set({
    highlight: highlight,
    xhtmlOut: true
})

Object.keys(fences).map(key => {
    remarkable.renderer.rules.fence_custom[key] = function(
        tokens,
        idx,
        options
    ) {
        let tags = tokens[idx].params.split(/\s+/g)
        let content = tokens[idx].content
        let lang = tags.pop()
        return fences[key](content, lang, tags)
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
        .replace(/[{}]/g, '{"$&"}')
        .replace(/(\n)/g, '{"\\n"}')
        .replace(/class=/g, 'className=')
}

function highlight(code, lang) {
    const language = Prism.languages[lang] || Prism.languages.autoit
    return Prism.highlight(code, language)
}

function generateImports(imports) {
    return Object.keys(imports).map(
        module => `let ${module} = require('${imports[module]}')`
    )
}

function generateTheme(theme) {
    return theme
        ? [`let Theme = require('${theme}')`]
        : ['let Theme = () => ""']
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

function generateComponent(vars, jsx) {
    return [
        'let Component = function (props) {',
        '  props = props || {}',
        '  let { ',
        vars.join(','),
        '  } = props.scope || {}',
        '  let dispatch = props.dispatch',
        '  const {SET, RESET} = Patternbook.Scope.messageTypes',
        '  return (<section>',
        '    <svg width="0" height="0" style={{position:"absolute"}}>',
        '      <defs dangerouslySetInnerHTML={symbols}></defs></svg>',
        '    <style>{styles}</style>',
        jsx,
        '  </section>)',
        '}'
    ]
}

function toModule(payload) {
    let { html, attributes } = payload
    let jsx = html.replace(/class=/g, 'className=')

    let output = [
        "let React = require('react')",
        "let Patternbook = require('patternbook')"
    ].concat(
        generateImports(attributes.imports || {}),
        ['module.exports = function () {'],
        generateTheme(attributes.theme),
        generateScopeInitial(attributes.scope || {}),
        generateStyles(attributes.styles || []),
        generateSymbols(attributes.symbols || {}),
        generateComponent(Object.keys(attributes.scope || {}), jsx),
        [
            'return React.createElement(Patternbook.Scope, ',
            '    {component: Component, initial: initial}, [])',
            '}'
        ]
    )

    return output.join('\n')
}

module.exports = loader
