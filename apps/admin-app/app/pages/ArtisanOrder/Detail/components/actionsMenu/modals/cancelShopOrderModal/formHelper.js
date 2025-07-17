import * as Yup from 'yup';

import { getLangKey } from '@shared/i18n';
import { getUser } from '@shared/redux/selectors/auth';
import { CALLER_TYPES } from '@shared/shared/constants';

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      domainSelectedType: Yup.number(),
      cancelNote: Yup.string(),
      isPrepared: Yup.boolean().nullable(),
      cancelReasonId: Yup.string(),
    })
  );
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const manipulateValuesAfterSubmit = values => {
  const user = getUser();

  return {
    ...values,
    cancelReasonId: values.cancelReasonId,
    cancelNote: values.cancelNote,
    isFoodOrderReady: values.isPrepared,
    callerType: CALLER_TYPES.ADMIN,
    callerId: user._id,
  };
};

export const manipulateCancelOptions = values => {
  const optionData = values.map(item => {
    return {
      label: item.messages[getLangKey()],
      value: item._id,
    };
  });
  return optionData;
};

export const getInitialValues = () => {
  const initialValues = {
    cancelReasonId: null,
    cancelNote: '',
    isPrepared: false,
    domainSelectedType: null,
  };
  return manipulateValuesBeforeSubmit(initialValues);
};

export const selectProductsFromOrder = orderDetail => orderDetail?.products?.map(x => ({
  label: x.name?.[getLangKey()],
  value: x.product,
}));
