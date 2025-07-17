import { get } from 'lodash';

import { PERSON_INFORMATION_CHANGE_STATUSES } from '@shared/shared/constants';
import { relationTypes } from '@shared/shared/constantValues';

import { getLangKey } from '@shared/i18n';

export const getFormattedData = data => {
  const { _id, status, person, franchise, changeDetail, approveDetail, ignoreDetail } = data;

  const changeDetails = [];
  let note = '';
  Object.keys(changeDetail || {}).forEach(key => {
    if (typeof changeDetail[key] === 'object') {
      Object.keys(changeDetail[key]).forEach(deepKey => {
        if (deepKey === 'relation') {
          const oldValue = get(relationTypes[get(person, [key, deepKey], '-')], [getLangKey()]) || '-';
          const newValue = get(relationTypes[get(changeDetail, [key, deepKey], '-')], [getLangKey()]) || '-';
          changeDetails.push({
            key: `${key}_${deepKey}`,
            oldValue,
            newValue,
          });
        }
        else {
          changeDetails.push({
            key: `${key}_${deepKey}`,
            oldValue: get(person, [key, deepKey], '-'),
            newValue: get(changeDetail, [key, deepKey], '-'),
          });
        }
      });
    }
    else {
      changeDetails.push({
        key,
        oldValue: get(person, key, '-'),
        newValue: get(changeDetail, key, '-'),
      });
    }
  });

  if (status === PERSON_INFORMATION_CHANGE_STATUSES.ACCEPTED) {
    note = get(approveDetail, 'description', '-') || '-';
  }
  else if (status === PERSON_INFORMATION_CHANGE_STATUSES.REJECTED) {
    note = get(ignoreDetail, 'description', '-') || '-';
  }

  const returnData = {
    _id,
    status,
    changeDetails,
    note,
    franchiseName: get(franchise, 'name', '-'),
    personName: get(person, 'name', '-'),
    isWorkerCourier: get(person, 'couriers', []).length > 0,
    isWorkerPicker: get(person, 'pickers', []).length > 0,
  };

  return returnData;

};
