import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { MARKET_PRODUCT_TYPE } from '@shared/shared/constants';

export const validationSchema = values => {
  const isProductWeight = Number(values.type) === MARKET_PRODUCT_TYPE.WEIGHT;
  return (Yup.object()
    .shape({
      type: Yup.number().required(),
      subType: isProductWeight && Yup.number().required(),
      unit: Yup.number().required(),
    })
  );
};

const getModifiedInitialValues = values => {
  const newValues = { ...values };
  return newValues;
};

export const getModifiedValues = values => {
  const newValues = {
    ...values,
    subType: Number(values.subType),
  };

  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values, masterCategoriesOldMap }) => {
  const _initialValues = getModifiedValues(initialValues, masterCategoriesOldMap);
  const _values = getModifiedValues(values, masterCategoriesOldMap);
  const { newValues: changedValues } = getDiffObj(_initialValues, _values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = marketProduct => {
  const initialValues = {
    type: marketProduct?.type,
    subType: marketProduct?.subType,
    unit: marketProduct?.unit,
  };
  return getModifiedInitialValues(initialValues);
};
