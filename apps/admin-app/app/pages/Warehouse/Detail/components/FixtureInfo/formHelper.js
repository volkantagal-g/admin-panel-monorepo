import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  ovenCount: 0,
  manHourFeeGroup: 0,
  rentAmount: 0,
  stoppage: 0,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      ovenCount: Yup.number()
        .required(t("error:REQUIRED")),
    });
};
