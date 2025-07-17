import * as Yup from 'yup';

import { getLangKey, t } from '@shared/i18n';
import { getUser } from '@shared/redux/selectors/auth';
import { COMMON_CANCEL_REASON_IDS, ORDER_CANCEL_SOURCES } from './constants';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

export const validationSchema = () => {
  return Yup.object().shape({
    domainSelectedType: Yup.number(),
    cancelNote: Yup.string().trim().required(t('marketOrderPage:ERRORS.CANCEL_REASON')),
    cancelReasonId: Yup.string().required(t('marketOrderPage:ERRORS.CANCEL_NOTE')),
    cancelReasonName: Yup.string(),
    cancelSource: Yup.number().nullable().when('domainSelectedType', {
      is: val => val !== GETIR_DOMAIN_TYPES.VOYAGER,
      then: schema => schema
        .oneOf(
          [ORDER_CANCEL_SOURCES.GETIR, ORDER_CANCEL_SOURCES.CUSTOMER],
          t('marketOrderPage:ERRORS.CANCEL_SOURCE_ONE_OF'),
        )
        .required(t('marketOrderPage:ERRORS.CANCEL_SOURCE_REQUIRED')),
      otherwise: schema => schema.notRequired(),
    }),
  });
};

export const manipulateValuesBeforeSubmit = values => {
  const newValues = { ...values };
  return newValues;
};

export const manipulateValuesAfterSubmit = values => {
  const newValues = { ...values };
  const user = getUser();
  return {
    reasonId: values.cancelReasonId,
    note: newValues.cancelNote,
    callerId: user._id,
    reasonName: newValues.cancelReasonName,
    domainType: `${newValues.domainSelectedType}`,
    source: newValues.cancelSource,
  };
};

export const selectedCancelOptionObject = (cancelOptions, reasonId) => {
  return cancelOptions.find(option => option.id === reasonId);
};

export const removeHiddenCancelReasons = values => {
  return values.filter(item => !item.isHiddenInAdminPanel);
};

const filterBySource = (values, source) => {
  if (source === undefined || source === null) return [];
  return values.filter(item => item.source === source || COMMON_CANCEL_REASON_IDS.includes(item._id));
};

export const manipulateCancelOptions = (values, source) => {
  const visibleValues = removeHiddenCancelReasons(values);

  if (!source) {
    const cancelOptions = visibleValues?.map(({ title, _id }) => {
      return {
        label: title[getLangKey()],
        value: _id,
      };
    });

    return cancelOptions;
  }

  const sourceFilteredValues = filterBySource(visibleValues, source);

  const cancelOptions = sourceFilteredValues?.map(({ title, _id }) => {
    return {
      label: title[getLangKey()],
      value: _id,
    };
  });

  return cancelOptions;
};

export const getInitialValues = ({
  cancelReasonId = null,
  cancelNote = '',
  cancelSource = null,
}) => ({
  cancelReasonName: null,
  cancelReasonId,
  cancelNote,
  domainSelectedType: null,
  cancelSource,
});
