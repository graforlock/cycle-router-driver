// features/support/world.js
require('../../example/server/index.js');
require('chromedriver');
var seleniumWebdriver = require('selenium-webdriver');
var { defineSupportCode } = require('cucumber');

function CustomWorld() {
    this.driver = new seleniumWebdriver.Builder().forBrowser('chrome').build();
}

defineSupportCode(function({ setWorldConstructor }) {
    setWorldConstructor(CustomWorld);
});
