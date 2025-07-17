const { rest } = require('msw');

const { validate, searchParamsToQueryObject } = require('./utils');

function createHandler({ options, isOnce = false }) {
  const validatedOptions = validate(options);

  const { baseUrl, method, url, successData, errorData, handler } = validatedOptions;

  const resolver = (req, res, ctx) => {
    let responseData;
    let isSuccess = true;

    // either successData or errorData or handler is required, but not multiple

    if (successData !== undefined) {
      responseData = successData;
    }
    else if (errorData !== undefined) {
      responseData = errorData;
      isSuccess = false;
    }
    else {
      try {
        // modify instead of spread, because spread only copies enumerable properties
        // make an express like query object
        req.query = searchParamsToQueryObject(req.url.searchParams);
        const { isError, data } = handler(req);
        isSuccess = !isError;
        responseData = data;
      }
      catch (error) {
        console.error('[Mocked Request Handler Error]', error);
        throw error;
      }
    }

    const status = isSuccess ? 200 : 400;
    if (isOnce) {
      return res.once(ctx.status(status), ctx.json(responseData));
    }
    return res(ctx.status(status), ctx.json(responseData));
  };

  if (typeof url === 'string') {
    return rest[method](`${baseUrl}${url}`, resolver);
  }
  // means url is regex and we cannot use with baseUrl
  return rest[method](url, resolver);
}

function createGlobalHandler(options) {
  return createHandler({ options });
}

module.exports = {
  createHandler,
  createGlobalHandler,
};
