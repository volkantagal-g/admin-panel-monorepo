import { Tag } from 'antd';
import { filter } from 'lodash';

import { convertSelectOptions } from '@shared/utils/common';
import { PERSON_TRAINING_TYPE, TAG_PROPERTY } from './constants';
import { ACTIVENESS_OPTIONS } from '@shared/shared/constantValues';

export const showStatus = ({ isActivated, isReservable, trainings, t }) => {
  const status = isReservable || isActivated || filter(trainings, { trainingType: PERSON_TRAINING_TYPE.SAFE_RIDING }).length > 0;
  const { color, label } = TAG_PROPERTY[status];

  return <Tag color={color}>{t(label)}</Tag>;
};

export const personListRequestParams = ({ name, isActivated, uniqueIdentifier }) => {
  const params = {
    sort: { createdAt: -1 },
    query: { isActivated },
    fields: 'name isReservable isActivated personalGsm gsm trainings picURL homeAddress',
  };

  if (name?.length > 2) {
    params.query.name = name;
  }

  if (uniqueIdentifier) {
    params.query.uniqueIdentifier = uniqueIdentifier;
  }

  return params;
};

export const convertedActivenessOptions = convertSelectOptions(ACTIVENESS_OPTIONS, { valueKey: 'value', labelKey: 'label', hasTranslationKey: true });
