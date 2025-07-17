import moment from 'moment-timezone';
import {
  isEmpty as _isEmpty,
  filter as _filter,
  intersection as _intersection,
  forEach as _forEach,
  get as _get,
  values as _values,
} from 'lodash';

import { getLangKey } from '@shared/i18n';
import { createMap, getUTCHoursFromMinutesOfDay } from '@shared/utils/common';
import { MINUTES_IN_A_DAY } from '@shared/shared/constants';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { TABLE_TYPES } from '@app/pages/GetirMarket/CommercialMonitoring/components/Table/constants';
import { productSegments } from '@shared/shared/constantValues';
import { toFakeLocalTime } from '@shared/utils/dateHelper';
import { getIsoDateString } from '../Dashboard/utils';

export const getFormattedRequestBody = ({ filters, isHoursIncluded, shouldReturnFakeLocalDate = false }) => {
  const selectedCountryTimezone = getSelectedCountry()?.timezones?.[0]?.timezone;
  const requestBody = {
    start_date: shouldReturnFakeLocalDate ?
      getIsoDateString(toFakeLocalTime(filters.dateRange[0])) :
      moment.tz(filters.dateRange[0].startOf('day'), selectedCountryTimezone).toISOString(),
    end_date: shouldReturnFakeLocalDate ?
      getIsoDateString(toFakeLocalTime(filters.dateRange[1])) :
      moment.tz(filters.dateRange[1].endOf('day'), selectedCountryTimezone).toISOString(),
    domain_types: [filters.domainType],
  };
  if (isHoursIncluded && (filters.hoursRange[0] !== 0 || filters.hoursRange[1] !== MINUTES_IN_A_DAY)) {
    requestBody.hours = getUTCHoursFromMinutesOfDay({
      startMin: filters.hoursRange[0],
      endMin: filters.hoursRange[1],
    });
  }
  if (filters.cities.length > 0) {
    requestBody.cities = filters.cities;
  }
  if (filters.countries.length > 0) {
    requestBody.divisionCountries = filters.countries;
  }

  return requestBody;
};

const prepareInitialStatObj = (innerMap, id, outerMap, additionalObj) => {
  Object.assign(innerMap, {
    [id]: {
      id,
      name: _get(outerMap, [id, 'name'], ''),
      totalSlots: 0,
      availableSlots: 0,
      count: 0,
      netRevenue: 0,
      basketAmount: 0,
      chargedAmount: 0,
      availability: 0,
      ...(!_isEmpty(additionalObj) && additionalObj),
    },
  });
};

const fillProductSaleStats = (statObj, {
  count,
  netRevenue,
  chargedAmount,
  basketAmount,
  availableSlots,
  totalSlots,
}) => {
  Object.assign(statObj, {
    count: (statObj.count ?? 0) + (count ?? 0),
    netRevenue: (statObj.netRevenue ?? 0) + (netRevenue ?? 0),
    chargedAmount: (statObj.chargedAmount ?? 0) + (chargedAmount ?? 0),
    basketAmount: (statObj.basketAmount ?? 0) + (basketAmount ?? 0),
    availableSlots: (statObj.availableSlots ?? 0) + (availableSlots ?? 0),
    totalSlots: (statObj.totalSlots ?? 0) + (totalSlots ?? 0),
    availability: ((statObj.availableSlots ?? 0) + (availableSlots ?? 0)) / ((statObj.totalSlots ?? 0) + (totalSlots ?? 0)),
  });
};

