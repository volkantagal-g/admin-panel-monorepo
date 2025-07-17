import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = { transferGroup: "" };

export const validationSchema = () => {
  return Yup.object()
    .shape({
      transferGroup: Yup.string()
        .min(2)
        .required(t("error:REQUIRED")),
    });
};
