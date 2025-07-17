import * as Yup from 'yup';
import _, { isEmpty, isNull } from 'lodash';

import { t } from '@shared/i18n';
import { GETIR_MARKET_DOMAIN_TYPES } from '@shared/shared/constants';

export const defaultValues = ({ domainType }) => ({
  domainType,
  city: undefined,
  clientId: undefined,
  warehouse: undefined,
  clientSearchType: 'name',
  sortOptions: { 'checkout.date': -1 },
  integrationTypes: [],
  excludedIntegrationTypes: [],
  isSlottedDelivery: null,
});

export const validationSchema = () => {
  return Yup.object()
    .shape({});
};

export const getDomainTypeSelectOptions = availableDomainTypes => {
  const selectableDomainTypes = GETIR_MARKET_DOMAIN_TYPES.map(domainTypeCode => {
    if (isEmpty(availableDomainTypes) || !availableDomainTypes?.includes(domainTypeCode)) return null;
    return {
      value: domainTypeCode,
      label: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainTypeCode}`),
    };
  });
  return selectableDomainTypes.filter(domainType => !isNull(domainType));
};

export const getSelectOptionsFromListData = (
  listData = [],
  { valueKey = '_id', labelKey = 'name' } = {
    valueKey: '_id',
    labelKey: 'name',
  },
) => {
  return listData.map(obj => {
    const value = _.get(obj, valueKey, 'ERR - Value Key Not Found');
    const label = _.get(obj, labelKey, value);
    return {
      value,
      label,
    };
  });
};
