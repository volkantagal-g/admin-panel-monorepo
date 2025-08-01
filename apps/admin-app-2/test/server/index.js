const { setupServer } = require('msw/node');

// handlers from api folder, globally available for all tests
const globalApiHandlers = require('./handlersGlobalApis');
// static files such as translation json files
const staticHandlers = require('./handlersStaticFiles');

const server = setupServer(...globalApiHandlers, ...staticHandlers);

module.exports = server;
