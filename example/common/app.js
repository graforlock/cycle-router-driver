const xs = require('xstream').default;

module.exports = function app(sources) {
    const click$ = sources.DOM.select('a')
        .events('click');

    const navigate$ = click$
        .filter(ev => ev.target.className === 'menu-link')
        .map(ev => ev.target.getAttribute('href'));

    const goBack$ = click$
        .filter(ev => ev.target.className === 'menu-link--back')
        .mapTo({goBack: true});

    const vtree$ = sources.Router
        .map(({vtree}) => vtree);

    return {
        DOM: vtree$,
        Router: xs.merge(navigate$, goBack$),
        PreventDefault: click$
    };
}