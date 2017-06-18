let frontMatter = require('front-matter')
let Prism = require('node-prismjs')
let Remarkable = require('remarkable')

function loader (content) {

  const callback = this.async();

  parse(content)
    .then(toModule)
    .then(component => callback(null, component))
    .catch(callback);
}

const fences = {
    render: function (content, lang) {
        let result =
            '<Patternbook.Render>' +
            content +
            '</Patternbook.Render>'

        return result
    },

    show: function (content, lang) {
        let source = markupSource(content, lang)

        let result =
            '<Patternbook.Show>' +
            '<Patternbook.Render>' +
            content +
            '</Patternbook.Render>' +
            '<Patternbook.Source lang="' + lang + '">' +
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

Object.keys(fences).map( key => {
    remarkable.renderer.rules.fence_custom[key] =
        function (tokens, idx, options) {
            let tags = tokens[idx].params.split(/\s+/g)
            let content = tokens[idx].content
            let lang = tags.pop()
            return fences[key](content, lang, tags)
        }
})

function parse (content) {
    return new Promise((resolve, reject) => {
        try {
            let {body, attributes} = frontMatter(content)
            let html = remarkable.render(body)
            resolve({ html, attributes })
        } catch (err) {
            reject(err)
        }
    })
}

function markupSource (content, lang) {
    return highlight(content, lang)
        .replace(/[{}]/g, '{"$&"}')
        .replace(/(\n)/g, '{"\\n"}')
        .replace(/class=/g, 'className=');
}

function highlight (code, lang) {
    const language = Prism.languages[lang] || Prism.languages.autoit
    return Prism.highlight(code, language)
}

function toModule(payload) {
    let {html, attributes} = payload
    let imports = attributes.imports || {}
    let scope = attributes.scope || {}
    let jsx = html.replace(/class=/g, 'className=')

    let output = [
            "let React = require('react')",
            "let Patternbook = require('patternbook')"
        ]
        .concat(
            Object.keys(imports)
                .map( module =>
                    `let ${module} = require('${imports[module]}')`),
            [
                'module.exports = function () {',
                'let initial = {',
            ],
            Object.keys(scope)
                .map( variable =>
                    variable + ':' + JSON.stringify(scope[variable]) +','),
            [
                '}',
                'let Component = function (props) {',
                '  props = props || {}',
                '  let { ',
                Object.keys(scope).join(','),
                '  } = props.scope || {}',
                '  let dispatch = props.dispatch',
                '  const {SET, RESET} = Patternbook.Scope.messageTypes',
                '  return (<section>',
                jsx,
                '  </section>)',
                '}',
                '  return React.createElement(Patternbook.Scope, {component: Component, initial: initial}, [])',
                '}'
            ]
        )

    return output.join("\n")
}

module.exports = loader
