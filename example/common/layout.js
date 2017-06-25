const { a, div, h1, section, p } = require('@cycle/dom');

const appLayout = (headerText, ...contents) =>
    section('.layout', [
        h1(headerText),
        p(a('.menu-link', { attrs: { href: '/about' } }, '.push("/about")')),
        p(a('.menu-link', { attrs: { href: '/about/param' } }, '.push("/about/param")')),
        p(a('.menu-link--back', { attrs: { href: '' } }, '.goBack()')),
        p(a('.menu-link--forward', { attrs: { href: '' } }, '.goForward()')),
        div(contents)
    ]);

module.exports = appLayout;