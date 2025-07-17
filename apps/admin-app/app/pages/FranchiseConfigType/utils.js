import { uniqueId } from 'lodash';

import { NON_EDITABLE_FIELDS } from './constants';

/**
 * Transforms request payload to match the API schema
 * It omits the id and isFresh field from fields array's objects
 * and excludes the fields with id in fieldIdsToDelete array
 * @param {object} payload
 * @returns {object} transformed payload
 */
export const transformPayload = (payload, fieldIdsToDelete) => {
  const { fields } = payload;
  const newFields = fields.filter(field => !fieldIdsToDelete.includes(field.id)).map(({ id, isFresh, isEditable, ...rest }) => rest);
  return { ...payload, fields: newFields };
};

/**
 * Transforms repsonse body to match the required schema
 * Currently it generates and adds id field and isFresh fields for each object in fields array for state management
 * @param {object} data
 * @returns {object} transformed response data
 */
export const transformResponse = data => {
  if (!data || !data.fields) return data;
  const { fields } = data;
  const newFields = fields.map(field => ({ ...field, id: uniqueId('field_'), isFresh: false, isEditable: !NON_EDITABLE_FIELDS.includes(field.name) }));
  return { ...data, fields: newFields };
};

/**
 * Returns field keys/name from field ids
 * @param {object} payload
 * @param {array} fieldIds
 * @returns {array} field keys
 */
export const getFieldKeysFromFieldIds = (payload, fieldIds) => {
  const { fields } = payload;
  const fieldKeys = fields.filter(field => fieldIds.includes(field.id)).map(field => field.name);
  return fieldKeys;
};
