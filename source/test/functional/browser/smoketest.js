const WAIT = 20000;
const NODE_PORT = process.env.NODE_PORT || 3000;

module.exports = {
  'Smoketest' (browser) {
    browser.url(`http://localhost:${NODE_PORT}/`);
    browser.waitForElementVisible('body', WAIT);
    browser.click('body');
    browser.expect.element('body').text.to.contain('Client render').before(WAIT);
    browser.end();
      }
