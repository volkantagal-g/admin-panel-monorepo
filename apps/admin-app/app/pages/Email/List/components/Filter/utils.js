import { EMAIL_STATUS } from '@app/pages/Email/constants';

export const initialValues = { status: EMAIL_STATUS.ACTIVE };

export const manipulateValuesAfterSubmit = values => {
  let tempValues = values;
  const startDate = tempValues?.dateRange?.[0];
  const endDate = tempValues?.dateRange?.[1];

  tempValues = {
    ...values,
    page: 0,
    size: 10,
    startDate: startDate?.toISOString(),
    dueDate: endDate?.toISOString(),
    domainType: values?.domainType,
    status: values?.status,
  };
  delete tempValues.dateRange;

  return ({ ...tempValues });
};
