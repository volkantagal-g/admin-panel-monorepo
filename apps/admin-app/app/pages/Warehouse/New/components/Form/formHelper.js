import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { DEFAULT_MAP_COORDINATES, NONAGREEMENT_WAREHOUSE_TYPE, MAIN_WAREHOUSE_TYPE } from '@shared/shared/constants';

export const excludedCharactersRegex = /^[^\\[\]:*?/\\è]*$/;
export const excludedCharacters = '[]:*?/\\è';
export const defaultValues = {
  name: '',
  shortName: '',
  domainTypes: [],
  warehouseType: null,
  city: null,
  region: null,
  isTestWarehouse: false,
  location: {
    type: 'Point',
    coordinates: DEFAULT_MAP_COORDINATES,
  },
  address: '',
  mainStore: '',
  nonagreementWarehouse: '',
  SAPReferenceCode: '',
};

const mainStoreIsRequired = warehouseType => {
  return warehouseType !== JSON.stringify(MAIN_WAREHOUSE_TYPE) && warehouseType !== JSON.stringify(NONAGREEMENT_WAREHOUSE_TYPE);
};

export const validationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().trim().min(2)
      .max(64)
      .matches(excludedCharactersRegex, t('error:SPECIAL_CHARACTERS', { chars: excludedCharacters }))
      .required(t('error:REQUIRED')),
    shortName: Yup.string().trim().min(2).max(64)
      .matches(excludedCharactersRegex, t('error:SPECIAL_CHARACTERS', { chars: excludedCharacters }))
      .required(t('error:REQUIRED')),
    domainTypes: Yup.array()
      .required(t('error:REQUIRED')),
    warehouseType: Yup.string().trim().required(t('error:REQUIRED')),
    isTestWarehouse: Yup.boolean(),
    city: Yup.string().trim().min(2).required(t('error:REQUIRED')),
    region: Yup.string().trim().min(2).required(t('error:REQUIRED')),
    location: Yup.object().shape({
      type: Yup.string(),
      coordinates: Yup.array().of(Yup.number().required()),
    }),
    address: Yup.string().trim().min(2).required(t('error:REQUIRED')),
    mainStore: Yup.string()
      .trim()
      .when('warehouseType', (warehouseType, schema) => {
        if (mainStoreIsRequired(warehouseType)) {
          return schema.required(t('error:REQUIRED'));
        }
        return schema;
      }),
    mainWarehouses: Yup.array()
      .of(Yup.string().trim()),
    nonagreementWarehouse: Yup.string().trim(),
  });
};
