import {
  map as _map,
  toNumber as _toNumber,
  forEach as _forEach,
  isEmpty as _isEmpty,
  trim as _trim,
  get as _get,
  join as _join,
} from 'lodash';

import { getLangKey } from '@shared/i18n';
import {
  promoClasses,
  promoFinancedBy,
  promoObjectiveTypes,
  promoTargetToDomainMap,
  promoTargets,
  departmentPromotionsObjectiveTypes,
  promotionsObjectiveTypes,
  PROMO_CLASS,
} from '@app/pages/Promo/constantValues';

export const getPromoTargetsOptions = () => {
  return _map(promoTargets, (value, key) => ({
    value: _toNumber(key),
    label: value[getLangKey()],
  }));
};

export const getGetirMarketDomainTypesOptions = promoTarget => {
  return _map(promoTargetToDomainMap[promoTarget], (value, key) => ({
    value: _toNumber(key),
    label: value[getLangKey()],
  }));
};

export const getPromoFinancedByOptions = () => {
  return _map(promoFinancedBy, (value, key) => ({
    value: _toNumber(key),
    label: value[getLangKey()],
  }));
};

export const getPromoClassesOptions = () => {
  return _map(promoClasses, (value, key) => ({
    value: _toNumber(key),
    label: value[getLangKey()],
  }));
};

export const getPromoObjectiveTypesOptions = promoClass => {
  if (promoClass === PROMO_CLASS.PROMOTIONS) {
    return _map(promotionsObjectiveTypes, key => ({
      value: _toNumber(key),
      label: promoObjectiveTypes[key][getLangKey()],
    }));
  }
  if (promoClass === PROMO_CLASS.DEPARTMENT_PROMOTIONS) {
    return _map(departmentPromotionsObjectiveTypes, key => ({
      value: _toNumber(key),
      label: promoObjectiveTypes[key][getLangKey()],
    }));
  }
  return [];
};

export const checkRequiredFields = (sourceObject, requiredFields) => {
  const errFields = [];
  _forEach(requiredFields, key => {
    if (_isEmpty(_trim(_get(sourceObject, key)))) {
      errFields.push(key);
    }
  });
  if (_isEmpty(errFields)) {
    return null;
  }
  throw _join(errFields, ', ');
};

export const getEmptyLanguageStrings = languageList => {
  const returnObj = {};
  _forEach(languageList, key => {
    returnObj[key] = '';
  });
  return returnObj;
};

export const getPromoTitles = (languageList, currencySymbol, amount) => {
  const titles = {
    tr: `${currencySymbol}${amount} değerinde indirim çeki. Kalan tutar: ${currencySymbol}${amount}`,
    en: `${currencySymbol}${amount} Gift Card. Remaining balance: ${currencySymbol}${amount}`,
    fr: `${currencySymbol}${amount} Carte cadeau. Solde restant: ${currencySymbol}${amount}`,
    de: `${currencySymbol}${amount} Geschenkkarte. Restbetrag: ${currencySymbol}${amount}`,
    nl: `${currencySymbol}${amount} Cadeaukaart. Resterende saldo: ${currencySymbol}${amount}`,
    it: `${currencySymbol}${amount} Carta regalo. Equilibrio restante: ${currencySymbol}${amount}`,
    es: `${currencySymbol}${amount} Tarjeta de regalo. Balance restante: ${currencySymbol}${amount}`,
    pt: `${currencySymbol}${amount} Cartão Presente. Saldo remanescente: ${currencySymbol}${amount}`,
    enUS: `${currencySymbol}${amount} Gift Card. Remaining balance: ${currencySymbol}${amount}`,
  };
  const returnObj = {};
  _forEach(languageList, key => {
    returnObj[key] = titles[key];
  });
  return returnObj;
};

export const showLang = lng => {
  return lng === 'enUS' ? 'en-US' : lng;
};
