import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { domainTypes: [] };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      domainTypes: Yup.array()
        .required(t("error:REQUIRED")),
    });
};
