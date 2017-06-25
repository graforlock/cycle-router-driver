import * as uRouter from '../src/index';
import { p, makeDOMDriver } from '@cycle/dom';
import { makeHTMLDriver } from '@cycle/html';
import { run } from '@cycle/run';
import { mockTimeSource } from '@cycle/time';

import { select } from 'snabbdom-selector';
import xs from 'xstream';

describe('uRouter', () => {
    describe('unit tests', () => {
        it('exports a makeRouterDriver driver function', () => {
            expect(typeof uRouter.makeRouterDriver).toBe('function');
        });

        it('exports a makeRouterDriver driver function', () => {
            expect(uRouter.makeRouterDriver({})).toMatchSnapshot();
        });

        it('matches current API snapshot', () => {
            expect(uRouter).toMatchSnapshot();
        });

        it('go(n)', () => {
            expect(uRouter.go(+1)).toMatchSnapshot();
        });

        it('goBack()', () => {
            expect(uRouter.goBack()).toMatchSnapshot();
        });

        it('goForward()', () => {
            expect(uRouter.goForward()).toMatchSnapshot();
        });

        it('push(..any)', () => {
            expect(uRouter.push('/test')).toMatchSnapshot();
        });

        it('replace(..any)', () => {
            expect(uRouter.replace('/test')).toMatchSnapshot();
        });
    });

    describe('functional tests', () => {
        function app(sources) {
            const vtree$ = sources.Router;

            return {
                DOM: vtree$
            };
        }
        const routes = [
            {
                path: '/:param',
                action: ({ params: { param } }) => p(`Hello ${param}.`)
            }
        ];

        describe('makeRouterDriver', () => {
            it('renders a correct markup for a given route', () => {
                run(app, {
                    DOM: makeHTMLDriver(html => {
                        expect(html).toEqual('<p>Hello World.</p>');
                    }),
                    Router: uRouter.makeRouterDriver(routes, { url: '/World' })
                });
            });

            it('throws an exception on non-existent route', () => {
                try {
                    run(app, {
                        DOM: makeHTMLDriver(html => {
                            expect(html).toEqual('<p>Hello World.</p>');
                        }),
                        Router: uRouter.makeRouterDriver(routes, { url: '/bad/route' })
                    });
                } catch(err) {
                    expect(err.message).toBe('Error: Page not found');
                }
            });
        });

        describe('mockRouterSource', () => {
            it('allows users to test router source', done => {
                const Time = mockTimeSource();

                const Router = uRouter.mockRouterSource(routes, {
                    url: '/World'
                });

                const text$ = app({ Router }).DOM.map(vtree => vtree.text);

                Time.assertEqual(
                    text$,
                    Time.diagram('x', { x: 'Hello World.' })
                );
                Time.run(done);
            });
        });
    });
});
