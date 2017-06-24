import historyIntent from '../src/core/historyIntent';
import intent from '../src/intent';

import { createMemoryHistory } from 'history';

describe('historyIntent', () => {
    const history = createMemoryHistory(), onNextState = historyIntent(history);

    it('gets called correctly with intent.GO', () => {
        const spy = jest.spyOn(history, 'go');

        onNextState({ type: intent.GO, payload: -1 });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(-1);
    });

    it('gets called correctly with intent.GO_BACK', () => {
        const spy = jest.spyOn(history, 'goBack');

        onNextState({ type: intent.GO_BACK });

        expect(spy).toHaveBeenCalled();
    });

    it('gets called correctly with intent.GO_FORWARD', () => {
        const spy = jest.spyOn(history, 'goForward');

        onNextState({ type: intent.GO_FORWARD });

        expect(spy).toHaveBeenCalled();
    });

    it('gets called correctly with intent.PUSH', () => {
        const expected = {
            pathname: '/home',
            search: '?the=query',
            state: { some: 'state' }
        };
        const spy = jest.spyOn(history, 'push');

        onNextState({ type: intent.PUSH, payload: expected });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(expected);
    });

    it('gets called correctly with intent.REPLACE', () => {
        const expected = ['/home', { some: 'state' }];
        const spy = jest.spyOn(history, 'replace');

        onNextState({ type: intent.REPLACE, payload: expected });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(expected);
    });

    it('gets called correctly without intent (pushes a new route)', () => {
        const spy = jest.spyOn(history, 'push');

        onNextState('/route');

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('/route');
    });
});
