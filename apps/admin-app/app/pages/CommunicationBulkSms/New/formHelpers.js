import { t } from '@shared/i18n';
import { getUser } from '@shared/redux/selectors/auth';

export const rules = {
  requiredArray: [{ required: true, message: t('error:REQUIRED'), type: 'array' }],
  onlyRequired: [{ required: true, message: t('error:REQUIRED') }],
};

export const manipulateValuesBeforeSubmit = values => {
  const tempValues = { ...values };
  tempValues.clientId = getUser()?._id;
  return tempValues;
};
