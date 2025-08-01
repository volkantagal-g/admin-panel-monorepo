import {
  isEmpty,
  difference,
  keys,
  has,
  get,
  toString,
  intersection,
  includes as _includes,
  isNull,
} from 'lodash';
import moment from 'moment';

import { startDate, getEndDate } from './redux/initialState';
import {
  GETIR_DOMAIN_TYPE_CODES,
  GETIR_MAREKT_DOMAIN_TYPES_WITHOUT_VOYAGER,
  GETIR_MARKET_DOMAIN_TYPES,
} from '@shared/shared/constants';
import { BASKET_DETAIL_TYPES } from './components/GetirGeneralDetail/OrderProductDetail/constants';
import { PARAMETER_TYPE } from '@app/pages/Report/constants';
import { t } from '@shared/i18n';
import { PROBLEMATIC_ORDERS_DOMAIN_TYPE } from '@app/pages/ClientTargeting/constants';

export const getirDomainTypesList = GETIR_DOMAIN_TYPE_CODES.map(tag => {
  const name = t(`global:GETIR_MARKET_DOMAIN_TYPES:${tag}`);
  const _id = tag;
  return { _id, name };
});

export const getirMarketDomainTypesList = GETIR_MARKET_DOMAIN_TYPES.map(tag => {
  const name = t(`global:GETIR_MARKET_DOMAIN_TYPES:${tag}`);
  const _id = tag;
  return { _id, name };
});

export const getirProblematicOrdersDomainType = PROBLEMATIC_ORDERS_DOMAIN_TYPE.map(tag => {
  const name = t(`global:GETIR_MARKET_DOMAIN_TYPES:${tag}`);
  const _id = tag;
  return { _id, name };
});

export const getirMarketDomainTypesWihoutVoyager = GETIR_MAREKT_DOMAIN_TYPES_WITHOUT_VOYAGER.map(tag => {
  const name = t(`global:GETIR_MARKET_DOMAIN_TYPES:${tag}`);
  const _id = tag;
  return { _id, name };
});

export const marketOrderFeedbackMainReasonOptions = ({ langKey, mainReasons }) => (mainReasons?.map(reason => {
  return {
    _id: reason.id,
    name: reason[langKey],
  };
}));

export const marketOrderFeedbackSubReasonOptions = ({ langKey, subReasons }) => (subReasons?.map(reason => {
  return {
    _id: reason.id,
    name: reason[langKey],
    mainReason: reason.parentFeedbackReasonId,
  };
}));

export const getSortedReasons = reasons => reasons?.sort((a, b) => a.name.localeCompare(b.name));

export const isValidNumberInput = input => {
  const re = /^[0-9]+$|^$/;
  return re.test(input);
};

export const validateGeoJson = data => {
  let geoJson = null;
  const requiredGeoJsonKeys = ['type', 'features'];
  const requiredFeaturesKeys = ['geometry', 'type', 'properties'];
  const requiredGeometryKeys = ['type', 'coordinates'];
  // const allowedPolygonCount = 1;

  if (isEmpty(data)) {
    throw new Error(t('clientTargetingPage:ERR_CHECK_FILE'));
  }
  try {
    geoJson = JSON.parse(data);
  }
  catch (err) {
    throw new Error(t('clientTargetingPage:ERR_CHECK_FILE'));
  }
  if (!isEmpty(difference(requiredGeoJsonKeys, keys(geoJson)))) {
    throw new Error(`${requiredGeoJsonKeys.join(', ')}${t('clientTargetingPage:ERR_REQUIRED')}`);
  }
  if (geoJson.type !== 'FeatureCollection') {
    throw new Error(t('clientTargetingPage:ERR_CHECK_FILE'));
  }
  if (isEmpty(geoJson.features)) {
    throw new Error(`${t('polygonPage:GEO_JSON')} ${t('clientTargetingPage:ERR_REQUIRED')}`);
  }
  if (!isEmpty(difference(requiredFeaturesKeys, keys(geoJson.features[0])))) {
    throw new Error(`${requiredFeaturesKeys.join(', ')} ${t('clientTargetingPage:ERR_REQUIRED')}`);
  }
  if (!isEmpty(difference(requiredGeometryKeys, keys(geoJson.features[0].geometry)))) {
    throw new Error(`${requiredGeometryKeys.join(', ')} ${t('clientTargetingPage:ERR_REQUIRED')}`);
  }
  if (geoJson.features[0].geometry.type !== 'Polygon') {
    throw new Error(t('clientTargetingPage:ERR_CHECK_FILE'));
  }
  if (isEmpty(geoJson.features[0].geometry.coordinates)) {
    throw new Error(`${t('polygonPage:GEO_JSON')} ${t('clientTargetingPage:ERR_REQUIRED')}`);
  }

  return geoJson;
};

