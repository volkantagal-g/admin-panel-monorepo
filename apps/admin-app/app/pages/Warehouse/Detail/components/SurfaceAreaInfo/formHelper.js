import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  basement: 0,
  entrance: 0,
  entranceStorage: 0,
  entresol: 0,
  frontPark: 0,
  total: 0,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      basement: Yup.number()
        .required(t("error:REQUIRED")),
      entrance: Yup.number()
        .required(t("error:REQUIRED")),
      entranceStorage: Yup.number()
        .required(t("error:REQUIRED")),
      entresol: Yup.number()
        .required(t("error:REQUIRED")),
      frontPark: Yup.number()
        .required(t("error:REQUIRED")),
      total: Yup.number()
        .required(t("error:REQUIRED")),
    });
};