// features/step_definitions/browser_steps.js
const seleniumWebdriver = require('selenium-webdriver');
const { defineSupportCode } = require('cucumber');

defineSupportCode(function({ Given, When, Then }) {
    Given('I am currently on the homepage', function() {
        return this.driver.get('http://localhost:3000');
    });

    When('I try to navigate to {redirect} page', function(redirect) {
        return this.driver.navigate('/redirect');
    });

    Then('I should now again see {headerText} header', function(headerText) {
        var xpath = "//*[contains(text(),'" + headerText + "')]";
        var condition = seleniumWebdriver.until.elementLocated({
            xpath: xpath
        });
        return this.driver.wait(condition, 5000);
    });
});
