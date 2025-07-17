import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { COUNTRIES_GLOBAL_ACCESS, DOMAIN_TYPE_ALL_DOMAINS } from '../../../components/Selector';
import { createMap } from '@shared/utils/common';

export const validationSchema = () => {
  return Yup.object()
    .shape({
      description: Yup.string().min(20).required(t('error:REQUIRED')),
      countries: Yup.array().of(Yup.string()).when('hasGlobalAccess', {
        is: false,
        then: Yup.array().of(Yup.string()).required(),
      }),
      hasGlobalAccess: Yup.boolean().required(),
      type: Yup.number().required(t('error:REQUIRED')),
      domainTypes: Yup.array().of(Yup.number()).when('hasAllDomainTypes', {
        is: false,
        then: Yup.array().of(Yup.number()).required(),
      }),
      hasAllDomainTypes: Yup.boolean().required(),
      expireAt: Yup.string().required(t('error:REQUIRED')),
    });
};

export const getInitialValues = (countries, segment = {}) => {
  const countryMap = createMap(countries, { field: 'code.alpha2' });
  return {
    description: segment?.description || '',
    countries: segment?.countryCodes?.filter(c => c !== COUNTRIES_GLOBAL_ACCESS).map(c => countryMap[c]._id),
    hasGlobalAccess: segment?.countryCodes?.includes(COUNTRIES_GLOBAL_ACCESS) || false,
    type: segment?.type || '',
    domainTypes: segment?.domainTypes?.filter(d => d !== DOMAIN_TYPE_ALL_DOMAINS),
    hasAllDomainTypes: segment?.domainTypes?.includes(DOMAIN_TYPE_ALL_DOMAINS) || false,
    expireAt: segment?.expireAt || '',
  };
};
