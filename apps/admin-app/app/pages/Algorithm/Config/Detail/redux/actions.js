import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ALGORITHM.CONFIG.DETAIL}_`;

export const { Types, Creators } = createActions({
  getConfigDetailRequest: { key: null, namespace: null },
  getConfigDetailSuccess: { data: {} },
  getConfigDetailFailure: { error: null },
  getConfigValueRequest: { key: null, namespace: null },
  getConfigValueSuccess: { data: {} },
  getConfigValueFailure: { error: null },
  updateConfigValueRequest: { key: null, value: {}, namespace: null },
  updateConfigValueSuccess: { data: {} },
  updateConfigValueFailure: { error: null },
  searchCustomConfigRequest: { namespace: null, searchTerm: null },
  searchCustomConfigSuccess: { data: [] },
  searchCustomConfigFailure: { error: null },
  updateConfigNodeRequest: { namespace: null, key: null, updateBody: null },
  updateConfigNodeSuccess: { data: {} },
  updateConfigNodeFailure: { error: null },
  deleteConfigNodeRequest: { namespace: null, key: null },
  deleteConfigNodeSuccess: { data: {} },
  deleteConfigNodeFailure: { error: null },
  linkCustomConfigRequest: { namespace: null, leftKey: null, rightKey: null },
  linkCustomConfigSuccess: { data: {} },
  linkCustomConfigFailure: { error: null },
  unlinkCustomConfigRequest: { namespace: null, leftKey: null, rightKey: null },
  unlinkCustomConfigSuccess: { data: null },
  unlinkCustomConfigFailure: { error: null },
  getLinkedConfigsRequest: { key: null, namespace: null },
  getLinkedConfigsSuccess: { data: [] },
  getLinkedConfigsFailure: { error: null },
  getConfigSchemaRequest: { namespace: null },
  getConfigSchemaSuccess: { data: {} },
  getConfigSchemaFailure: { error: null },
  validateConfigValueRequest: { namespace: null, value: null },
  validateConfigValueSuccess: { data: {} },
  validateConfigValueFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
