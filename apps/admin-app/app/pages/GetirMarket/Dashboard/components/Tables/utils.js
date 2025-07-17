import _ from 'lodash';

import { getLangKey } from '@shared/i18n';
import { isNullOrEmpty } from '@shared/utils/common';
import { numberFormatWithoutDecimal, percentFormatWithoutDecimal } from '@shared/utils/localization';

const mapper = iteratee => {
  const mappedItems = {};
  iteratee?.forEach(item => {
    mappedItems[item._id] = item;
  });
  return mappedItems;
};

export const getProductSale = ({ productAvailability, itemFinancialStats, products, categories, subCategories, suppliers }) => {
  let totalAllPrice = 0;
  let totalAllCount = 0;

  const productAvailabilitiesMap = {};
  const categoryAvailabilitiesMap = {};
  const subCategoryAvailabilitiesMap = {};
  const supplierAvailabilitiesMap = {};

  const marketProductMap = mapper(products);
  const marketProductCategoriesMap = mapper(categories);
  const marketProductSubCategoriesMap = mapper(subCategories);
  const supplierMap = mapper(suppliers);

  _.forEach(itemFinancialStats, domainItems => {
    _.forEach(domainItems, ({
      productId,
      itemCount = 0,
      basketValue: totalPrice = 0,
    }) => {
      totalAllPrice += totalPrice;
      totalAllCount += itemCount;

      const categoryId = _.get(marketProductMap, [productId, 'category']);
      const subCategoryId = _.get(marketProductMap, [productId, 'subCategory']);
      const supplierIds = _.get(marketProductMap, [productId, 'suppliers']);

      const item = productAvailabilitiesMap[productId];
      const subCategory = subCategoryAvailabilitiesMap[subCategoryId];
      const category = categoryAvailabilitiesMap[categoryId];

      if (_.isEmpty(item)) {
        productAvailabilitiesMap[productId] = {
          name: _.get(marketProductMap, [productId, 'fullName', getLangKey()], null),
          totalSlots: 0,
          availableSlots: 0,
          itemCount: 0,
          totalPrice: 0,
          availability: 0,
        };
      }
      if (_.isEmpty(subCategory)) {
        subCategoryAvailabilitiesMap[subCategoryId] = {
          name: _.get(marketProductSubCategoriesMap, [subCategoryId, 'name', getLangKey()], null),
          totalSlots: 0,
          availableSlots: 0,
          itemCount: 0,
          totalPrice: 0,
          availability: 0,
        };
      }
      if (_.isEmpty(category)) {
        categoryAvailabilitiesMap[categoryId] = {
          name: _.get(marketProductCategoriesMap, [categoryId, 'name', getLangKey()], null),
          totalSlots: 0,
          availableSlots: 0,
          itemCount: 0,
          totalPrice: 0,
          availability: 0,
        };
      }
      productAvailabilitiesMap[productId].itemCount += itemCount;
      productAvailabilitiesMap[productId].totalPrice += totalPrice;
      subCategoryAvailabilitiesMap[subCategoryId].itemCount += itemCount;
      subCategoryAvailabilitiesMap[subCategoryId].totalPrice += totalPrice;
      categoryAvailabilitiesMap[categoryId].itemCount += itemCount;
      categoryAvailabilitiesMap[categoryId].totalPrice += totalPrice;

      _.forEach(supplierIds, id => {
        const supplier = supplierAvailabilitiesMap[id];
        if (_.isEmpty(supplier)) {
          supplierAvailabilitiesMap[id] = {
            name: _.get(supplierMap, [id, 'name'], null),
            totalSlots: 0,
            availableSlots: 0,
            itemCount: 0,
            totalPrice: 0,
            availability: 0,
          };
        }
        supplierAvailabilitiesMap[id].itemCount += itemCount;
        supplierAvailabilitiesMap[id].totalPrice += totalPrice;
      });
    });
  });

  _.forEach(productAvailability.products, product => {
    _.forEach(product, ({ available_slot: availableSlots = 0, total_slot: totalSlots = 0 }, productId) => {
      if (!isNullOrEmpty(marketProductMap[productId])) {
        const categoryId = _.get(marketProductMap, [productId, 'category']);
        const subCategoryId = _.get(marketProductMap, [productId, 'subCategory']);
        const supplierIds = _.get(marketProductMap, [productId, 'suppliers']);

        const item = productAvailabilitiesMap[productId];
        const subCategory = subCategoryAvailabilitiesMap[subCategoryId];
        const category = categoryAvailabilitiesMap[categoryId];

        if (_.isEmpty(item)) {
          productAvailabilitiesMap[productId] = {
            name: _.get(marketProductMap, [productId, 'fullName', getLangKey()], null),
            totalSlots: 0,
            availableSlots: 0,
            itemCount: 0,
            totalPrice: 0,
            availability: 0,
          };
        }

        if (_.isEmpty(subCategory)) {
          subCategoryAvailabilitiesMap[subCategoryId] = {
            name: _.get(marketProductMap, [productId, 'masterSubCategory', 'name', getLangKey()], null),
            totalSlots: 0,
            availableSlots: 0,
            itemCount: 0,
            totalPrice: 0,
            availability: 0,
          };
        }

        if (_.isEmpty(category)) {
          categoryAvailabilitiesMap[categoryId] = {
            name: _.get(marketProductCategoriesMap, [categoryId, 'name', getLangKey()], null),
            totalSlots: 0,
            availableSlots: 0,
            itemCount: 0,
            totalPrice: 0,
            availability: 0,
          };
        }

        productAvailabilitiesMap[productId].availableSlots += availableSlots;
        productAvailabilitiesMap[productId].totalSlots += totalSlots;
        productAvailabilitiesMap[productId].availability =
          (productAvailabilitiesMap[productId].availableSlots / productAvailabilitiesMap[productId].totalSlots) * 100;

        categoryAvailabilitiesMap[categoryId].availableSlots += availableSlots;
        categoryAvailabilitiesMap[categoryId].totalSlots += totalSlots;
        categoryAvailabilitiesMap[categoryId].availability =
          (categoryAvailabilitiesMap[categoryId].availableSlots / categoryAvailabilitiesMap[categoryId].totalSlots) * 100;

        subCategoryAvailabilitiesMap[subCategoryId].availableSlots += availableSlots;
        subCategoryAvailabilitiesMap[subCategoryId].totalSlots += totalSlots;
        subCategoryAvailabilitiesMap[subCategoryId].availability =
          (subCategoryAvailabilitiesMap[subCategoryId].availableSlots / subCategoryAvailabilitiesMap[subCategoryId].totalSlots) * 100;

        _.forEach(supplierIds, id => {
          if (!isNullOrEmpty(supplierAvailabilitiesMap[id])) {
            supplierAvailabilitiesMap[id].availableSlots += availableSlots;
            supplierAvailabilitiesMap[id].totalSlots += totalSlots;
            supplierAvailabilitiesMap[id].availability =
              (supplierAvailabilitiesMap[id].availableSlots / supplierAvailabilitiesMap[id].totalSlots) * 100;
          }
        });
      }
    });
  });

  const availabilityData = {
    productAvailability: _.values(productAvailabilitiesMap),
    categoryAvailability: _.values(categoryAvailabilitiesMap),
    subCategoryAvailability: _.values(subCategoryAvailabilitiesMap),
    supplierAvailability: _.values(supplierAvailabilitiesMap),
    totalAllPrice,
    totalAllCount,
  };

  return availabilityData;
};

