import { createMemoryHistory } from 'history';
import xs from 'xstream';

import historyIntent from '../src/historyIntent';
import intents from '../src/intents';

describe('historyIntent', () => {
    const history = createMemoryHistory(), onNextState = historyIntent(history);

    it('gets called correctly with intents.GO', () => {
        const spy = jest.spyOn(history, 'go');

        onNextState({ type: intents.GO, payload: -1 });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(-1);
    });

    it('gets called correctly with intents.GO_BACK', () => {
        const spy = jest.spyOn(history, 'goBack');

        onNextState({ type: intents.GO_BACK });

        expect(spy).toHaveBeenCalled();
    });

    it('gets called correctly with intents.GO_FORWARD', () => {
        const spy = jest.spyOn(history, 'goForward');

        onNextState({ type: intents.GO_FORWARD });

        expect(spy).toHaveBeenCalled();
    });

    it('gets called correctly with intents.PUSH', () => {
        const expected = {
            pathname: '/home',
            search: '?the=query',
            state: { some: 'state' }
        };
        const spy = jest.spyOn(history, 'push');

        onNextState({ type: intents.PUSH, payload: expected });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(expected);
    });

    it('gets called correctly with intents.REDIRECT', () => {
        const spy = jest.spyOn(history, 'push');
        const redirect$ = xs.of({ type: intents.REDIRECT, payload: '/' })
            .map(({payload}) => payload)
        
        redirect$.addListener({ next: onNextState });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('/');
    });

    it('gets called correctly with intents.REPLACE', () => {
        const expected = ['/home', { some: 'state' }];
        const spy = jest.spyOn(history, 'replace');
        
        onNextState({ type: intents.REPLACE, payload: expected });

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
