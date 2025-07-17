import { cloneDeep } from 'lodash';

export const removePointPropertiesFromPayload = payload => {
  const finalPayload = cloneDeep(payload);
  const pointNames = ['warningPoint', 'rejectionPoint', 'acceptancePoint'];

  pointNames.forEach(item => delete finalPayload[item]);

  return finalPayload;
};
