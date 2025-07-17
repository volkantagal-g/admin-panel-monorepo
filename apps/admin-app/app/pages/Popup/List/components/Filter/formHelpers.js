import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { popupStatusTypeOptions } from '@app/pages/Popup/constantValues';
import { POPUP_STATUS_TYPE } from '@app/pages/Popup/constants';

export const initialValues = {
  status: {
    value: POPUP_STATUS_TYPE.ACTIVE,
    label: get(popupStatusTypeOptions[POPUP_STATUS_TYPE.ACTIVE], getLangKey(), ''),
  },
};

export const manipulateValuesAfterSubmit = values => {
  let tempValues = values;
  const startDate = tempValues?.dateRange?.[0];
  const endDate = tempValues?.dateRange?.[1];

  tempValues = {
    ...values,
    page: 0,
    start: startDate?.toISOString(),
    end: endDate?.toISOString(),
    domainType: values?.domainType,
    status: values?.status?.value,
  };

  delete tempValues?.dateRange;

  return ({ ...tempValues });
};

export const formRules = { status: [{ required: true, message: t('error:REQUIRED') }] };
