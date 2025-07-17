import _ from 'lodash';

import { VAT_VALUES } from '../shared/constants';
import { getLangKey, t } from '@shared/i18n';
import { getDiffObj, getFilteredOperationalAndOldOperationalCountries } from '@shared/utils/common';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';

export const canSubmit = ({ initialValues, values }) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  return !_.isEmpty(changedValues);
};

export const getVatOptions = () => {
  return Object.values(VAT_VALUES).map(vat => {
    return {
      value: vat,
      label: vat,
    };
  });
};

export const getCountryOptions = (countries, { showOldCountries }) => {
  const generateOptions = (countriesData, disabled) => countriesData.map(country => ({
    value: _.get(country, '_id'),
    label: _.get(country, `name.${getLangKey()}`),
    disabled,
  }));

  if (!showOldCountries) {
    return generateOptions(countries);
  }
  const { operationalCountries, oldOperationalCountries } = getFilteredOperationalAndOldOperationalCountries(countries);

  const options = generateOptions(operationalCountries);
  if (oldOperationalCountries?.length) {
    options.push({
      label: t('OLD_COUNTRIES'),
      options: generateOptions(oldOperationalCountries, true),
    });
  }
  return options;
};

export const getCityOptions = cities => {
  return cities.map(city => {
    return {
      value: _.get(city, '_id'),
      label: _.get(city, `name.${getLangKey()}`),
    };
  });
};

export const getRoleOptions = roles => {
  const sortByRoles = _.sortBy(roles, ['name']);
  return sortByRoles.map(role => {
    return {
      value: _.get(role, '_id'),
      label: _.get(role, 'name'),
    };
  });
};

export const getMarketProductOptions = (marketProducts = [], showObjectIdOnLabel = false) => {
  return marketProducts.map(marketProduct => {
    const productName = _.get(marketProduct, ['fullName', getLangKey()], '') || _.get(marketProduct, ['name', getLangKey()], '');
    const label = showObjectIdOnLabel ? `${productName} | ${_.get(marketProduct, '_id', '')}` : productName;
    return {
      value: marketProduct._id,
      label,
    };
  });
};

export const getMarketProductCategoryOptions = (marketProductCategories = []) => {
  return marketProductCategories.map(category => {
    return {
      value: _.get(category, '_id', ''),
      label: _.get(category, ['name', getLangKey()], ''),
    };
  });
};

export const getWarehouseOptions = (warehouses = [], showObjectIdOnLabel = false) => {
  return warehouses.map(warehouse => {
    const warehouseName = _.get(warehouse, 'name', '');
    const label = showObjectIdOnLabel ? `${warehouseName} | ${_.get(warehouse, '_id', '')}` : warehouseName;
    return {
      value: _.get(warehouse, '_id', ''),
      label,
    };
  });
};

export const getDomainTypeOptions = customDomainTypes => {
  return Object.entries(customDomainTypes || getirMarketDomainTypes).map(([key, value]) => {
    return {
      value: _.toString(key),
      label: value[getLangKey()],
    };
  });
};

export const convertEmptyStringToUndefined = val => {
  let _val = val;
  if (_.isString(val) && val.length === 0) {
    _val = undefined;
  }
  return _val;
};
