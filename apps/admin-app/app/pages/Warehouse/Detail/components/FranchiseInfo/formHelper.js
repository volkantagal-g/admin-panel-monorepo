import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { franchise: "" };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      franchise: Yup.string()
        .min(2)
        .required(t("error:REQUIRED")),
    });
};
