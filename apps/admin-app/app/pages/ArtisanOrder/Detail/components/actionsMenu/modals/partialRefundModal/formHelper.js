import * as Yup from 'yup';

import { getLangKey } from '@shared/i18n';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      refundCount: Yup.array().of(
        Yup.object().shape({ count: Yup.number().required() }),
      ),
    })
  );
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const manipulateRefundOptions = values => {
  const refundOptionData = values && values.map(item => {
    return {
      label: item.messages[getLangKey()],
      value: item._id,
    };
  });
  return refundOptionData;
};

export const getInitialValues = () => {
  const initialValues = {
    selectedRefundReasonId: null,
    refundCount: [],
  };
  return manipulateValuesBeforeSubmit(initialValues);
};
