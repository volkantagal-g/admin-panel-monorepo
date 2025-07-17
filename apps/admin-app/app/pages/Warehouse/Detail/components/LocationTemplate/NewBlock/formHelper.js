import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  template: "",
  blockOpts: { selfCode: "" },
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      template: Yup.string()
        .trim()
        .min(2)
        .required(t("error:REQUIRED")),
      blockOpts: Yup.object().shape({
        selfCode: Yup.string()
          .trim()
          .min(2)
          .required(t("error:REQUIRED")),
      }),
    });
};
