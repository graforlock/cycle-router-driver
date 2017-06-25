const { h3, div, p } = require('@cycle/dom');
const xs = require('xstream').default;

module.exports = function aboutParamComponent({ params: { param } }) {
    return sources => {
        return {
            DOM: xs.of(
                div([
                    h3(`About yo ${param}!`),
                    p('lorem ipsum...')
                ])
            )
        }
    }
}