import * as Yup from 'yup';
import { get } from 'lodash';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const validationSchema = values => {
  return (Yup.object()
    .shape({
      isAgeRestricted: Yup.boolean(),
      ageRestriction: get(values, 'isAgeRestricted') && Yup.number()
        .min(0)
        .required(),
    })
  );
};

const getModifiedInitialValues = values => {
  const newValues = { ...values };
  return newValues;
};

const getModifiedValues = values => {
  const newValues = { ...values };
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
  const initialValues = {
    isAgeRestricted: get(marketProduct, 'isAgeRestricted', false),
    ageRestriction: get(marketProduct, 'ageRestriction', null),
  };
  return getModifiedInitialValues(initialValues);
};
