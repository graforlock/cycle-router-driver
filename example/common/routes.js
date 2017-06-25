const layout = require('./layout');
const { p } = require('@cycle/dom');
const { redirect } = require('../../src/index');

module.exports = [
    {
        path: '/',
        action: () => layout('Home yo!', p('lorem ipsum....'))
    },
    {
        path: '/about',
        action: () => layout('About yo!', p('lorem ipsum....'))
    },
    {
        path: '/about/:param',
        action: ({ params: { param } }) =>
            layout(`About yo ${param}!`, p('lorem ipsum....'))
    },
    {
        path: '/redirect',
        action: () => redirect('/')
    },
    {
        path: '/*',
        action: () => layout('404 yo!', p('lorem ipsum....'))
    }
];
