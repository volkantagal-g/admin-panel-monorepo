import { toString, get } from 'lodash';

import * as Yup from 'yup';

import { shipmentTypes, transferLimitTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getDiffObj, setNullToEmptyStringDeep, isObjectIdValid, getRegexForCaseSensitiveLetters } from '@shared/utils/common';

import { planningSegment, transferType } from '../../constants';

export const getSelectFilterOption = (_inputValue = '', option = {}, isIdSearchable = false, searchTerm = 'label', key = 'value') => {
  const keyValue = toString(get(option, key)) || '';
  const label = toString(get(option, searchTerm)) || toString(option.children) || '';
  const inputValue = toString(_inputValue);
  const ids = inputValue.split(',').map(id => id.trim()).filter(id => isObjectIdValid(id));
  const inputValueRegex = getRegexForCaseSensitiveLetters(inputValue);
  const matchedWords = label.match(inputValueRegex);
  let isMatched = !!get(matchedWords, 'length');
  if (isIdSearchable && ids.length) {
    isMatched = ids.includes(keyValue);
  }
  if (isIdSearchable && isObjectIdValid(keyValue) && keyValue === _inputValue) {
    isMatched = keyValue === _inputValue;
  }
  return isMatched;
};

export const getSelectOptionsWithoutTransferGroups = type => {
  let selectedType = transferLimitTypes;
  if (type === 'shipment') {
    selectedType = shipmentTypes;
  }
  return (Object.entries(selectedType).map(([key, value]) => ({
    value: toString(key),
    label: get(value, [getLangKey()]),
  })));
};

export const getPlanningSegmentOptions = () => {
  return (Object.entries(planningSegment).map(([key, value]) => ({
    value: toString(key),
    label: value,
  })));
};

export const getTransferTypeOptions = () => {
  return (Object.entries(transferType).map(([key, value]) => ({
    value: toString(key),
    label: get(value, [getLangKey()]),
  })));
};

export const getTransferGroupOptions = (transferGroups = []) => transferGroups.map(transferGroup => ({
  value: transferGroup?._id,
  label: get(transferGroup, ['name', getLangKey()], ''),
}));

export const getInitialValues = (values, transferGroupsValue) => ({
  transferLimitType: values?.transferLimitType?.toString(),
  planningSegment: values?.planningSegment?.toString(),
  transferType: values?.transferType?.toString(),
  mainStoreSpecs: { shipmentType: values?.mainStoreSpecs?.shipmentType?.toString(), transferColiCount: values?.mainStoreSpecs?.transferColiCount },
  transferGroups: transferGroupsValue?.map(productTransferGroup => (productTransferGroup?.transferGroup)),
  isInFrozenLocation: !!values?.isInFrozenLocation,
  isAllowedForSelfPurchaseOrder: !!values?.isAllowedForSelfPurchaseOrder,
  isAllowedForSelfTransfer: !!values?.isAllowedForSelfTransfer,
  isPickedToZero: !!values?.isPickedToZero,
  isCreated: !!values?.productId,
  transferToleranceMinLimit: values?.transferToleranceMinLimit,
  transferToleranceMaxLimit: values?.transferToleranceMaxLimit,
});

export const validationSchema = () => Yup.object().shape({
  transferLimitType: Yup.number().nullable(true),
  planningSegment: Yup.string().nullable(true),
  transferType: Yup.string().nullable(true),
  mainStoreSpecs: Yup.object().shape({
    transferColiCount: Yup.number().nullable(true),
    shipmentType: Yup.string(),
  }),
  transferGroups: Yup.array().of(Yup.string()).nullable(true),
});

export const getModifiedValues = ({ mainStoreSpecs, transferLimitType, ...otherValues }) => ({
  ...otherValues,
  transferLimitType: Number(transferLimitType),
  mainStoreSpecs: {
    shipmentType: Number(mainStoreSpecs?.shipmentType),
    transferColiCount: mainStoreSpecs.transferColiCount,
  },
});

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const modifiedInitialValues = getModifiedValues(initialValues);
  const modifiedValues = getModifiedValues(values);
  const { newValues: changedValues } = getDiffObj(modifiedInitialValues, modifiedValues);
  setNullToEmptyStringDeep(changedValues);
  return { ...changedValues, isCreated: initialValues?.isCreated, hasTransferGroup: !!changedValues?.transferGroups };
};
