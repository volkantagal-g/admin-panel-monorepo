import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import isNil from 'lodash/isNil';

import { getLangKey } from '@shared/i18n';
import { getirDomainTypesAllShortcuts } from '@shared/shared/constantValues';

const dynamicLevelsMap = {
  levelOne: 1,
  levelTwo: 2,
  levelThree: 3,
  levelFour: 4,
  levelFive: 5,
};

export const formatDynamicFeeBeforeSubmit = dynamicFees => {
  const fees = dynamicFees;
  Object.keys(fees).forEach(key => {
    if (isEmpty(fees[key])) delete fees[key];
  });
  return Object.keys(fees).reduce(
    (acc, cur) => ({ ...acc, [dynamicLevelsMap[cur]]: fees[cur] }),
    {},
  );
};

export const formatZoneBasedFixedAmountBeforeSubmit = ({
  fixedDeliveryFeeAmountZoneOne,
  fixedDeliveryFeeAmountZoneTwo,
  fixedDeliveryFeeAmountZoneThree,
}) => ({
  1: { fee: fixedDeliveryFeeAmountZoneOne },
  2: { fee: fixedDeliveryFeeAmountZoneTwo },
  3: { fee: fixedDeliveryFeeAmountZoneThree },
});

export const extractDynamicFees = (deliveryFee = {}) => {
  return Object.values(deliveryFee).map(fee => fee);
};

export const extractMinAndFeeValuesFromArray = ({ min, fee }) => ({
  min: isArray(min) ? min[0] : min,
  fee: isArray(fee) ? fee[0] : fee,
});

export const getMinAndFeeValues = feeObj => {
  const objKeys = Object.keys(feeObj);
  const nonEmptyFeeValues = objKeys.filter(key => feeObj[key]);
  if (!isEmpty(nonEmptyFeeValues)) {
    return nonEmptyFeeValues.reduce((acc, curr) => {
      const fees = feeObj[curr]?.map(({ min, fee }) => extractMinAndFeeValuesFromArray({ min, fee }));
      return { ...acc, [curr]: fees };
    }, {});
  }
  return undefined;
};

export const domainTypeOptions = Object.keys(getirDomainTypesAllShortcuts).map(
  key => ({
    value: key,
    label: getirDomainTypesAllShortcuts[key]?.[getLangKey()],
  }),
);

export const getSelectedDomainType = domainType => domainTypeOptions.find(
  ({ value }) => value?.toString() === domainType?.toString(),
);

export const getDynamicFeeValues = dynamicFees => {
  const [levelOne, levelTwo, levelThree, levelFour, levelFive] =
    extractDynamicFees(dynamicFees);
  return { levelOne, levelTwo, levelThree, levelFour, levelFive };
};

export const extractFeeValuesFromArray = value => (isArray(value) ? value[0] : value);

export const validateMinAndFeeValue = ({
  value,
  fees,
  record,
  t,
  dataIndex,
}) => {
  const orderedFees = orderBy(fees, 'key', ['asc']);
  const recordIndex = orderedFees.findIndex(fee => fee?.key === record?.key);
  const hasUsedValue = orderedFees.some(
    fee => fee[dataIndex] === value && fee.key !== record.key,
  );
  if (hasUsedValue) {
    return Promise.reject(t('error:DIFFERENT_VALUE'));
  }
  if (recordIndex === 0 && dataIndex === 'fee') {
    const hasMaxFee = orderedFees.some(
      fee => fee[dataIndex] > value && fee.key !== record.key,
    );
    if (hasMaxFee) {
      return Promise.reject(t('error:ERR_MAX_FEE_VALUE'));
    }
  }
  const prevFeeValue = orderedFees[recordIndex - 1];
  if (
    (dataIndex === 'min' && prevFeeValue?.min > value) ||
    (dataIndex === 'fee' && prevFeeValue?.fee < value)
  ) {
    return Promise.reject(
      t(dataIndex === 'min' ? 'error:ERR_MIN_VALUE' : 'error:ERR_FEE_VALUE'),
    );
  }
  return true;
};

export const isValidFeeValue = value => !Number.isNaN(value) && value >= 0;

export const hasMinFeeValue = fees => {
  if (isEmpty(fees)) {
    return false;
  }
  return !!fees?.find(({ fee }) => fee === 0);
};

export const tError = (t, errorKey) => t(`ERRORS.${errorKey}`);

export const removeEmptyStringsAndNilValuesFromFeeObject = obj => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    if (newObj[key] === '' || isNil(newObj[key])) {
      delete newObj[key];
    }
    if (key === 'zoneBasedFixedDeliveryFeeAmount') {
      Object.keys(newObj[key]).forEach(zoneIndex => {
        if (newObj[key][zoneIndex]?.fee === '' || isNil(newObj[key][zoneIndex]?.fee)) {
          delete newObj[key][zoneIndex];
        }
      });
    }
  });
  return newObj;
};
