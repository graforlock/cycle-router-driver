# cycle-router-driver

Cycle.js routing solution based on awesome `universal-router`. Works out-of-the-box both server and client side.

#### Example usage:

Check out example in the repository for the complete, SSR/isomorphic routing example.

# API Documentation:

### `makeRouterDriver(routes, [options])`

Creates a router driver that should eventually return virtual dom (or any) component given route matches the current context. There is an optional `url` argument to the function due to passing request url in `express/nodejs` and any other non-browser environment (using `createMemoryHistory`).


 #### a). `routes`

Routes is an object compatible with `universal-router` API.


#### b).  `options`

Options is an additional object of options that may include the following properties:

- *`url`* : It's the initial router url. Helpful for `nodejs` environment while rendering the app as a result of receiving `req.url`.
- *`historyOptions`* : Initial configuration object passed to history object. It matches `history` library API for `createBrowserHistory` and `createMemoryHistory`.

***

### `go(n)`

Accepts a `number` of steps to go from this point in the history. Internally, this returns `{ type: intent.GO, payload }` where payload is the `n` argument.

***

### `goBack()`

Goes back in history, doesn't require an argument. Internally, this returns `{ type: intent.GO_BACK }` with no payload.

***

### `goForward()`

Goes forward in history, doesn't require an argument. Internally, this returns `{ type: intent.GO_FORWARD }` with no payload.

***

### `push(...any)`

Accepts an object of the next, desirable route state to push. Matches `history` API.Internally, this returns `{ type: intent.PUSH, payload }` where payload is the `...any` argument. Heplful for manual, controlled tinkering with history API.

***

### `replace(...any)`

Accepts an object of the next, desirable route state to replace. Matches `history` API.Internally, this returns `{ type: intent.REPLACE, payload }` where payload is the `...any` argument. Just as `push`, it allows for manual, configurable sense of changes.
