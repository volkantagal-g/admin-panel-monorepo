import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { getTaxNumberValidatorForCountry } from '@shared/utils/common';
import { REGEX } from '@shared/shared/regex';

export const defaultValues = {
  name: '',
  title: '',
  phone: '',
  fax: '',
  zipCode: '',
  city: '',
  district: '',
  address: '',
  vn: '',
  vd: '',
  types: [],
  isFactory: false,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .min(2)
        .max(64)
        .required(),
      title: Yup.string()
        .trim()
        .required(),
      phone: Yup.string()
        .trim()
        .matches(REGEX.PHONE, t('error:VALID_PHONE'))
        .required(),
      fax: Yup.string()
        .trim()
        .matches(REGEX.PHONE, t('error:VALID_FAX'))
        .required(),
      zipCode: Yup.string().required(),
      city: Yup.string()
        .trim()
        .required(),
      district: Yup.string()
        .trim()
        .required(),
      address: Yup.string()
        .trim()
        .min(2)
        .max(64)
        .required(),
      vn: Yup.string()
        .trim()
        .matches(getTaxNumberValidatorForCountry(), t('error:VALID_TAX_NUMBER'))
        .required(),
      vd: Yup.string()
        .trim()
        .min(2)
        .max(64)
        .required(),
      types: Yup.array().min(1).required(),
      isFactory: Yup.boolean(),
    });
};