const getSelectableProducts = ({
  manufacturerId,
  supplierId,
  categoryId,
  subCategoryId,
  subCategories,
  products,
}) => {
  return products.filter(product => {
    if (manufacturerId) {
      const hasSelectedManufacturer = product.manufacturer && product.manufacturer._id === manufacturerId;
      if (!hasSelectedManufacturer) {
        return false;
      }
    }

    if (supplierId) {
      const hasSelectedSupplier = product.suppliers && Boolean(product.suppliers.filter(supplier => supplier._id === supplierId).length);
      if (!hasSelectedSupplier) {
        return false;
      }
    }

    if (categoryId) {
      const hasSelectedCategory = (product.category?._id === categoryId || product.category === categoryId);
      const hasSelectedMasterCategory = (product.masterCategory?._id === categoryId) || (product.masterCategory === categoryId);
      if (!(hasSelectedCategory || hasSelectedMasterCategory)) {
        return false;
      }
    }

    if (subCategoryId) {
      const hasSelectedSubCategory = (product.subCategory?._id === subCategoryId || product.subCategory === subCategoryId);
      if (!hasSelectedSubCategory) {
        return false;
      }
    }
    else if (!isEmpty(subCategories)) {
      if (
        !(
          _includes(subCategories, get(product, ['subCategory', '_id'])) ||
          _includes(subCategories, get(product, ['subCategory']))
        )
      ) {
        return false;
      }
    }
    else {
      return false;
    }

    return true;
  });
};

const getSelectableSubCategories = ({ category: categoryId, subCategories }) => subCategories.filter(categoryItem => categoryItem.parent?._id === categoryId);

const getSelectableWarehouses = ({
  warehouses,
  cities = [],
  domainTypes = [],
  warehouseType = null,
}) => {
  const citiesSet = new Set(cities);
  let shouldCheckDomainType = false;
  let shouldCheckWarehouseType = false;

  if (!isEmpty(domainTypes)) {
    shouldCheckDomainType = true;
  }

  if (!isNull(warehouseType)) {
    shouldCheckWarehouseType = true;
  }

  const selectedDomainTypes = domainTypes?.map(domainType => Number(domainType));

  return warehouses.filter(warehouse => {
    const warehouseCityId = typeof warehouse?.city === 'string' ? get(warehouse, 'city') : get(warehouse, 'city._id');
    const currentWarehouseType = toString(get(warehouse, 'warehouseType'));
    const currentWarehouseDomainTypes = get(warehouse, 'domainTypes');

    const hasCityControlFailed = !citiesSet.has(warehouseCityId);
    if (hasCityControlFailed) return false;

    const hasDomainTypeControlFailed = shouldCheckDomainType && isEmpty(intersection(selectedDomainTypes, currentWarehouseDomainTypes));
    if (hasDomainTypeControlFailed) return false;

    const hasWarehouseTypeControlFailed = shouldCheckWarehouseType && warehouseType && warehouseType !== currentWarehouseType;
    if (hasWarehouseTypeControlFailed) return false;

    return true;
  });
};

