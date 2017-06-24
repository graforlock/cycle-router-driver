const assert = require('assert');

const UniversalRouter = require('universal-router');
const { createBrowserHistory, createMemoryHistory } = require('history');
const { adapt } = require('@cycle/run/lib/adapt');
const xs = require('xstream').default;

module.exports = function makeRouterDriver(routes, reqUrl) {
    assert.ok(routes, 'Cycle.js router Error: `routes` cannot be undefined.');

    const uRouter = new UniversalRouter(routes),
        history = typeof window !== 'undefined'
            ? createBrowserHistory()
            : createMemoryHistory();

    let unlisten = null;

    function routerDriver(input$) {
        input$.addListener({
            next: value => {
                if(value.goBack) {
                    history.goBack();
                } else {
                    history.push(value);
                }
            },
            error: error => {
                assert.error(`Cycle.js router Error: ${error}.`);
            },
            complete: () => {}
        });

        const incoming$ = xs.create({
            start: listener => {
                uRouter
                    .resolve(reqUrl || history.location.pathname)
                    .then(vtree => {
                        listener.shamefullySendNext({vtree, history});
                    }).catch(err => listener.shamefullySendError(err));

                unlisten = history.listen((location, action) => {
                    uRouter.resolve(location.pathname).then(vtree => {
                        listener.shamefullySendNext({vtree, history});
                    }).catch(err => listener.shamefullySendError(err));
                });
            },
            stop: () => {
                if (unlisten) {
                    unlisten();
                }
            }
        });
        return adapt(incoming$);
    }
    return routerDriver;
};
