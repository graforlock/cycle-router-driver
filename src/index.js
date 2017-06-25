const assert = require('assert');

const { adapt } = require('@cycle/run/lib/adapt');
const { createBrowserHistory, createMemoryHistory } = require('history');
const historyIntent = require('./historyIntent');
const intents = require('./intents');
const UniversalRouter = require('universal-router');
const xs = require('xstream').default;


let history = null, unlisten = null;

module.exports = {
    go: payload => ({ type: intents.GO, payload }),
    goBack: () => ({ type: intents.GO_BACK }),
    goForward: () => ({ type: intents.GO_FORWARD }),
    push: (...payload) => ({ type: intents.PUSH, payload }),
    redirect: payload => ({ type: intents.REDIRECT, payload }),
    replace: (...payload) => ({ type: intents.REPLACE, payload }),

    makeRouterDriver: function makeRouterDriver(
        routes,
        { url = false, options = {} } = {}
    ) {
        assert.ok(
            routes,
            'Cycle.js router Error: `routes` cannot be undefined.'
        );

        history = typeof window !== 'undefined'
            ? createBrowserHistory(options)
            : createMemoryHistory(options);

        const uRouter = new UniversalRouter(routes),
            onNextState = historyIntent(history);

        function routerDriver(input$) {
            input$.addListener({
                next: onNextState,
                error: error => {
                    assert.fail(`Cycle.js router Error: ${error}.`);
                },
                complete: () => {}
            });

            const output$ = xs.create({
                start: listener => {
                    uRouter
                        .resolve(url || history.location.pathname)
                        .then(vtree => {
                            listener.shamefullySendNext(vtree);
                        })
                        .catch(err => listener.shamefullySendError(err));

                    unlisten = history.listen((location, action) => {
                        uRouter
                            .resolve(location.pathname)
                            .then(vtree => {
                                listener.shamefullySendNext(vtree);
                            })
                            .catch(err => listener.shamefullySendError(err));
                    });
                },
                stop: () => {
                    if (unlisten) {
                        unlisten();
                    }
                }
            });
            return adapt(output$);
        }
        return routerDriver;
    },
    mockRouterSource: function mockRouterSource(routes, { url }) {
        const output$ = xs.create({
            start: listener => {
                new UniversalRouter(routes)
                    .resolve(url)
                    .then(vtree => listener.shamefullySendNext(vtree));
            },
            stop: () => {}
        });
        return adapt(output$);
    }
};