export const updateGeneralState = ({ state, domainType, key, clientListKey, value, filterableData }) => {
  const copiedState = state;
  if (!key) {
    copiedState[domainType][clientListKey] = value;
  }
  else {
    const { activeIndex } = copiedState[domainType][key];
    copiedState[domainType][key].params[activeIndex][clientListKey] = value;

    const currentClientList = copiedState[domainType][key].params[activeIndex];
    const { cities, domainTypes, warehouseType } = currentClientList;

    if (has(filterableData, 'shops') && currentClientList.getShops.data.length) {
      currentClientList.getShops.data = [];
    }

    if (has(filterableData, 'shops') && currentClientList.shops.length) {
      currentClientList.shops = [];
    }

    if (has(filterableData, 'warehouses')) {
      const { warehouses } = filterableData;
      currentClientList.selectableWarehouses = getSelectableWarehouses({
        warehouses,
        cities,
        domainTypes,
        warehouseType,
      });

      const selectableWarehousesIds = currentClientList?.selectableWarehouses?.map(warehouse => warehouse._id);
      // If selected warehouses are not in selectable warehouses, clear selected warehouses
      const shouldClearSelectedWarehousesInput = difference(currentClientList.warehouses, selectableWarehousesIds);
      if (!isEmpty(shouldClearSelectedWarehousesInput)) {
        currentClientList.warehouses = [];
      }
    }
    if (has(filterableData, 'subCategories')) {
      const { subCategories } = filterableData;
      const { category } = currentClientList;

      if (!category) {
        currentClientList.selectableProducts = [];
      }

      currentClientList.selectableSubCategories = getSelectableSubCategories({
        category,
        subCategories,
      });

      currentClientList.subCategory = null;
      currentClientList.subCategories = [];
      currentClientList.products = [];
    }
    if (has(filterableData, 'products')) {
      const { products } = filterableData;
      const {
        category,
        manufacturer,
        supplier,
        subCategory,
        subCategories,
      } = currentClientList;

      currentClientList.products = [];

      currentClientList.selectableProducts = getSelectableProducts({
        categoryId: category,
        subCategoryId: subCategory,
        manufacturerId: manufacturer,
        supplierId: supplier,
        subCategories,
        products,
      });
    }
    if (has(filterableData, 'cityDisabled')) {
      const { cityDisabled } = filterableData;
      currentClientList.cityDisabled = cityDisabled;
      currentClientList.cities = [];
    }
    if (has(filterableData, 'productCategoriesDisabled')) {
      const { productCategoriesDisabled } = filterableData;
      currentClientList.productCategoriesDisabled = productCategoriesDisabled;
      currentClientList.category = [];
    }
    if (has(filterableData, 'productSubCategoriesDisabled')) {
      const { productSubCategoriesDisabled } = filterableData;
      currentClientList.productSubCategoriesDisabled = productSubCategoriesDisabled;
      currentClientList.subCategory = null;
      currentClientList.subCategories = [];
    }
    if (has(filterableData, 'selectableProducts')) {
      const { selectableProducts } = filterableData;
      currentClientList.selectableProducts = selectableProducts;
    }
    if (has(filterableData, 'selectableWarehouses')) {
      const { selectableWarehouses } = filterableData;
      currentClientList.selectableWarehouses = selectableWarehouses;
    }
    if (has(filterableData, 'warehouseTypeDisabled')) {
      const { warehouseTypeDisabled } = filterableData;
      currentClientList.warehouseTypeDisabled = warehouseTypeDisabled;
      currentClientList.warehouseType = null;
    }
    if (has(filterableData, 'subReasons')) {
      const { subReasons } = filterableData;
      const { mainReasons } = currentClientList;
      currentClientList.selectableSubReasons = subReasons.filter(
        subReason => mainReasons.includes(subReason.mainReason),
      );
      if (!mainReasons?.length) {
        currentClientList.subReasons = [];
      }
      if (!(currentClientList.selectableSubReasons.find(subReason => currentClientList.subReasons.includes(subReason.mainReason)))
        && currentClientList.selectableSubReasons.length) {
        currentClientList.subReasons = [];
      }
    }
    if (currentClientList.basketDetailType) {
      currentClientList.suppliers = currentClientList.basketDetailType === BASKET_DETAIL_TYPES.SUPPLIER ? currentClientList.suppliers : [];
      currentClientList.categories = currentClientList.basketDetailType === BASKET_DETAIL_TYPES.CATEGORY ? currentClientList.categories : [];
      currentClientList.subCategories = currentClientList.basketDetailType === BASKET_DETAIL_TYPES.SUB_CATEGORY ? currentClientList.subCategories : [];
      currentClientList.manufacturers = currentClientList.basketDetailType === BASKET_DETAIL_TYPES.MANUFACTURER ? currentClientList.manufacturers : [];
      currentClientList.brands = currentClientList.basketDetailType === BASKET_DETAIL_TYPES.BRAND ? currentClientList.brands : [];
    }
    // Csv import of warehouses disable city selection, but it should enable again if cleared and we don't ignore country
    if (currentClientList.cityDisabled && isEmpty(currentClientList.warehouses) && !currentClientList.ignoreCountry) {
      currentClientList.cityDisabled = false;
      currentClientList.selectableWarehouses = [];
      currentClientList.warehouseTypeDisabled = false;
    }
    if (currentClientList.productCategoriesDisabled && isEmpty(currentClientList.products)) {
      currentClientList.productCategoriesDisabled = false;
      currentClientList.selectableProducts = [];
      currentClientList.productSubCategoriesDisabled = false;
    }
  }
  return copiedState;
};

