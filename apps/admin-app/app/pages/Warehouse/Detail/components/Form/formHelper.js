import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  name: "",
  shortName: "",
  fieldManager: null,
  warehouseGLN: null,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .min(2)
        .max(64)
        .required(t("error:REQUIRED")),
      shortName: Yup.string()
        .trim()
        .min(2)
        .max(64)
        .required(t("error:REQUIRED")),
      fieldManager: Yup.string()
        .trim()
        .required(t("error:REQUIRED")),
      warehouseGLN: Yup.number(),
    });
};
