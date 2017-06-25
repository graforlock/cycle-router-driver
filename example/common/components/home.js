const { h3, div, p } = require('@cycle/dom');
const xs = require('xstream').default;

module.exports = function homeComponent() {
    return sources => {
        return {
            DOM: xs.of(
                div([
                    h3('Home yo!'),
                    p('lorem ipsum...')
                ])
            )
        }
    }
}