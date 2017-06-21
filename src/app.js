import {h1} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {
  const vtree$ = sources.Router
    .map(html => html);
  
  const click$ = sources.DOM.select('document')
    .events('click')
    .map(() =>
      h1('cliiiiiickt!') 
    );

  const merge$ = xs.merge(vtree$, click$);  
  
  const sinks = {
    DOM: merge$
  }
  return sinks
}