export const getProductTotalsData = productAvailability => {
  const totals = {
    totalAvailabilityExceptSupplierProblem: 0,
    totalCustomerAvailability: 0,
    totalCriticalAvailability: 0,
  };

  if (_.isEmpty(productAvailability)) return totals;
  totals.totalAvailabilityExceptSupplierProblem = productAvailability.total_availability_except_supplier_problem;
  totals.totalCustomerAvailability = productAvailability.total_customer_availability;
  totals.totalCriticalAvailability = productAvailability.total_critical_availability;
  return totals;
};

export const calcFilteredTotalCount = (filteredData, searchTerm, totalAllCount) => {
  if (!searchTerm) {
    return numberFormatWithoutDecimal.format(totalAllCount);
  }
  let totalCount = 0;
  if (filteredData) {
    totalCount = _.sumBy(filteredData, 'itemCount');
  }
  return numberFormatWithoutDecimal.format(totalCount);
};

export const calcFilteredTotalPrice = (filteredData, searchTerm, totalAllPrice) => {
  if (!searchTerm) {
    return numberFormatWithoutDecimal.format(totalAllPrice);
  }
  let totalPrice = 0;
  if (filteredData) {
    totalPrice = _.sumBy(filteredData, 'totalPrice');
  }
  return numberFormatWithoutDecimal.format(totalPrice);
};

export const calcFilteredRate = (filteredData, searchTerm, totalAllPrice) => {
  if (!searchTerm) {
    return '';
  }
  const filteredRate = (_.sumBy(filteredData, 'totalPrice') / totalAllPrice);
  return percentFormatWithoutDecimal.format(filteredRate);
};

export const getRowClassName = (classes, index, record) => {
  if (record?.name === 'GETIR_FINANCED') return classes.purpleText;
  if (_.isNumber(record?.index)) return classes.tableRowPurpleBg;
  return index % 2 === 0 ? classes.tableRowLight : classes.tableRowDark;
};