export const getDisabledDate = (current, otherDate, type, disableBeforeXDate) => {
  const exceedsLimits = current < moment(startDate) || current > moment(getEndDate());
  if (type === 'start') {
    if (disableBeforeXDate && current.isBefore(moment(disableBeforeXDate))) {
      return current.isBefore(moment(disableBeforeXDate));
    }
    const result = (current && otherDate && current.isAfter(moment(otherDate))) || exceedsLimits ||
      (current.isSame(moment(otherDate), 'hours') && current.isSame(moment(otherDate), 'minutes'));
    return result;
  }

  const result = (current && otherDate && (!current.isSame(moment(otherDate), 'date') && current.isBefore(moment(otherDate))))
    || exceedsLimits;
  return result;
};

const getDisabledStartTimeHours = otherDate => {
  const disabledHours = [];
  const endTime = moment(otherDate);
  for (let i = endTime.hour() + 1; i < 24; i += 1) {
    disabledHours.push(i);
  }
  if (endTime.minute() === 0) {
    disabledHours.push(endTime.hour());
  }
  return disabledHours;
};

const getDisabledEndTimeHours = (current, otherDate) => {
  const disabledHours = [];
  const endDateMoment = moment(getEndDate());
  const startTime = moment(otherDate);
  for (let i = 0; i < 24; i += 1) {
    if (i < startTime.hour() || ((endDateMoment.isSame(current, 'date') && i > endDateMoment.hour()))) {
      disabledHours.push(i);
    }
  }
  return disabledHours;
};

const getDisabledHours = (current, otherDate, type) => {
  if (!current.isSame(moment(otherDate), 'date') && !moment().isSame(current, 'date')) {
    return [];
  }
  if (type === 'start') {
    return getDisabledStartTimeHours(otherDate);
  }
  return getDisabledEndTimeHours(current, otherDate);
};

const getDisabledStartTimeMinutes = otherDate => {
  const disabledMinutes = [];
  const endTime = moment(otherDate);
  for (let i = endTime.minute(); i < 60; i += 1) {
    disabledMinutes.push(i);
  }
  return disabledMinutes;
};

const getDisabledEndTimeMinutes = (current, otherDate) => {
  const disabledMinutes = [];
  const endDateMoment = moment(getEndDate());
  const startTime = moment(otherDate);
  for (let i = 0; i < 60; i += 1) {
    if ((startTime.isSame(current, 'hour') && i <= startTime.minute()) ||
      (endDateMoment.isSame(current, 'hour') && i > endDateMoment.minute())) {
      disabledMinutes.push(i);
    }
  }
  return disabledMinutes;
};

const getDisabledMinutes = (current, otherDate, type) => {
  if (type === 'start') {
    return getDisabledStartTimeMinutes(otherDate);
  }
  return getDisabledEndTimeMinutes(current, otherDate);
};

export const getDisabledDateTime = (current, otherDate, type) => {
  return {
    disabledHours: () => getDisabledHours(current, otherDate, type),
    disabledMinutes: () => {
      if ((current.isSame(moment(otherDate), 'date') && (current.isSame(moment(otherDate), 'hour'))) ||
        (current.isSame(moment(), 'date'))) {
        return getDisabledMinutes(current, otherDate, type);
      }
      return [];
    },
  };
};

export const isValidDataScienceInput = input => {
  if (isEmpty(input)) {
    return false;
  }

  if (!Object.values(PARAMETER_TYPE).some(type => input.inputType === type)) {
    return false;
  }

  return true;
};

export const getUtcHour = (hour, format, timezone) => moment.tz(hour, format, timezone).utc().hour();
