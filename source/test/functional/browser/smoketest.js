const WAIT = 3000;

module.exports = {
  'Smoketest' (browser) {
    browser.url(`${browser.launchUrl}/`);
    browser.waitForElementVisible('body', WAIT);
    browser.expect.element('body').text.to.contain('Client render').before(WAIT);
    browser.end();
  }
};
