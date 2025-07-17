import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  distanceLimit: 0,
  durationLimit: 0,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      distanceLimit: Yup.number()
        .required(t("error:REQUIRED")),
      durationLimit: Yup.number()
        .required(t("error:REQUIRED")),
    });
};
