import { get } from 'lodash';

import * as Yup from 'yup';

import { productSegments } from '@shared/shared/constantValues';
import { productSegments2, kviLabels } from '@app/pages/MarketProduct/constantValues';
import { getLangKey } from '@shared/i18n';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const getSelectOptionsForSegments = type => {
  let selectedType = productSegments2;
  if (type === 'segments') {
    selectedType = productSegments;
  }
  if (type === 'kviLabel') {
    selectedType = kviLabels;
  }
  return (Object.entries(selectedType).map(([key, value]) => ({
    value: key.toString(),
    label: get(value, [getLangKey()]),
  })));
};

export const getInitialValues = (values, kviLabel) => ({
  segments: values?.segments?.map(segment => (segment.toString())),
  segments2: values?.segments2?.map(segment => (segment.toString())),
  kviLabel,
  isCreated: !!values?.productId,
});

export const validationSchema = () => Yup.object().shape({
  segments: Yup.array().of(Yup.string().trim()).required(),
  segments2: Yup.array().of(Yup.string().trim()),
  kviLabel: Yup.string().nullable(),
});

export const getModifiedValues = values => {
  const segments = values?.segments?.map(segment => (Number(segment)));
  const segments2 = values?.segments2?.map(segment => (Number(segment)));
  const kviLabel = values?.kviLabel;

  return {
    ...values,
    segments,
    segments2,
    kviLabel,
  };
};

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const modifiedInitialValues = getModifiedValues(initialValues);
  const modifiedValues = getModifiedValues(values);
  const { newValues: changedValues } = getDiffObj(modifiedInitialValues, modifiedValues);
  setNullToEmptyStringDeep(changedValues);
  return { ...changedValues, isCreated: initialValues?.isCreated };
};
