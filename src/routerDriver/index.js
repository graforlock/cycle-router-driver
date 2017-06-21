import UniversalRouter from 'universal-router';
import createHistory from 'history/createBrowserHistory'
import {adapt} from '@cycle/run/lib/adapt';
import xs from 'xstream';

export function makeRouterDriver(routes) {
    const uRouter = new UniversalRouter(routes),
        history = createHistory();

    function routerDriver(input$) {
        input$.addListener({
            next: value => {
                console.log('Navigated to: ', value);
            },
            error: error => { console.error(error); },
            complete: () => {}
        });

        const incoming$ = xs.create({
            start: async listener => {
                const html = await uRouter.resolve(history.location.pathname); 
                listener.shamefullySendNext(html);
                   
                history.listen(async (location, action) => {
                    const html = await uRouter.resolve(location.pathname);
                    listener.shamefullySendNext(html);
                });   
            },
            stop: () => {}
        });
        return adapt(incoming$);
    }
    return routerDriver;
}