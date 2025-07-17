import { SMS_STATUS } from '@app/pages/Sms/constants';

export const initialValues = { status: SMS_STATUS.ACTIVE };

export const manipulateValuesAfterSubmit = values => {
  let tempValues = values;
  const startDate = tempValues?.dateRange?.[0];
  const endDate = tempValues?.dateRange?.[1];

  tempValues = {
    ...values,
    page: 0,
    startDate: startDate?.toISOString(),
    endDate: endDate?.toISOString(),
    domainType: values?.domainType,
    status: values?.status,
  };
  delete tempValues.dateRange;

  return ({ ...tempValues });
};
