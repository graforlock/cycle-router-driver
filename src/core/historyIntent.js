const intent = require('../intent');

module.exports = history => value => {
    const intentMap = {
        [intent.GO]: payload => history.go(value.payload),
        [intent.GO_BACK]: () => history.goBack(),
        [intent.GO_FORWARD]: () => history.goForward(),
        [intent.PUSH]: (...payload) => history.push(...payload),
        [intent.REPLACE]: (...payload) => history.replace(...payload)
    };

    const handler = intentMap[value.type];
    if (handler) {
        handler(value.payload);
        return;
    }
    history.push(value);
};
