const { h3, div, p } = require('@cycle/dom');
const xs = require('xstream').default;

module.exports = function aboutComponent() {
    return sources => {
        return {
            DOM: xs.of(
                div([
                    h3('About yo!'),
                    p('lorem ipsum...')
                ])
            )
        }
    }
}