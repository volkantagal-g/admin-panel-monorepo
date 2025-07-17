import * as Yup from 'yup';
import moment from 'moment';
import get from 'lodash/get';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getLocalDateTimeFormat } from '@shared/utils/localization';

export function validationSchema() {
  return Yup.object().shape({
    status: Yup.number().required(),
    description: YupMultiLanguage.string({ isRequired: true }),
    interval: Yup.number().min(0).required(),
    intervalType: Yup.number().required(),
    clientList: Yup.string().required(),
  });
}

export function manipulateValuesBeforeSubmit(values) {
  const newValues = { ...values };
  return newValues;
}

export function getInitialValues(autoSegmentTemplate) {
  const initialValues = {
    ...autoSegmentTemplate,
    lastCalculationDate: moment(get(autoSegmentTemplate, 'lastCalculationDate', '')).format(getLocalDateTimeFormat()),
    createdAt: moment(get(autoSegmentTemplate, 'createdAt', '')).format(getLocalDateTimeFormat()),
  };
  return manipulateValuesBeforeSubmit(initialValues);
}
