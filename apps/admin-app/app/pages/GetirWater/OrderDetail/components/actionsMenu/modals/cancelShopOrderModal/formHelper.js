import * as Yup from 'yup';
import _ from 'lodash';

import { t } from '@shared/i18n';
import { waterOrderCancelReasonSource } from '@shared/shared/constantValues';

import { cancelOptionsBySource } from './cancelOptions';

export const validationSchema = () => {
  return Yup.object().shape({
    cancelReasonSource: Yup.number().required(t('error:REQUIRED')),
    cancelNote: Yup.string().required(t('error:REQUIRED')),
    cancelReason: Yup.number().required(t('error:REQUIRED')),
  });
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const getCancelOptions = values => cancelOptionsBySource
  .filter(option => _.get(values, 'cancelReasonSource') === option.source)
  .map(item => {
    return {
      label: t(`waterOrderDetailModal:CANCEL_OPTIONS.${item.name}`),
      value: item.value,
    };
  });

export const getInitialValues = () => {
  const initialValues = {
    cancelReason: null,
    cancelReasonSource: waterOrderCancelReasonSource.GETIR,
    cancelNote: '',
  };
  return manipulateValuesBeforeSubmit(initialValues);
};
