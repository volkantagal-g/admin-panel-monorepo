import * as Yup from 'yup';

import { t } from '@shared/i18n';

import { refundOptions } from './refundOptions';

export const validationSchema = () => {
  return Yup.object().shape({});
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const getRefundOptions = () => Object.keys(refundOptions).map(item => ({
  label: t(`waterOrderDetailModal:REFUND_OPTIONS.${item}`),
  value: refundOptions[item],
}));

export const getInitialValues = () => {
  const initialValues = { returnReason: null };
  return manipulateValuesBeforeSubmit(initialValues);
};
