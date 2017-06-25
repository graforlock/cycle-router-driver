const { h3, div, p } = require('@cycle/dom');
const xs = require('xstream').default;

module.exports = function notFoundComponent({ params: { param } }) {
    return sources => {
        return {
            DOM: xs.of(
                div([
                    h3('404 yo!'),
                    p('lorem ipsum...')
                ])
            )
        }
    }
}


