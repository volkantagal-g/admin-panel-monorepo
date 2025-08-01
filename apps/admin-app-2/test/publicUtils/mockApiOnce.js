const { createHandler } = require('../server/handlerUtils');
const server = require('../server/index');

/**
 * Resets handler after it is used once
 */
module.exports = function mockApiOnce(options) {
  const handler = createHandler({ options, isOnce: true });
  server.use(handler);
};
