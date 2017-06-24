const { run } = require('@cycle/run');
const { makeDOMDriver } = require('@cycle/dom');
const app = require('../common/app');
const routes = require('../common/routes');
const { makeRouterDriver } = require('../../src/index');

run(app, {
    Router: makeRouterDriver(routes),
    DOM: makeDOMDriver('#app'),
    PreventDefault: ev$ =>
        ev$.addListener({
            next: ev => ev.preventDefault()
        })
});
