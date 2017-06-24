const assert = require('assert'),
    { adapt } = require('@cycle/run/lib/adapt'),
    { createBrowserHistory, createMemoryHistory } = require('history'),
    xs = require('xstream').default,
    intent = require('./intent'),
    historyIntent = require('./core/historyIntent'),
    UniversalRouter = require('universal-router');

let history = null, unlisten = null;

module.exports = {
    go: payload => ({ type: intent.GO, payload }),
    goBack: () => ({ type: intent.GO_BACK }),
    goForward: () => ({ type: intent.GO_FORWARD }),
    push: (...payload) => ({ type: intent.PUSH, payload }),
    replace: (...payload) => ({ type: intent.REPLACE, payload }),

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
                    assert.error(`Cycle.js router Error: ${error}.`);
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
