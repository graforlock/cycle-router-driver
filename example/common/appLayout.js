const { a, h1, section, ul, li, nav, footer } = require('@cycle/dom');

const appLayout = (...contents) =>
    section('.layout', [
        h1('cycle-router-driver'),
        nav([
            ul([
                li(a('.menu-link', { attrs: { href: '/about' } }, '.push("/about")')),
                li(a('.menu-link', { attrs: { href: '/about/param' } }, '.push("/about/param")')),
                li(a('.menu-link--back', { attrs: { href: '' } }, '.goBack()')),
                li(a('.menu-link--forward', { attrs: { href: '' } }, '.goForward()')),
            ])
        ]),
        section(contents),
        footer()
    ]);

module.exports = appLayout;