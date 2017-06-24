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

module.exports = [
    {
        path: '/',
        action: () => appLayout('Home yo!', p('lorem ipsum....'))
    },
    {
        path: '/about',
        action: () => appLayout('About yo!', p('lorem ipsum....'))
    },
    {
        path: '/about/:param',
        action: ({ params: { param } }) =>
            appLayout(`About yo ${param}!`, p('lorem ipsum....'))
    }
];
