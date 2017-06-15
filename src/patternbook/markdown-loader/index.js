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
        .replace(/class=/g, 'className=');
}

function highlight (code, lang) {
    const language = Prism.languages[lang] || Prism.languages.autoit
    return Prism.highlight(code, language)
}

function toModule(payload) {
    let {html, attributes} = payload
    let imports = attributes.imports || {}
    let context = attributes.context || {}
    let jsx = html.replace(/class=/g, 'className=')

    let output = [
            "let React = require('react')",
            "let Patternbook = require('patternbook')"
        ]
        .concat(
            Object.keys(imports)
            .map( module =>
                `let ${module} = require('${imports[module]}')`
        ))
        .concat(
            Object.keys(context)
            .map( variable =>
                `let ${variable} = ` + JSON.stringify(context[variable])
        ))
        .concat([
            'module.exports = function () {',
            'return (<section>',
            jsx,
            '</section>)}'
        ])

    return output.join("\n")
}

module.exports = loader
