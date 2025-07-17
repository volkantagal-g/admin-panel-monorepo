import { Tag, Select, Tooltip, Row, Button } from 'antd';
import { get, toString, groupBy } from 'lodash';

import { getLangKey } from '@shared/i18n';
import {
  MARKET_PRODUCT_CATEGORY_STATUS,
  PRODUCT_MASTER_CATEGORY_LEVEL,
  MARKET_PRODUCT_TYPE,
} from '@shared/shared/constants';
import {
  productMasterCategoryLevels,
  marketProductWeightSubTypes,
  marketProductTypes,
} from '@shared/shared/constantValues';
import { isObjectIdValid, normalizeNumber, currency, getErrorMessage } from '@shared/utils/common';
import { getirMarketDomainTypes, typeBasedProductUnits, weightTypeProductUnits } from '@app/pages/MarketProduct/constantValues';
import { COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST, PRODUCT_ACTIVATION_BE_KEY_TO_CONTAINER_MAP, CATEGORY_ROLES } from '@app/pages/MarketProduct/constants';

const { Option, OptGroup } = Select;

const ONE_KG_IN_GRAM = 1000;
const START_WEIGHT_IN_GRAM = 50;
const END_WEIGHT_IN_GRAM = 10000;

const langKey = getLangKey();

export const getParentNameOfMasterCategory = (masterCategory, isCategoryNameIncluded = false) => {
  let parentName = '';
  if (!masterCategory) return parentName;
  if (masterCategory.level === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY) {
    parentName = '';
  }
  else if (masterCategory.level === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CATEGORY) {
    parentName = get(masterCategory, ['parent', 'name', langKey], '');
  }
  else if (masterCategory.level === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_CLASS) {
    const masterMainCategoryName = get(masterCategory, ['parent', 'parent', 'name', langKey], '');
    const masterCategoryName = get(masterCategory, ['parent', 'name', langKey], '');
    parentName = `${masterMainCategoryName} / ${masterCategoryName}`;
  }
  else if (masterCategory.level === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_SUB_CLASS) {
    const masterMainCategoryName = get(masterCategory, ['parent', 'parent', 'parent', 'name', langKey], '');
    const masterCategoryName = get(masterCategory, ['parent', 'parent', 'name', langKey], '');
    const masterClassName = get(masterCategory, ['parent', 'name', langKey], '');
    parentName = `${masterMainCategoryName} / ${masterCategoryName} / ${masterClassName}`;
  }

  if (isCategoryNameIncluded) {
    const categoryName = get(masterCategory, ['name', langKey], '');
    if (masterCategory.level === PRODUCT_MASTER_CATEGORY_LEVEL.MASTER_MAIN_CATEGORY) {
      parentName = categoryName;
    }
    else {
      parentName = `${parentName} / ${categoryName}`;
    }
  }

  return parentName;
};

export const getMasterCategoryLevelOptions = () => {
  return Object.entries(productMasterCategoryLevels).map(([key, value]) => {
    return {
      value: toString(key),
      label: value[getLangKey()],
    };
  });
};

export const getMasterCategoryOptions = marketProductMasterCategories => {
  return marketProductMasterCategories.map(category => {
    const parentName = getParentNameOfMasterCategory(category, true);
    return {
      value: category._id,
      label: parentName,
    };
  });
};

export const getCategoryRoleOptions = () => {
  return Object.keys(CATEGORY_ROLES).map(key => {
    return {
      value: CATEGORY_ROLES[key],
      label: CATEGORY_ROLES[key],
    };
  });
};

export const getBadgeOptions = badges => {
  return (badges || []).map(badge => {
    return {
      value: badge?._id || '',
      label: badge?.name || '',
    };
  });
};

export const getSubstituteCategoryOptions = ({ parentCategories, classes, t }) => {
  return parentCategories?.map(item => {
    const value = get(item, '_id', '');
    const label = get(item, ['name', getLangKey()], '');
    const isCategoryActive = item.status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE;
    const optionClass = isCategoryActive ? classes.activeCategory : classes.inactiveCategory;
    const tooltipTitle = isCategoryActive ? t('ACTIVE_CATEGORY') : t('INACTIVE_CATEGORY');
    return (
      <Option key={value} value={value} label={label} className={optionClass}>
        <Tooltip title={tooltipTitle}>
          {label}
        </Tooltip>
      </Option>
    );
  });
};

