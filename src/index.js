import {run} from '@cycle/run';
import {makeRouterDriver} from './routerDriver';
import {makeDOMDriver, h1} from '@cycle/dom';
import {App} from './app';

const routes = [
  {
    path: '/',
    action: () => h1('index')
  },
  {
    path: '/heyho',
    action: ({params}) => {
      return h1(params.text);
    }
  }
];

const main = App;

const drivers = {
  Router: makeRouterDriver(routes),
  DOM: makeDOMDriver('#app')
};

run(main, drivers);
