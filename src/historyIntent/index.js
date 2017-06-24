const intents = require('../intents');

module.exports = history => value => {
    const intentsMap = {
        [intents.GO]: payload => history.go(value.payload),
        [intents.GO_BACK]: () => history.goBack(),
        [intents.GO_FORWARD]: () => history.goForward(),
        [intents.PUSH]: (...payload) => history.push(...payload),
        [intents.REPLACE]: (...payload) => history.replace(...payload)
    };

    const handler = intentsMap[value.type];
    if (handler) {
        handler(value.payload);
        return;
    }
    history.push(value);
};