export const getColoredCategoryOptions = ({ categories, classes, t }) => {
  return categories?.map(item => {
    const value = item?._id;
    const label = item?.name?.[getLangKey()];
    const isCategoryActive = item.status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE;
    const optionClass = isCategoryActive ? classes.activeCategory : classes.inactiveCategory;
    const tooltipTitle = isCategoryActive ? t('global:ACTIVE_CATEGORY') : t('global:INACTIVE_CATEGORY');
    return (
      <Option key={value} value={value} label={label} className={optionClass}>
        <Tooltip title={tooltipTitle}>
          {label}
        </Tooltip>
      </Option>
    );
  });
};

export const getColoredSubCategoryOptionGroups = ({ marketProductCategories, selectedCategoryIds, marketProductSubCategories, classes, t }) => {
  return (
    marketProductCategories
      ?.filter(category => selectedCategoryIds?.includes(category?._id))
      .map(category => {
        const categoryId = category?._id;
        const categoryName = category?.name?.[getLangKey()];
        const filteredSubCategories = marketProductSubCategories?.filter(subCategory => ((subCategory?.parent?._id || subCategory?.parent) === categoryId));
        if (filteredSubCategories.length) {
          return (
            <OptGroup label={categoryName} key={categoryId}>
              {
                filteredSubCategories.map(subCategory => {
                  const value = subCategory?._id;
                  const label = subCategory?.name?.[getLangKey()];
                  const isSubCategoryActive = subCategory.status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE;
                  const optionClass = isSubCategoryActive ? classes.activeCategory : classes.inactiveCategory;
                  const tooltipTitle = isSubCategoryActive ? t('global:ACTIVE_CATEGORY') : t('global:INACTIVE_CATEGORY');
                  return (
                    <Option key={value} value={value} label={label} className={optionClass}>
                      <Tooltip title={tooltipTitle}>
                        {label}
                      </Tooltip>
                    </Option>
                  );
                })
              }
            </OptGroup>
          );
        }
        return null;
      })
  );
};

export const getWarehouseOptions = (warehouses = []) => {
  const warehouseOptions = warehouses.map(warehouse => {
    const value = warehouse?._id;
    const label = warehouse?.name;
    return (
      <Option key={value} value={value} label={label}>
        {label}
      </Option>
    );
  });

  return warehouseOptions;
};

export const getWarehouseOptionGroups = warehouses => {
  const warehousesByCities = groupBy(warehouses, 'city._id');
  const optionGroups = Object.entries(warehousesByCities)
    .filter(([cityId]) => isObjectIdValid(cityId))
    .map(([cityId, warehousesByCity]) => {
      const cityName = warehousesByCity?.[0]?.city?.name?.[getLangKey()];
      return (
        <OptGroup label={cityName} key={cityId}>
          {getWarehouseOptions(warehousesByCity)}
        </OptGroup>
      );
    });
  return optionGroups;
};

export const multiplyPricePerKG = (value = 0, isNormalize = false) => {
  const calculatedValue = value * ONE_KG_IN_GRAM;
  const newValue = isNormalize ? normalizeNumber(calculatedValue) : calculatedValue;
  return newValue;
};

export const dividePricePerKG = (value = 0) => {
  const newValue = value / ONE_KG_IN_GRAM;
  return newValue;
};

export const renderDropdownMenu = ({ menu, t, selectedData, data, onSelectAll, onUnselectAll }) => {
  const areAllDataSelected = selectedData?.length === data?.length;
  return (
    <div>
      {menu}
      <Row className="d-flex align-items justify-content-center m-2">
        <Button onClick={areAllDataSelected ? onUnselectAll : onSelectAll}>
          {areAllDataSelected ? t('button:UNSELECT_ALL') : t('button:SELECT_ALL') }
        </Button>
      </Row>
    </div>
  );
};

export const areStringValuesUnique = arr => {
  const uniqueValues = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === 'string') {
      if (uniqueValues.has(arr[i])) {
        return false;
      }
      uniqueValues.add(arr[i]);
    }
  }
  return true;
};

