const assert = require('assert');

const UniversalRouter = require('universal-router');
const { createBrowserHistory, createMemoryHistory } = require('history');
const { adapt } = require('@cycle/run/lib/adapt');
const xs = require('xstream').default;

let history = null, unlisten = null;

const intent = {
    GO: 'GO',
    GO_BACK: 'GO_BACK',
    GO_FORWARD: 'GO_FORWARD',
    PUSH: 'PUSH',
    REPLACE: 'REPLACE'
};

const onNextState = value => {
    const intentMap = {
        [intent.GO]: payload => history.go(value.payload),
        [intent.GO_BACK]: () => history.goBack(),
        [intent.GO_FORWARD]: () => history.goForward(),
        [intent.PUSH]: payload => history.push(...payload),
        [intent.REPLACE]: payload => history.replace(...payload)
    };

    const handler = intentMap[value.type];
    if (handler) {
        handler(value.payload);
        return;
    }

    history.push(value);
};

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

        const uRouter = new UniversalRouter(routes);
        history = typeof window !== 'undefined'
            ? createBrowserHistory(options)
            : createMemoryHistory(options);

        function routerDriver(input$) {
            input$.addListener({
                next: onNextState,
                error: error => {
                    assert.error(`Cycle.js router Error: ${error}.`);
                },
                complete: () => {}
            });

            const incoming$ = xs.create({
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
            return adapt(incoming$);
        }
        return routerDriver;
    }
};
