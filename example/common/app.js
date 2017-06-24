const xs = require('xstream').default;
const { block, go, goBack, goForward, push } = require('../../src/index');

module.exports = function app(sources) {
    const click$ = sources.DOM.select('a').events('click');

    const navigate$ = click$
        .filter(ev => ev.target.className === 'menu-link')
        .map(ev => ev.target.getAttribute('href'));

    const back$ = click$
        .filter(ev => ev.target.className === 'menu-link--back')
        .mapTo(goBack());

    const forward$ = click$
        .filter(ev => ev.target.className === 'menu-link--forward')
        .mapTo(goForward());

    const vtree$ = sources.Router.map(vtree => vtree);

    return {
        DOM: vtree$,
        Router: xs.merge(xs.merge(back$, forward$) , navigate$),
        PreventDefault: click$
    };
};
