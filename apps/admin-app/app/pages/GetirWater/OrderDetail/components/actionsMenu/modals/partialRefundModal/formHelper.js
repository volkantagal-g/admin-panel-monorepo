import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { refundOptions } from '../shopRefundModal/refundOptions';

export const validationSchema = () => {
  return Yup.object().shape({ refundCount: Yup.array().of(Yup.object().shape({ count: Yup.number().required() })) });
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const getRefundProductCountOptions = maxAmount => Array.from(Array(maxAmount).keys()).map(item => ({
  label: item + 1,
  value: item + 1,
}));

export const getPartialRefundOptions = () => Object.keys(refundOptions).map(item => ({
  label: t(`waterOrderDetailModal:REFUND_OPTIONS.${item}`),
  value: refundOptions[item],
}));

export const getInitialValues = () => {
  const initialValues = {
    selectedRefundReasonId: null,
    productReturnItemList: [],
  };
  return manipulateValuesBeforeSubmit(initialValues);
};
