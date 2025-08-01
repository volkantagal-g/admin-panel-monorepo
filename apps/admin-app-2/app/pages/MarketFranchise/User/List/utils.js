import { Tag } from 'antd';

import { getLimitAndOffset, convertSelectOptions } from '@shared/utils/common';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';
import { TAG_PROPERTY } from './constants';

export const getFranchiseUserListRequestParams = ({ filter, active, pagination }) => {
  const requestData = {
    ...{ filter, active },
    ...getLimitAndOffset(pagination),
  };

  return requestData;
};

export const convertedActivenessOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });

export const showStatus = ({ active, t }) => {
  const { color, label } = TAG_PROPERTY[active];

  return <Tag color={color}>{t(label)}</Tag>;
};

export const returnFilterValue = filterValue => (filterValue === '' ? undefined : filterValue);
