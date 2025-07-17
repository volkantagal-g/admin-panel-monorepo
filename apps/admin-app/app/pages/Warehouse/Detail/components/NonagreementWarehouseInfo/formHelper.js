import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { nonagreementWarehouse: "" };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      nonagreementWarehouse: Yup.string()
        .min(2)
        .required(t("error:REQUIRED")),
    });
};
