const xs = require('xstream').default;
const { block, go, goBack, goForward, push } = require('../../src/index');
const intents = require('../../src/intents');

module.exports = function app(sources) {
    const click$ = sources.DOM.select('a').events('click');

    const navigate$ = click$
        .filter(ev => ev.target.className === 'menu-link')
        .map(ev => ev.target.getAttribute('href'));

    const goBack$ = click$
        .filter(ev => ev.target.className === 'menu-link--back')
        .mapTo(goBack());

    const goForward$ = click$
        .filter(ev => ev.target.className === 'menu-link--forward')
        .mapTo(goForward());

    const redirect$ = sources.Router
        .filter(router => router.type === intents.REDIRECT)
        .map(({payload}) => payload);

    const vtree$ = sources.Router
        .filter(router => router.type !== intents.REDIRECT)
        .map(vtree => vtree);

    return {
        DOM: vtree$,
        Router: xs.merge(xs.merge(goBack$, goForward$), navigate$, redirect$),
        PreventDefault: click$
    };
};