export const renderCategoryStatusTag = ({ t, status }) => {
  const isActive = status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE;
  const color = status === MARKET_PRODUCT_CATEGORY_STATUS.ACTIVE ? 'success' : 'error';
  const text = isActive ? t('ACTIVE') : t('INACTIVE');
  return (
    <Tag color={color}>
      {text}
    </Tag>
  );
};

export const getMarketProductTypeOptions = () => {
  return Object.entries(marketProductTypes).map(([key, value]) => {
    return {
      value: Number(key),
      label: value[getLangKey()],
    };
  });
};

export const getMarketProductSubTypeOptions = type => {
  let subTypes = [];
  if (type === MARKET_PRODUCT_TYPE.WEIGHT) subTypes = marketProductWeightSubTypes;
  return Object.entries(subTypes).map(([key, value]) => {
    return {
      value: Number(key),
      label: value[getLangKey()],
    };
  });
};

export const getMarketProductUnitOptions = type => {
  const units = typeBasedProductUnits?.[type];
  return Object.entries(units || {}).map(([key, value]) => {
    return {
      value: Number(key),
      label: value[getLangKey()],
    };
  });
};

export const getWeightOptions = () => {
  return Array
    .from({ length: END_WEIGHT_IN_GRAM / START_WEIGHT_IN_GRAM })
    .map((_, index) => {
      const gramValue = (index + 1) * START_WEIGHT_IN_GRAM;
      const kgValue = gramValue / ONE_KG_IN_GRAM;
      const label = `${kgValue}kg (${gramValue}g)`;
      return {
        value: kgValue,
        label,
      };
    });
};

export const getWeightUnitTextOfProduct = marketProduct => {
  const weightUnit = weightTypeProductUnits?.[marketProduct?.unit]?.[getLangKey()] || '';
  return weightUnit;
};

export const getCurrencyWithWeightUnit = marketProduct => {
  const weightUnit = weightTypeProductUnits?.[marketProduct?.unit]?.[getLangKey()];
  return weightUnit ? `${currency()} / ${weightUnit}` : currency();
};

export const getProductType = marketProduct => marketProduct?.type || MARKET_PRODUCT_TYPE.PIECE;

export const isThereEnoughWeightLimitToIncrease = (type, weightInfo, upperLimit) => {
  const { initialWeight, amountOfWeightIncrement } = weightInfo || {};
  const isProductWeight = type === MARKET_PRODUCT_TYPE.WEIGHT;
  return isProductWeight && (initialWeight + amountOfWeightIncrement >= upperLimit);
};

export const classifyValidationErrors = validationErrors => {
  return validationErrors.map(validationError => {
    const fieldKey = validationError?.field?.split('.')?.[0];
    const newValidationError = {
      ...validationError,
      ...PRODUCT_ACTIVATION_BE_KEY_TO_CONTAINER_MAP?.[fieldKey],
    };
    return newValidationError;
  });
};

export const filterValidationErrors = ({ validationErrors, tabId, containerId }) => {
  let filteredValErrors = [];
  if (containerId) {
    filteredValErrors = validationErrors?.filter(validationError => validationError.containerId === containerId);
  }
  else if (tabId) {
    filteredValErrors = validationErrors?.filter(validationError => validationError.tabId === tabId);
  }
  return filteredValErrors;
};

export const priceFormatter = (price, digit = 2) => {
  if (Number.isNaN(price) || price == null) {
    return price;
  }
  return Number.parseFloat(price).toFixed(digit);
};

export const getPricingServiceError = error => error?.response?.data?.details?.message?.[0]?.message || getErrorMessage(error);

export const convertAmountToRate = (amount, price) => {
  return (amount / price).toFixed(4);
};

export const convertRateToAmount = (rate, price) => {
  return Math.floor((rate * price));
};

export const getCountryRestrictedDomainTypeOptions = countryCode => {
  return Object.entries(getirMarketDomainTypes)
    .filter(([domainType]) => {
      const whitelist = COUNTRY_RESTRICTED_DOMAIN_TYPES_WHITELIST[domainType];
      const isDomainRestrictedPerCountry = typeof whitelist !== 'undefined';

      if (!isDomainRestrictedPerCountry) {
        return true;
      }

      return whitelist.includes(countryCode);
    }).map(([key, value]) => {
      return {
        value: toString(key),
        label: value[getLangKey()],
      };
    });
};
