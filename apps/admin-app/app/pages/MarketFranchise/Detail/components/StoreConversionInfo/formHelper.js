import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { supplier: '', companyId: '' };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      supplier: Yup.string()
        .required(t("error:REQUIRED")),
      companyId: Yup.string(),
    });
};