export const getFormattedTableData = ({
  productSaleStats,
  availability,
  instantAvailability,
  filters,
  tableFilters,
  suppliers,
  categories,
  subCategories,
  products,
}) => {
  if (_isEmpty(suppliers) || _isEmpty(categories) || _isEmpty(subCategories) || _isEmpty(products)) {
    return [];
  }
  const selectedCategoriesSet = new Set(tableFilters.categories);
  const selectedSubCategoriesSet = new Set(tableFilters.subCategories);

  const filteredProducts = _filter(products, product => {
    if (!product.domainTypes?.includes(filters.domainType)) {
      return false;
    }

    if (tableFilters.suppliers.length > 0) {
      const supplierIds = product?.suppliers || [];
      if (_intersection(tableFilters.suppliers, supplierIds).length === 0) {
        return false;
      }
    }
    if (tableFilters.categories.length > 0 && !selectedCategoriesSet.has(product?.category)) {
      return false;
    }
    if (tableFilters.subCategories.length > 0 && !selectedSubCategoriesSet.has(product?.subCategory)) {
      return false;
    }
    const productName = product?.fullName?.[getLangKey()]?.trim() || product?.name?.[getLangKey()]?.trim() || '';
    const searchableText = `${productName} ${product?._id}`.toLowerCase();
    if (tableFilters?.searchTerm?.trim().length >= 3 && !searchableText.includes(tableFilters?.searchTerm?.toLowerCase())) {
      return false;
    }

    return true;
  });
  const suppliersMap = createMap(suppliers);
  const categoriesMap = createMap(categories);
  const subCategoriesMap = createMap(subCategories);
  const productsMap = createMap(filteredProducts);

  const productStatsMap = {};
  const categoryStatsMap = {};
  const subCategoryStatsMap = {};
  const supplierStatsMap = {};
  const productTotalStats = {};
  const categoryTotalStats = {};
  const subCategoryTotalStats = {};
  const supplierTotalStats = {};

  let productNetRevenue = 0;
  let productTotalCount = 0;
  let productTotalChargedAmount = 0;
  let productTotalBasketAmount = 0;

  _forEach(productSaleStats, (domainTypeData, dataKey) => {
    if (filters.domainType === Number(dataKey)) {
      _forEach(domainTypeData, ({
        productId,
        itemCount: count = 0,
        netRevenue = 0,
        chargedAmount = 0,
        basketValue: basketAmount = 0,
      }) => {
        productNetRevenue += netRevenue;
        productTotalCount += count;
        productTotalChargedAmount += chargedAmount;
        productTotalBasketAmount += basketAmount;

        const product = productsMap[productId];
        if (!_isEmpty(product)) {
          const categoryId = productsMap[productId]?.category;
          const subCategoryId = productsMap[productId]?.subCategory;
          const supplierIds = productsMap[productId]?.suppliers;

          const productStat = productStatsMap[productId];
          if (!productStat) {
            prepareInitialStatObj(productStatsMap, productId, productsMap, {
              name: productsMap?.[productId]?.fullName?.[getLangKey()]?.trim() || productsMap?.[productId]?.name?.[getLangKey()]?.trim(),
              category: categoriesMap[categoryId]?.name?.[getLangKey()]?.trim(),
              subcategory: subCategoriesMap[subCategoryId]?.name?.[getLangKey()]?.trim(),
              supplier: [],
              segments: product?.logisticSupplyInfo?.segments.map(segment => productSegments[segment]?.[getLangKey()]).join(', '),
            });
          }

          fillProductSaleStats(productStatsMap[productId], { count, netRevenue, chargedAmount, basketAmount });
          fillProductSaleStats(productTotalStats, { count, netRevenue, chargedAmount, basketAmount, totalsObj: productTotalStats });

          if (categoryId) {
            const categoryStat = categoryStatsMap[categoryId];
            if (_isEmpty(categoryStat)) {
              prepareInitialStatObj(categoryStatsMap, categoryId, categoriesMap, { name: categoriesMap[categoryId]?.name?.[getLangKey()]?.trim() });
            }

            fillProductSaleStats(categoryStatsMap[categoryId], { count, netRevenue, chargedAmount, basketAmount });
            fillProductSaleStats(categoryTotalStats, { count, netRevenue, chargedAmount, basketAmount });
          }

          if (subCategoryId) {
            const subCategoryStat = subCategoryStatsMap[subCategoryId];
            if (_isEmpty(subCategoryStat)) {
              prepareInitialStatObj(
                subCategoryStatsMap,
                subCategoryId,
                subCategoriesMap,
                { name: subCategoriesMap[subCategoryId]?.name?.[getLangKey()]?.trim() },
              );
            }

            fillProductSaleStats(subCategoryStatsMap[subCategoryId], { count, netRevenue, chargedAmount, basketAmount });
            fillProductSaleStats(subCategoryTotalStats, { count, netRevenue, chargedAmount, basketAmount });
          }

          _forEach(supplierIds, supplierId => {
            const supplierStat = supplierStatsMap[supplierId];
            if (_isEmpty(supplierStat)) {
              prepareInitialStatObj(supplierStatsMap, supplierId, suppliersMap);
            }

            fillProductSaleStats(supplierStatsMap[supplierId], { count, netRevenue, chargedAmount, basketAmount });
            fillProductSaleStats(supplierTotalStats, { count, netRevenue, chargedAmount, basketAmount });
          });
        }
      });
    }
  });

  _forEach(availability?.products, stat => {
    _forEach(stat, ({ available_slot: availableSlots = 0, total_slot: totalSlots = 0 }, productId) => {
      const product = productsMap[productId];
      if (!_isEmpty(product)) {
        const categoryId = product?.category;
        const subCategoryId = product?.subCategory;
        const supplierIds = product?.suppliers;

        const productStat = productStatsMap[productId];
        if (!productStat) {
          prepareInitialStatObj(productStatsMap, productId, productsMap, {
            name: product?.fullName?.[getLangKey()]?.trim() || product?.name?.[getLangKey()]?.trim(),
            category: categoriesMap[categoryId]?.name?.[getLangKey()]?.trim(),
            subcategory: subCategoriesMap[subCategoryId]?.name?.[getLangKey()]?.trim(),
            supplier: [],
            segments: product?.logisticSupplyInfo?.segments.map(segment => productSegments[segment]?.[getLangKey()]).join(', '),
          });
        }

        fillProductSaleStats(productStatsMap[productId], { availableSlots, totalSlots });
        fillProductSaleStats(productTotalStats, { availableSlots, totalSlots });

        if (categoryId) {
          const categoryStat = categoryStatsMap[categoryId];
          if (_isEmpty(categoryStat)) {
            prepareInitialStatObj(categoryStatsMap, categoryId, categoriesMap, { name: categoriesMap[categoryId]?.name?.[getLangKey()]?.trim() });
          }

          fillProductSaleStats(categoryStatsMap[categoryId], { availableSlots, totalSlots });
          fillProductSaleStats(categoryTotalStats, { availableSlots, totalSlots });
        }

        if (subCategoryId) {
          const subCategoryStat = subCategoryStatsMap[subCategoryId];
          if (_isEmpty(subCategoryStat)) {
            prepareInitialStatObj(
              subCategoryStatsMap,
              subCategoryId,
              subCategoriesMap,
              { name: subCategoriesMap[subCategoryId]?.name?.[getLangKey()]?.trim() },
            );
          }

          fillProductSaleStats(subCategoryStatsMap[subCategoryId], { availableSlots, totalSlots });
          fillProductSaleStats(subCategoryTotalStats, { availableSlots, totalSlots });
        }

        _forEach(supplierIds, supplierId => {
          const supplierStat = supplierStatsMap[supplierId];
          if (_isEmpty(supplierStat)) {
            prepareInitialStatObj(supplierStatsMap, supplierId, suppliersMap);
          }

          fillProductSaleStats(supplierStatsMap[supplierId], { availableSlots, totalSlots });
          fillProductSaleStats(supplierTotalStats, { availableSlots, totalSlots });
        });
      }
    });
  });

  _forEach(instantAvailability?.products, stat => {
    _forEach(stat, ({ available_slot: availableSlots = 0, total_slot: totalSlots = 0 }, productId) => {
      if (!_isEmpty(productStatsMap[productId])) {
        const product = productsMap[productId];
        const categoryId = product?.category;
        const subCategoryId = product?.subCategory;

        const productStat = productStatsMap[productId];
        if (!productStat) {
          prepareInitialStatObj(productStatsMap, productId, productsMap, {
            name: product?.fullName?.[getLangKey()]?.trim() || product?.name?.[getLangKey()]?.trim(),
            category: categoriesMap[categoryId]?.name?.[getLangKey()]?.trim(),
            subcategory: subCategoriesMap[subCategoryId]?.name?.[getLangKey()]?.trim(),
            supplier: [],
            segments: product?.logisticSupplyInfo?.segments.map(segment => productSegments[segment]?.[getLangKey()]).join(', '),
          });
        }

        productStatsMap[productId].instantAvailability = {
          availableSlots: (productStatsMap[productId]?.instantAvailability?.availableSlots ?? 0) + availableSlots,
          totalSlots: (productStatsMap[productId]?.instantAvailability?.totalSlots ?? 0) + totalSlots,
          availability: (
            ((productStatsMap[productId]?.instantAvailability?.availableSlots ?? 0) + availableSlots) /
            ((productStatsMap[productId]?.instantAvailability?.totalSlots ?? 0) + totalSlots)
          ),
        };

        productTotalStats.instantAvailability = {
          availableSlots: (productTotalStats.instantAvailability?.instantAvailability?.availableSlots ?? 0) + availableSlots,
          totalSlots: (productTotalStats.instantAvailability?.totalSlots ?? 0) + totalSlots,
          availability: (
            ((productTotalStats.instantAvailability?.availableSlots ?? 0) + availableSlots) /
            ((productTotalStats.instantAvailability?.totalSlots ?? 0) + totalSlots)
          ),
        };
      }
    });
  });

  const bestSellerListByTableKey = {
    tableData: {
      [TABLE_TYPES.PRODUCT]: _values(productStatsMap),
      [TABLE_TYPES.CATEGORY]: _values(categoryStatsMap),
      [TABLE_TYPES.SUB_CATEGORY]: _values(subCategoryStatsMap),
      [TABLE_TYPES.SUPPLIER]: _values(supplierStatsMap),
    },
    totalStats: {
      [TABLE_TYPES.PRODUCT]: productTotalStats,
      [TABLE_TYPES.CATEGORY]: categoryTotalStats,
      [TABLE_TYPES.SUB_CATEGORY]: subCategoryTotalStats,
      [TABLE_TYPES.SUPPLIER]: supplierTotalStats,
    },
  };

  return {
    tableData: bestSellerListByTableKey.tableData[tableFilters.tableType],
    totalStats: bestSellerListByTableKey.totalStats[tableFilters.tableType],
    nonFilteredSaleStats: {
      netRevenue: productNetRevenue,
      totalCount: productTotalCount,
      chargedAmount: productTotalChargedAmount,
      basketAmount: productTotalBasketAmount,
    },
  };
};
