const WAIT = 3000;
const NODE_PORT = process.env.NODE_PORT || 3000;

module.exports = {
  'Smoketest' (browser) {
    browser.url(`http://localhost:${NODE_PORT}/`);
    browser.expect.element('body').to.be.present.before(WAIT);
    browser.expect.element('body').text.to.contain('Client render').before(WAIT);
    browser.end();
      }
};
