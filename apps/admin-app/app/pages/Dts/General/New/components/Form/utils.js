import { cloneDeep } from 'lodash';

export const preparePayload = payload => {
  const finalPayload = cloneDeep(payload);
  const removedProperties = ['ruleDescription', 'ruleCategory', 'rulePriority'];
  removedProperties.forEach(prop => delete finalPayload[prop]);
  finalPayload.realized = finalPayload.realized.toISOString();
  return finalPayload;
};
