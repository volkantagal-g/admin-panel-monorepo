import * as Yup from 'yup';

import { promoOpenAggressionStates } from '@shared/shared/constantValues';
import { getLangKey, t } from '@shared/i18n';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';
import {
  ACTIVE_PROMO_AGGRESSION_STATES,
  ALL_PROMO_DEVICE_TYPES,
  allDomainTypeValues,
  DeviceTypes,
  GETIR_LOCAL_DOMAIN_TYPE,
  PROMO_TARGET,
  promoDomainTypes,
  promoTargetToDomainMap,
} from '@app/pages/Promo/constantValues';
import { City, PROMO_AGGRESSION_STATE, Warehouse } from '@app/pages/Promo/types';

export const validationSchema = () => Yup.object().shape({
  domainTypes: Yup.array()
    .of(Yup.number().oneOf(allDomainTypeValues, t('promoPage:ERRORS.INVALID_DOMAIN_TYPE')))
    .min(1, t('baseYupError:MIXED.REQUIRED'))
    .required(t('baseYupError:MIXED.REQUIRED')),

  promoTarget: Yup.number()
    .oneOf(Object.values(PROMO_TARGET), t('promoPage:ERRORS.INVALID_PROMO_TARGET'))
    .required(t('baseYupError:MIXED.REQUIRED')),

  priority: Yup.number()
    .required(t('baseYupError:MIXED.REQUIRED')).max(Number.MAX_SAFE_INTEGER).min(Number.MIN_SAFE_INTEGER),

  validFrom: Yup.date()
    .required(t('baseYupError:MIXED.REQUIRED')),

  validUntil: Yup.date()
    .min(Yup.ref('validFrom'), t('baseYupError:DATE.MIN', { min: Yup.ref('validFrom') }))
    .required(t('baseYupError:MIXED.REQUIRED')),

  warehouses: Yup.array()
    .of(Yup.string()),

  cities: Yup.array()
    .of(Yup.string()),

  isAggressionStateNonAffected: Yup.boolean()
    .required(t('baseYupError:MIXED.REQUIRED')),

  openAggressionStates: Yup.mixed().when('isAggressionStateNonAffected', {
    is: true,
    then: Yup.array()
      .of(Yup.number().oneOf([PROMO_AGGRESSION_STATE.NEVER_CLOSE], t('promoPage:ERRORS.INVALID_AGGRESSION_STATE_FOR_NEVER_CLOSE')))
      .min(1, t('baseYupError:MIXED.REQUIRED')),
    otherwise: Yup.array()
      .of(Yup.number().oneOf(ACTIVE_PROMO_AGGRESSION_STATES, t('promoPage:ERRORS.INVALID_AGGRESSION_STATE_FOR_ACTIVE')))
      .min(1, t('baseYupError:MIXED.REQUIRED'))
      .required(t('baseYupError:MIXED.REQUIRED')),
  }),

  promoCode: Yup.string()
    .trim()
    .min(3, 'ERROR_CODE_MIN_PROMO_CODE')
    .max(1000, 'ERROR_CODE_MAX_PROMO_CODE')
    .required(t('baseYupError:MIXED.REQUIRED')),

  deviceTypes: Yup.array()
    .of(Yup.string().oneOf(ALL_PROMO_DEVICE_TYPES, t('promoPage:ERRORS.INVALID_DEVICE_TYPE')))
    .min(1, t('baseYupError:MIXED.REQUIRED'))
    .required(t('baseYupError:MIXED.REQUIRED')),
});

export const isLocalPromo = (domainTypes: Array<keyof typeof promoDomainTypes>) => {
  return domainTypes.some(domainType => domainType === GETIR_LOCAL_DOMAIN_TYPE);
};

export const getDomainTypeOptions = (promoTarget: keyof typeof promoTargetToDomainMap = 1) => {
  return convertConstantValuesToSelectOptions(promoTargetToDomainMap[promoTarget]);
};

export const DEVICE_TYPE_OPTIONS = Object.values(DeviceTypes).map(item => ({ value: item, label: item }));

export const getAggressionStateOptions = (isNeverCloseSelected: boolean) => {
  return Object.entries(promoOpenAggressionStates)
    .filter(([key]) => key !== PROMO_AGGRESSION_STATE.NEVER_CLOSE.toString() || isNeverCloseSelected).map(([key, value]) => {
      return {
        key,
        value: parseInt(key, 10),
        label: value[getLangKey()],
      };
    });
};

export const getCitiesOptions = (cities: City[] = []) => {
  return cities.map(city => {
    return {
      value: city?._id,
      label: city?.name?.[getLangKey()],
    };
  });
};

export const getWarehouseOptions = (warehouses: Warehouse[] = []) => {
  return warehouses.map(warehouse => {
    return {
      value: warehouse?._id,
      label: warehouse?.name,
    };
  });
};

export function getDefaultOpenAggressionStates(isAggressionStateNonAffected: boolean) {
  return isAggressionStateNonAffected ? [PROMO_AGGRESSION_STATE.NEVER_CLOSE] : ACTIVE_PROMO_AGGRESSION_STATES;
}

export const getSelectedCitiesWarehouses = (selectedCities: MongoIDType[], warehouses: Warehouse[]): MongoIDType[] => {
  if (selectedCities?.length) {
    return warehouses.filter(warehouse => selectedCities.includes(warehouse?.city?._id)).map(warehouse => warehouse._id) ?? [];
  }
  return [];
};
