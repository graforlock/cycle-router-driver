[![CircleCI](https://circleci.com/gh/graforlock/cycle-router-driver.svg?style=svg)](https://circleci.com/gh/graforlock/cycle-router-driver) [![npm version](https://badge.fury.io/js/cycle-router-driver.svg)](https://badge.fury.io/js/cycle-router-driver) [![codecov](https://codecov.io/gh/graforlock/cycle-router-driver/branch/master/graph/badge.svg)](https://codecov.io/gh/graforlock/cycle-router-driver)
[![stability](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)](https://nodejs.org/api/documentation.html#documentation_stability_index)


Cycle.js routing solution based on awesome `universal-router`. Works out-of-the-box both server and client side.

#### Example usage:

Check out example in the repository for the complete, SSR/isomorphic routing [example](https://github.com/graforlock/cycle-router-driver/tree/master/example).

#### Note: 

In real life scenario, you would normally have route components that look more like this, exposing DOM (and more) in the `app/main` component:

```javascript
// common/aboutRoute.js

async function aboutRoute({params: {user}}) {
    // (...)
    // do something with user parameter,
    // like `await` for initial user data,
    // then (maybe) put it in the stream.
    // (...)
    return function aboutComponent(sources) {
        const vtree$ = user$.map(user =>
            div('.users', [
              div('.user-details', [
                  h1('.user-name', user.name),
                  h4('.user-email', user.email),
                  a('.user-website', {href: user.website}, user.website)
              ])
            );

        return {
            DOM: vtree$
        }
    }
}

```
So, instead of the returned `vtree` value like in the [`common/app.js`](https://github.com/graforlock/cycle-router-driver/blob/master/example/common/app.js#L25) example, that'd be in fact a `component` function of sorts, exposing, for instance, DOM stream. 

Soon, there will be more examples to display correct isolated route architecture.

***

### [makeRouterDriver(routes, [options])](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L43)

Creates a router driver that should eventually return virtual dom (or any) component given route matches the current context. There is an optional `options` argument object to the function. It may be used for additional history config or passing request url in other non-browser environment (using `createMemoryHistory`).


 #### [routes](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L44)

Routes is an object compatible with `universal-router` API.


#### [options](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L45)

Options is an additional object of options that may include the following properties:

- *[url](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L45)* : It's the initial router url. Helpful for `nodejs` environment while rendering the app as a result of receiving `req.url`.
- *[historyOptions](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L45)* : Initial configuration object passed to history object. It matches `history` library API for `createBrowserHistory` and `createMemoryHistory`.

***

### [mockRouterSource(routes, url)](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L43)

Utility function that mocks the router source for testing purposes. It currently is mandatory to provide url as an object `{ url: url }`. This behaviour may change in future. Check out [example](https://github.com/graforlock/cycle-router-driver/blob/master/__tests__/index.test.js#L71) in tests.

***

### [intents](https://github.com/graforlock/cycle-router-driver/blob/master/src/intents/index.js)

Object that exports all available intents that are used to interact with `history` API. All possible choices are:
```
GO
GO_BACK
GO_FORWARD
PUSH
REDIRECT
REPLACE
```
***

### [go(n)](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L37)

Accepts a `number` of steps to go from this point in the history. Internally, this returns `{ type: intent.GO, payload }` where payload is the `n` argument.

***

### [goBack()](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L38)

Goes back in history, doesn't require an argument. Internally, this returns `{ type: intent.GO_BACK }` with no payload.

***

### [goForward()](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L39)

Goes forward in history, doesn't require an argument. Internally, this returns `{ type: intent.GO_FORWARD }` with no payload.

***

### [push(...any)](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L40)

Accepts an object of the next, desirable route state to push. Matches `history` API.Internally, this returns `{ type: intent.PUSH, payload }` where payload is the `...any` argument. Heplful for manual, controlled tinkering with history API.

***

### [redirect(url)](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L41)

Accepts a string of the new location. Under the hood, it would perform a regular history `push`. Returns `{ type: intent.REDIRECT, payload }`. 

***

### [replace(...any)](https://github.com/graforlock/cycle-router-driver/blob/master/src/index.js#L41)

Accepts an object of the next, desirable route state to replace. Matches `history` API.Internally, this returns `{ type: intent.REPLACE, payload }` where payload is the `...any` argument. Just as `push`, it allows for manual, configurable sense of changes.
