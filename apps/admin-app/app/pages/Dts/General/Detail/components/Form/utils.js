import { cloneDeep } from 'lodash';

export const preparePayload = payload => {
  const finalPayload = cloneDeep(payload);
  const removedProperties = ['ruleDescription', 'ruleCategory', 'rulePriority'];
  removedProperties.forEach(prop => delete finalPayload[prop]);
  finalPayload.realized = finalPayload.realized.toISOString();
  if (typeof finalPayload.rule === 'object') {
    finalPayload.rule = finalPayload.rule._id;
  }
  if (typeof finalPayload.feedbackSource === 'object') {
    finalPayload.feedbackSource = finalPayload.feedbackSource._id;
  }
  return finalPayload;
};
