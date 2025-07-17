import * as Yup from 'yup';

import { promoMechanics } from '@app/pages/Promo/constantValues';
import { getLangKey } from '@shared/i18n';
import { IFilters } from '../../interfaces';

const statusTypes = {
  1: { en: 'Inactive', tr: 'İnaktif' },
  2: { en: 'Active', tr: 'Aktif' },
};

export const validationSchema = () => {
  const validation = {
    domainTypes: Yup.array().min(1).required(),
    status: Yup.object().required(),
    promoMechanic: Yup.object().required(),
  };
  return Yup.object().shape(validation);
};

export const getInitialValues = (): IFilters => {
  return {
    domainTypes: [],
    responsibleDepartment: null,
    isFreeProduct: false,
    status: null,
    promoMechanic: null,
  };
};

export const getPromoMechanicOptions = () => {
  return Object.entries(promoMechanics).map(([key, value]) => {
    return {
      value: +key,
      label: value[getLangKey()],
    };
  });
};

export const getStatusTypesOptions = () => {
  return Object.entries(statusTypes).map(([key, value]) => {
    return {
      value: key.toString(),
      label: value[getLangKey()],
    };
  });
};

export const getValuesBeforeSearch = (values: IFilters) => {
  const { domainTypes, isFreeProduct, promoMechanic, responsibleDepartment, status } = values;
  return {
    domainTypes: (domainTypes && domainTypes?.length) ? domainTypes!.map(domainType => +(domainType as any).value as number) : null,
    promoMechanic: promoMechanic && (promoMechanic as any).value,
    responsibleDepartment: responsibleDepartment && (responsibleDepartment as any).value,
    status: status && +(status as any).value,
    isFreeProduct,
  };
};
