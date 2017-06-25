const { redirect } = require('../../src/index');

const homeComponent = require('./components/home');
const aboutComponent = require('./components/about');
const aboutParamComponent = require('./components/aboutParam');
const notFoundComponent = require('./components/notFound');

module.exports = [
    {
        path: '/',
        action: homeComponent
    },
    {
        path: '/about',
        action: aboutComponent
    }, 
    {
        path: '/about/:param',
        action: aboutParamComponent
    },
    {
        path: '/redirect',
        action: () => redirect('/')
    },
    {
        path: '/*',
        action: notFoundComponent
    }
];
