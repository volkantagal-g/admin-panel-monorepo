import * as Yup from 'yup';
import { get, isFinite } from 'lodash';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const validationSchema = (values, { t, initialWeight } = {}) => {
  return (Yup.object()
    .shape({
      upperLimit: Yup.number().moreThan(-1).nullable(true)
        .test(
          'initialWeightControl',
          t('SALE_RESTRICTION.MAX_ORDER_WEIGHT_MUST_BE_MORE_OR_EQUAL_STARTING_WEIGHT'),
          upperLimit => {
            if (isFinite(initialWeight)) {
              return initialWeight <= upperLimit;
            }
            return true;
          },
        ),
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
  const initialValues = { upperLimit: get(marketProduct, 'upperLimit', null) };
  return getModifiedInitialValues(initialValues);
};
