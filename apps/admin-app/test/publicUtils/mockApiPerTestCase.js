const { createHandler } = require('../server/handlerUtils');
const server = require('../server/index');

/**
 * Resets handlers after a test case function completes
 */
module.exports = function mockApiPerTestCase(options) {
  const handler = createHandler({ options });
  server.use(handler);
};
