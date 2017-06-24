const {run} = require('@cycle/run');
const {makeHTMLDriver} = require('@cycle/html');
const express = require('express');
const path = require('path');
const makeRouterDriver = require('../../src/index');
const xs = require('xstream').default;

const server = express();

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/views'));
server.use(express.static(path.join(__dirname, '../../public')));

const app = require('../common/app');
const routes = require('../common/routes');

server.get('/favicon.ico', (req, res) => {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end();
});

server.use(function (req, res) {
  run(app, {
    Router: makeRouterDriver(routes, req.url),
    DOM: makeHTMLDriver(html => res.render('index', {content: html}))
  });
});

const port = 3000;
server.listen(port);
console.log(`Listening on port ${port}`);