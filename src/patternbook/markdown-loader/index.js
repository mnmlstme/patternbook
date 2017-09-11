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
        '<Patternbook.Render theme={Theme}',
        mod ? ' mod="' + mod + '"' : '',
        '>',
        content,
        '</Patternbook.Render>'
    ]
}

function sourceBlock(content, lang, attrs) {
    let source = markupSource(content, lang)

    return [
        '<Patternbook.Source lang="',
        lang,
        '">',
        source,
        '</Patternbook.Source>'
    ]
}

const fences = {
    render: function(content, lang, attrs) {
        return ['<Patternbook.Show>']
            .concat(renderBlock(content, lang, attrs), ['</Patternbook.Show>'])
            .join('')
    },

    show: function(content, lang, attrs) {
        return ['<Patternbook.Show>']
            .concat(
                renderBlock(content, lang, attrs),
                sourceBlock(content, lang, attrs),
                '</Patternbook.Show>'
            )
            .join('')
    },

    source: function(content, lang, attrs) {
        return ['<Patternbook.Show>']
            .concat(sourceBlock(content, lang, attrs), '</Patternbook.Show>')
            .join('')

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

function generateTheme(theme) {
    return theme
        ? [`let Theme = require('${theme}')`]
        : ['let Theme = Patternbook.DefaultTheme']
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
        '  let { ',
        (vars || []).join(','),
        '  } = props.scope || {}',
        '  let dispatch = props.dispatch',
        '  let { ',
        (msgtypes || []).join(','),
        '  } = messages(props.messages)',
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

    return output.join('\n')
}

module.exports = loader
