import * as Yup from 'yup';
import { toString, get } from 'lodash';

import { productDisplayTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const validationSchema = (values, { isProductActive }) => {
  return (Yup.object()
    .shape({
      displayType: Yup.number().when('a', (a, schema) => {
        if (isProductActive) {
          return schema.required();
        }
        return schema;
      }),
    })
  );
};

export const getDisplayTypeOptions = () => {
  return Object.entries(productDisplayTypes).map(([key, value]) => {
    return {
      value: toString(key),
      label: get(value, [getLangKey()]),
    };
  });
};

const getModifiedInitialValues = values => {
  const newValues = {
    ...values,
    displayType: toString(values.displayType),
  };
  return newValues;
};

const getModifiedValues = values => {
  const newValues = { ...values, displayType: Number(values.displayType) };
  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const _initialValues = getModifiedValues(initialValues);
  const _values = getModifiedValues(values);
  const { newValues: changedValues } = getDiffObj(_initialValues, _values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = marketProduct => {
  const initialValues = { displayType: get(marketProduct, 'displayType', null) };
  return getModifiedInitialValues(initialValues);
};
