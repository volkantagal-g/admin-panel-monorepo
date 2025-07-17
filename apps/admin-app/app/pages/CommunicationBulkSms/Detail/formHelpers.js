import moment from 'moment';

import { t } from '@shared/i18n';
import { getUser } from '@shared/redux/selectors/auth';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
  checkDeliveryTime: [() => ({
    required: true,
    validator(_, deliveryTime) {
      const deliveryTimeMoment = moment.utc(deliveryTime);
      const currentTime = moment();
      const isPast = deliveryTimeMoment.isBefore(currentTime);
      if (isPast) {
        return Promise.reject(new Error(t('communicationBulkSmsPage:IS_PAST')));
      }
      if (!deliveryTime) {
        return Promise.reject(new Error(t('error:REQUIRED')));
      }
      return Promise.resolve();
    },
  })],
};

export const manipulateValuesBeforeSubmit = values => {
  const tempValues = { ...values };
  tempValues.clientId = getUser()?._id;
  return tempValues;
};

export const getInitialValues = values => {
  const tempValues = { ...values };
  tempValues.senderOrganizationId = values?.senderOrganization?.id;
  return tempValues;
};
