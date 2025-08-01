const Joi = require('joi');

const { baseURL } = require('../../app/axios/constants');

const DEFAULT_VALUES = {
  // default base value is api-gw/v1, similar to axios calling standard
  baseUrl: baseURL,
  method: 'post',
};

const optionsSchema = Joi.object().keys({
  baseUrl: Joi.string().default(DEFAULT_VALUES.baseUrl),
  method: Joi.string().valid('get', 'post', 'put', 'patch', 'delete').default(DEFAULT_VALUES.method),
  url: Joi.alternatives().try(Joi.string().required().pattern(/^\//, '< must start with "/" >'), Joi.object().regex()),
  successData: Joi.any(),
  errorData: Joi.any().when('successData', {
    is: Joi.exist(),
    then: Joi.forbidden().messages({ 'any.unknown': '"errorData" is forbidden when "successData" is set' }),
  }),
  // we already handle successData or errorData if provided, so we don't need handler if one of them exist
  handler: Joi.func().when('successData', {
    is: Joi.exist(),
    then: Joi.forbidden().messages({ 'any.unknown': '"handler" is forbidden when "successData" is set' }),
    otherwise: Joi.func().when('errorData', {
      is: Joi.exist(),
      then: Joi.forbidden().messages({ 'any.unknown': '"handler" is forbidden when "errorData" is set' }),
      otherwise: Joi.func().required().messages({ 'any.required': 'handler is required when successData and errorData are not set' }),
    }),
  }),
}).required();

/**
 * @param {Object} options - options object
 * @param {("get" | "post" | "put" | "patch" | "delete")} options.method - HTTP method, defaults to "POST" since we usually use post for api-gw
 * @param {Function} options.handler - takes req object and returns an object with data and options:
 * ```js
 *   { data: any, isError: Boolean }
 * ```
 */

function validate(options) {
  const { error, value } = optionsSchema.validate(options, { abortEarly: false });
  if (error) {
    throw new Error(error);
  }
  return value;
}

function searchParamsToQueryObject(searchParams) {
  const query = {};
  if (!(searchParams instanceof URLSearchParams)) {
    return query;
  }
  // "for of" is fine in nodejs land
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of searchParams) {
    query[key] = value;
  }
  return query;
}

module.exports = {
  validate,
  DEFAULT_VALUES,
  searchParamsToQueryObject,
};
