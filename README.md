# cycle-router-driver

Cycle.js routing solution based on awesome `universal-router`. Works out-of-the-box both server and client side.

### `makeRouterDriver(routes, [url])`

Creates a router driver that should eventually return virtual dom (or any) component given route matches the current context. There is an optional `url` argument to the function due to passing request url in `express/nodejs` and any other non-browser environment (using `createMemoryHistory`).

