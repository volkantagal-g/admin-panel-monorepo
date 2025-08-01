import {
  DETAIL_INFO_KEYS,
  DETAIL_INFO_LABEL_MAPPING,
  DETAIL_INFO_SEPARATORS,
} from '@app/pages/MarketProductChainManagement/constants';
import { WAREHOUSE_DETAIL_TYPES } from '@app/pages/MarketProductChainManagement/Warehouses/constants';

import { getLabels } from './formHelper';

const CONTENT_HANDLERS = {
  [DETAIL_INFO_KEYS.WAREHOUSE_TYPE]: (data, contentKey, labelType) => getLabels(data[contentKey], labelType),

  [DETAIL_INFO_KEYS.DOMAIN]: data => data.domainTypes.map(type => getLabels(type, DETAIL_INFO_LABEL_MAPPING[DETAIL_INFO_KEYS.DOMAIN])),

  [DETAIL_INFO_KEYS.LOCAL]: (data, contentKey, labelType) => getLabels(data[contentKey], labelType),
};

export function getContent(key, contentKey, data, mockData) {
  const currentData = data || mockData(data?.detailType === WAREHOUSE_DETAIL_TYPES.WAREHOUSE ? 'WAREHOUSE' : 'PRODUCT');
  const labelType = DETAIL_INFO_LABEL_MAPPING[key] || key.toLowerCase();

  const handler = CONTENT_HANDLERS[key];
  return handler
    ? handler(currentData, contentKey, labelType)
    : getLabels(currentData[contentKey], labelType);
}

export function formatDisplayContent(key, content) {
  if (!content) return '';

  if (!Array.isArray(content)) {
    return content.toString();
  }

  const separator = DETAIL_INFO_SEPARATORS[key] || DETAIL_INFO_SEPARATORS.DEFAULT;
  return content.filter(Boolean).join(separator);
}
