import * as Yup from 'yup';
import _get from 'lodash/get';

import { t } from '@shared/i18n';
import { getTaxNumberValidatorForCountry } from '@shared/utils/common';
import { REGEX } from '@shared/shared/regex';

export const defaultValues = {
  name: '',
  shortName: '',
  title: '',
  phone: '',
  fax: '',
  zipCode: '',
  address: '',
  city: '',
  district: '',
  cityPlate: null,
  vn: '',
  vd: '',
  types: [],
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .min(2)
        .max(64)
        .required(),
      shortName: Yup.string().trim(),
      title: Yup.string()
        .trim()
        .required(),
      phone: Yup.string()
        .trim()
        .matches(REGEX.PHONE, { excludeEmptyString: true, message: t('error:VALID_PHONE') }),
      fax: Yup.string()
        .trim()
        .matches(REGEX.PHONE, { excludeEmptyString: true, message: t('error:VALID_FAX') }),
      zipCode: Yup.string().required(),
      address: Yup.string()
        .trim()
        .min(2)
        .max(200)
        .required(),
      vn: Yup.string()
        .trim()
        .matches(getTaxNumberValidatorForCountry(), t('error:VALID_TAX_NUMBER'))
        .required(),
      city: Yup.string()
        .trim()
        .required(),
      district: Yup.string()
        .trim()
        .required(),
      vd: Yup.string()
        .trim()
        .min(2)
        .max(64)
        .required(),
      types: Yup.array().min(1).required(),
    });
};

export const getInitialValues = supplier => {
  if (!_get(supplier, '_id')) return defaultValues;
  const initialValues = {
    name: _get(supplier, 'name'),
    shortName: _get(supplier, 'shortName'),
    title: _get(supplier, 'title'),
    phone: _get(supplier, 'phone'),
    fax: _get(supplier, 'fax'),
    zipCode: _get(supplier, 'zipCode'),
    address: _get(supplier, 'address'),
    city: _get(supplier, 'city'),
    district: _get(supplier, 'district'),
    cityPlate: _get(supplier, 'cityPlate'),
    vn: _get(supplier, 'vn'),
    vd: _get(supplier, 'vd'),
    types: _get(supplier, 'types'),
  };
  return initialValues;
};
