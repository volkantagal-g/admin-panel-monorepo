import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ALGORITHM.CONFIG.DOMAIN.BASE.DETAIL}_`;

export const { Types, Creators } = createActions({
  getAlgorithmDomainConfigDetailRequest: { key: null, namespace: null },
  getAlgorithmDomainConfigDetailSuccess: { data: {} },
  getAlgorithmDomainConfigDetailFailure: { error: null },
  getAlgorithmDomainConfigValueRequest: { key: null, namespace: null },
  getAlgorithmDomainConfigValueSuccess: { data: {} },
  getAlgorithmDomainConfigValueFailure: { error: null },
  updateAlgorithmDomainConfigValueRequest: { key: null, value: {}, namespace: null },
  updateAlgorithmDomainConfigValueSuccess: { data: {} },
  updateAlgorithmDomainConfigValueFailure: { error: null },
  getAlgorithmDomainSettingsRequest: { namespace: null },
  getAlgorithmDomainSettingsSuccess: { data: {} },
  getAlgorithmDomainSettingsFailure: { error: null },
  getWarehouseDetailRequest: { key: null },
  getWarehouseDetailSuccess: { data: {} },
  getWarehouseDetailFailure: { error: null },
  setNamespace: { namespace: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
