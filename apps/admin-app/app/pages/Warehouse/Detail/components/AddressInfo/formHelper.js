import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const defaultValues = {
  address: '',
  country: '',
  city: '',
  region: '',
  postCode: 0,
  location: {
    type: 'Point',
    coordinates: [],
  },
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      address: Yup.string()
        .trim()
        .min(2)
        .required(t('error:REQUIRED')),
      country: Yup.string()
        .trim()
        .min(2)
        .required(t('error:REQUIRED')),
      city: Yup.string()
        .trim()
        .min(2)
        .required(t('error:REQUIRED')),
      region: Yup.string()
        .trim()
        .min(2)
        .required(t('error:REQUIRED')),
      postCode: Yup.string()
        .trim()
        .min(2)
        .required(t('error:REQUIRED')),
      location: Yup.object().shape({
        type: Yup.string(),
        coordinates: Yup.array().of(
          Yup.number().required(),
        ),
      }),
    });
};
