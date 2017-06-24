// features/step_definitions/browser_steps.js
const seleniumWebdriver = require('selenium-webdriver');
const { defineSupportCode } = require('cucumber');

defineSupportCode(function({ Given, When, Then }) {
    Given('I am on a homepage', function() {
        return this.driver.get('http://localhost:3000');
    });

    Then('I should first see {homePageText} header', function(text) {
        var xpath = "//*[contains(text(),'" + text + "')]";
        var condition = seleniumWebdriver.until.elementLocated({
            xpath: xpath
        });
        return this.driver.wait(condition, 5000);
    });

    When('I click {text}', function(text) {
        return this.driver
            .findElement({ linkText: text })
            .then(function(element) {
                return element.click();
            });
    });

    Then('I should now see {aboutPageText} header', function(text) {
        var xpath = "//*[contains(text(),'" + text + "')]";
        var condition = seleniumWebdriver.until.elementLocated({
            xpath: xpath
        });
        return this.driver.wait(condition, 5000);
    });

    When('I now click {text} link', function(text) {
        return this.driver
            .findElement({ linkText: text })
            .then(function(element) {
                return element.click();
            });
    });

    Then('I should see {homePageText} again', function(text) {
        var xpath = "//*[contains(text(),'" + text + "')]";
        var condition = seleniumWebdriver.until.elementLocated({
            xpath: xpath
        });
        return this.driver.wait(condition, 5000);
    });
});
