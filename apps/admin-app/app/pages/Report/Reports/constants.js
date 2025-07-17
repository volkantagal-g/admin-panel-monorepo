import moment from 'moment';

import { isEmpty } from 'lodash';

import { getBrands } from '@shared/api/brand';
import { getMarketProductCategories } from '@shared/api/marketProductCategory';
import { getCities, getCountries, getRegions } from '@shared/api/countryInfo';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getSuppliers } from '@shared/api/supplier';
import { getMarketProducts } from '@shared/api/marketProduct';
import { getFilteredWarehouses } from '@shared/api/warehouse';
import { getPromoData } from '@shared/api/promo';
import { getMarketFranchises } from '@shared/api/marketFranchise';
import { getUploadUrlForReportInputs } from '@shared/api/report';

import { getLangKey, t } from '@shared/i18n';
import { WAREHOUSE_TYPES, PROMO_STATUS, MARKET_PRODUCT_STATUS, ALL_DOMAIN_TYPES } from '@shared/shared/constants';
import { PARAMETER_TYPE } from '../constants';
import { productSegments, promoObjectiveTypes } from '@shared/shared/constantValues';

const REPORTS_DOMAIN_TYPES = ALL_DOMAIN_TYPES;

export const REPORT_FORM_MODE = {
  NEW: 'NEW',
  READONLY: 'READONLY',
};

const INIT_DOMAIN_TYPES = REPORTS_DOMAIN_TYPES.map(domainType => ({
  value: domainType,
  label: t(`global:GETIR_MARKET_DOMAIN_TYPES.${domainType}`),
}));

const INIT_WAREHOUSE_TYPES = WAREHOUSE_TYPES.map(type => ({
  value: type,
  label: t(`global:WAREHOUSE_TYPES.${type}`),
}));

const INIT_PRODUCT_SEGMETNS = Object.entries(productSegments).map(([value, name]) => ({ value, label: name[getLangKey()] }));

async function initProducts() {
  const body = {
    fields: ['category', 'subCategory', 'fullName', 'status', 'suppliers'],
    populate: [],
    limit: null,
    offset: null,
  };

  const supplyFieldsPopulateOptions = {
    isPopulationNeeded: true,
    fields: ['segments', 'brandId'],
  };
  const promises = [
    getMarketProducts({
      ...body,
      statusList: ['ACTIVE'],
      useAPIGatewayCache: true,
      shouldGetSuppliersAndManufacturerFromNewPricingService: true,
      supplyFieldsPopulateOptions,
    }),
    getMarketProducts({
      ...body,
      statusList: ['INACTIVE'],
      supplyFieldsPopulateOptions,
      shouldGetSuppliersAndManufacturerFromNewPricingService: true,
      useAPIGatewayCache: true,
    }),
    getMarketProducts({
      ...body,
      statusList: ['ARCHIVED'],
      supplyFieldsPopulateOptions,
      shouldGetSuppliersAndManufacturerFromNewPricingService: true,
      useAPIGatewayCache: true,
    }),
  ];
  const [actives, inactives, archiveds] = await Promise.all(promises);
  return [...actives, ...inactives, ...archiveds];
}

function mapProducts(products) {
  return products.map(product => ({ value: product._id, label: product.fullName?.[getLangKey()] }));
}

async function initPromos() {
  const result = await getPromoData();
  return result;
}

function mapPromos(promos) {
  return promos.map(promo => ({ value: promo._id, label: promo.promoCode }));
}

async function initSuppliers() {
  const result = await getSuppliers({ limit: null, offset: null });
  return result.suppliers;
}

function mapSuppliers(suppliers) {
  return suppliers.map(supplier => ({ value: supplier._id, label: supplier.name }));
}

const initPromoObjectives = Object.entries(promoObjectiveTypes).map(([value, name]) => ({ value, label: name[getLangKey()] }));

async function initWarehouses() {
  const result = await getFilteredWarehouses({ fields: 'name city region domainTypes warehouseType' });
  return result.warehouses;
}

function mapWarehouses(warehouses) {
  return warehouses.map(warehouse => ({ value: warehouse._id, label: warehouse.name }));
}

function getMinMaxDateOptions(param) {
  if (param?.includeCurrentDay) {
    return [null, moment().endOf('day')];
  }
  if (param?.isFutureDatesEnabled) {
    return [null, null];
  }
  return [null, moment().startOf('day')];
}

export const getAllSpecialConfigs = (param, translation, classes) => ({
  [PARAMETER_TYPE.boolean]: { inputType: 'checkbox' },
  [PARAMETER_TYPE.brand]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initBrands,
    mapSelectablesToOptions: mapBrands,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
  },
  [PARAMETER_TYPE.category]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initCategories,
    mapSelectablesToOptions: mapCategories,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
  },
  [PARAMETER_TYPE.city]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initCities,
    mapSelectablesToOptions: mapCities,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
  },
  // any country field will be forced to have panel login country selected
  // we also make sure that it is panel country in the api-gw
  [PARAMETER_TYPE.country]: {
    disabled: true,
    inputType: 'select',
    mode: 'multiple',
    initialSelectables: initCountries,
    mapSelectablesToOptions: mapCountries,
  },
  [PARAMETER_TYPE.csvArrayOfObject]: {
    inputType: 'csvArrayOfObjects',
    exampleCsv: { 'fieldName1, fieldName2, ...': 'value1, value2, ...' },
  },
  [PARAMETER_TYPE.date]: {
    inputType: 'date',
    minMaxDate: getMinMaxDateOptions(param),
  },
  [PARAMETER_TYPE.dateRange]: { inputType: 'dateRange' },
  [PARAMETER_TYPE.domainType]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: INIT_DOMAIN_TYPES,
  },
  [PARAMETER_TYPE.dropdown]: {
    inputType: 'select',
    mode: param.isMultiSelect ? 'multiple' : 'single',
    initialSelectables: param?.dropdownOptions?.map(option => ({ value: option.optionValue, label: option.optionName })),
  },
  [PARAMETER_TYPE.franchise]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initFranchises,
    mapSelectablesToOptions: mapFranchises,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
    childFilterConfigs: [
      {
        fieldName: `${param.variableName}_isactived`,
        label: `${translation('global:ONLY')} ${translation('global:ACTIVES')}`,
        inputType: 'checkbox',
        className: classes.formItem,
        formItemWrapperClassName: '',
        filterParentSelectables: filterFranchisesByActives,
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
    ],
  },
  [PARAMETER_TYPE.manufacturer]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initSuppliers,
    mapSelectablesToOptions: mapSuppliers,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
  },
  [PARAMETER_TYPE.number]: { inputType: 'number' },
  [PARAMETER_TYPE.product]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initProducts,
    mapSelectablesToOptions: mapProducts,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
    childFilterConfigs: [
      {
        fieldName: `${param.variableName}_categories`,
        label: translation('marketProductPage:CATEGORIES'),
        inputType: 'select',
        mode: 'multiple',
        className: classes.formItem,
        formItemWrapperClassName: '',
        showSelectAll: true,
        showCsvImport: true,
        exampleCsv: { id: 'Object Id' },
        csvItemToFieldValueFormatter: data => data.id,
        initialSelectables: initCategories,
        mapSelectablesToOptions: mapCategories,
        filterParentSelectables: filterProductsGivenCategoryIds,
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
      {
        fieldName: `${param.variableName}_subCategories`,
        label: translation('marketProductPage:SUB_CATEGORIES'),
        inputType: 'select',
        mode: 'multiple',
        className: classes.formItem,
        formItemWrapperClassName: '',
        showSelectAll: true,
        showCsvImport: true,
        exampleCsv: { id: 'Object Id' },
        csvItemToFieldValueFormatter: data => data.id,
        initialSelectables: initSubCategories,
        mapSelectablesToOptions: mapSubCategories,
        filterParentSelectables: filterProductsGivenSubCategoryIds,
        setRelatedFieldUsingValues: resetMultiplySelect,
        siblingFilterConfigs: [
          {
            filteredBy: `${param.variableName}_categories`,
            filterSiblingSelectables: filterSubCategoriesGivenCategories,
            setRelatedFieldUsingSelectables: selectAllSelectables,
          },
        ],
      },
      {
        fieldName: `${param.variableName}_supplier`,
        label: translation('marketProductPage:SUPPLIERS'),
        inputType: 'select',
        mode: 'multiple',
        className: classes.formItem,
        formItemWrapperClassName: '',
        showSelectAll: true,
        showCsvImport: true,
        exampleCsv: { id: 'Object Id' },
        csvItemToFieldValueFormatter: data => data.id,
        initialSelectables: initSuppliers,
        mapSelectablesToOptions: mapSuppliers,
        filterParentSelectables: filterProductsGivenSuppliers,
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
      {
        fieldName: `${param.variableName}_segments`,
        label: translation('marketProductPage:GENERAL_INFO.SEGMENTS'),
        inputType: 'select',
        mode: 'multiple',
        className: classes.formItem,
        formItemWrapperClassName: '',
        showSelectAll: true,
        initialSelectables: INIT_PRODUCT_SEGMETNS,
        filterParentSelectables: filterProductsGivenSegments,
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
      {
        fieldName: `${param.variableName}_inactive`,
        label: translation('reportsPage:HIDE_INACTIVES'),
        inputType: 'checkbox',
        className: classes.formItem,
        formItemWrapperClassName: '',
        filterParentSelectables: (products, hideInactives) => {
          if (hideInactives) return products.filter(product => product.status !== MARKET_PRODUCT_STATUS.INACTIVE);
          return products;
        },
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
      {
        fieldName: `${param.variableName}_archived`,
        label: translation('reportsPage:HIDE_ARCHIVEDS'),
        inputType: 'checkbox',
        className: classes.formItem,
        formItemWrapperClassName: '',
        filterParentSelectables: (products, hideArchiveds) => {
          if (hideArchiveds) return products.filter(product => product.status !== MARKET_PRODUCT_STATUS.ARCHIVED);
          return products;
        },
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
    ],
  },
  [PARAMETER_TYPE.promo]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initPromos,
    mapSelectablesToOptions: mapPromos,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
    childFilterConfigs: [
      {
        fieldName: `${param.variableName}_active`,
        label: `${translation('global:ONLY')} ${translation('global:ACTIVES')}`,
        inputType: 'checkbox',
        className: classes.formItem,
        formItemWrapperClassName: '',
        filterParentSelectables: (promos, isActive) => {
          if (isActive) return promos.filter(promo => promo.status === PROMO_STATUS.ACTIVE);
          return promos;
        },
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
    ],
  },
  [PARAMETER_TYPE.promoObjectiveType]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initPromoObjectives,
  },
  [PARAMETER_TYPE.string]: { inputType: 'text' },
  [PARAMETER_TYPE.subCategory]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initSubCategories,
    mapSelectablesToOptions: mapSubCategories,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
  },
  [PARAMETER_TYPE.supplier]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initSuppliers,
    mapSelectablesToOptions: mapSuppliers,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
  },
  [PARAMETER_TYPE.warehouse]: {
    inputType: 'select',
    mode: 'multiple',
    showSelectAll: true,
    initialSelectables: initWarehouses,
    mapSelectablesToOptions: mapWarehouses,
    showCsvImport: true,
    exampleCsv: { id: 'Object Id' },
    csvItemToFieldValueFormatter: data => data.id,
    childFilterConfigs: [
      {
        fieldName: `${param.variableName}_cities`,
        label: translation('global:CITIES'),
        inputType: 'select',
        mode: 'multiple',
        className: classes.formItem,
        formItemWrapperClassName: '',
        showSelectAll: true,
        showCsvImport: true,
        exampleCsv: { id: 'Object Id' },
        csvItemToFieldValueFormatter: data => data.id,
        initialSelectables: initCities,
        mapSelectablesToOptions: mapCities,
        filterParentSelectables: filterWarehousesGivenCities,
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
      {
        fieldName: `${param.variableName}_regions`,
        label: translation('global:REGIONS'),
        inputType: 'select',
        mode: 'multiple',
        className: classes.formItem,
        formItemWrapperClassName: '',
        showSelectAll: true,
        showCsvImport: true,
        exampleCsv: { id: 'Object Id' },
        csvItemToFieldValueFormatter: data => data.id,
        initialSelectables: initRegions,
        mapSelectablesToOptions: mapRegions,
        filterParentSelectables: filterWarehousesGivenRegions,
        setRelatedFieldUsingValues: resetMultiplySelect,
        siblingFilterConfigs: [
          {
            filteredBy: `${param.variableName}_cities`,
            filterSiblingSelectables: filterRegionsByCities,
            setRelatedFieldUsingSelectables: selectAllSelectables,
          },
        ],
      },
      {
        fieldName: `${param.variableName}_domainType`,
        label: translation('global:DOMAIN_TYPES'),
        inputType: 'select',
        mode: 'multiple',
        className: classes.formItem,
        formItemWrapperClassName: '',
        showSelectAll: true,
        exampleCsv: { id: 'Object Id' },
        csvItemToFieldValueFormatter: data => data.id,
        initialSelectables: INIT_DOMAIN_TYPES,
        filterParentSelectables: filterWarehousesGivenDomainTypes,
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
      {
        fieldName: `${param.variableName}_warehouseType`,
        label: translation('global:WAREHOUSE_TYPE_PLURAL'),
        inputType: 'select',
        mode: 'multiple',
        className: classes.formItem,
        formItemWrapperClassName: '',
        showSelectAll: true,
        exampleCsv: { id: 'Object Id' },
        csvItemToFieldValueFormatter: data => data.id,
        initialSelectables: INIT_WAREHOUSE_TYPES,
        filterParentSelectables: filterWarehousesGivenWarehouseTypes,
        setRelatedFieldUsingValues: resetMultiplySelect,
      },
    ],
  },
  [PARAMETER_TYPE.s3CsvUpload]: {
    inputType: 's3Upload',
    getSignedUrlApi: ({ fileName, contentType }) => getUploadUrlForReportInputs({ fileName, contentType }),
    fileName: `${param.name.en}_${param.variableName}`,
  },
  // not supported anymore
  [PARAMETER_TYPE.store]: {
    disabled: true,
    inputType: 'select',
    mode: 'multiple',
    initialSelectables: [],
    mapSelectablesToOptions: x => x,
  },
});

export const getDynamicFormConfigsFromReportType = (reportType, translation, isReadonly, classes) => {
  const configs = [];

  reportType.parameters.forEach(param => {
    let config = {
      fieldName: param.variableName,
      label: param.name[getLangKey()],
      placeholder: param.name[getLangKey()],
      readOnly: isReadonly,
      className: classes.formItem,
    };
    const staticConfigs = getAllSpecialConfigs(param, translation, classes)[param.type];

    config = { ...config, ...staticConfigs };
    configs.push(config);
  });

  return configs;
};

const getMapFromArray = arr => {
  return arr.reduce((accum, cat) => {
    // eslint-disable-next-line no-param-reassign
    accum[cat] = true;
    return accum;
  }, {});
};

async function initBrands() {
  const result = await getBrands({ limit: null, offset: null });
  return result;
}

function mapBrands(brands) {
  return brands.map(brand => ({ value: brand._id, label: brand.name }));
}

async function initFranchises() {
  const result = await getMarketFranchises({ fields: 'name isActivated', populate: [] });
  return result.franchises;
}

function mapFranchises(franchises) {
  return franchises.map(franchise => ({ value: franchise._id, label: franchise.name }));
}

function filterFranchisesByActives(franchises, isActive) {
  if (isActive) return franchises.filter(franchise => franchise.isActivated);
  return franchises;
}

async function initCities() {
  const selectedCountryId = getSelectedCountry()._id;
  return getCities({ countryId: selectedCountryId });
}
function mapCities(cities) {
  return cities.map(city => ({ value: city._id, label: city.name[getLangKey()] }));
}

async function initRegions() {
  const selectedCountryId = getSelectedCountry()._id;
  return getRegions({ countryId: selectedCountryId });
}
function mapRegions(regions) {
  return regions.map(r => ({ value: r._id, label: r.name[getLangKey()] }));
}

function filterRegionsByCities(regions, cities) {
  if (isEmpty(cities)) return regions;
  const cMap = getMapFromArray(cities);
  return regions.filter(reg => cMap[reg.city]);
}

async function initCategories() {
  const result = await getMarketProductCategories({ isSubCategory: false, limit: null, offset: null });
  return result;
}

function mapCategories(categories) {
  return categories.map(category => ({ value: category._id, label: category.name[getLangKey()] }));
}

function filterProductsGivenCategoryIds(products, categoryIds) {
  if (isEmpty(categoryIds)) return products;
  const categoryMap = getMapFromArray(categoryIds);
  return products.filter(product => !!categoryMap[product?.category]);
}

function filterProductsGivenSubCategoryIds(products, subCategoryIds) {
  if (isEmpty(subCategoryIds)) return products;
  const subCategoryMap = getMapFromArray(subCategoryIds);
  return products.filter(product => !!subCategoryMap[product.subCategory]);
}

function filterProductsGivenSegments(products, segments) {
  if (isEmpty(segments)) return products;
  const segmentMap = getMapFromArray(segments);
  return products.filter(product => product?.logisticSupplyInfo?.segments?.some(segment => segmentMap[segment]));
}

function filterProductsGivenSuppliers(products, suppliers) {
  if (isEmpty(suppliers)) return products;
  const segmentMap = getMapFromArray(suppliers);
  return products.filter(product => product.suppliers?.some(supplier => segmentMap[supplier]));
}

function filterSubCategoriesGivenCategories(subCategories, categories) {
  if (isEmpty(categories)) return subCategories;
  const categoriesMap = getMapFromArray(categories);
  return subCategories.filter(sc => categoriesMap[sc?.parent?._id]);
}

function filterWarehousesGivenCities(warehouses, cityIds) {
  if (isEmpty(cityIds)) return warehouses;
  const cityMap = getMapFromArray(cityIds);
  return warehouses.filter(w => cityMap[w?.city]);
}

function filterWarehousesGivenRegions(warehouses, regionIds) {
  if (isEmpty(regionIds)) return warehouses;
  const rMap = getMapFromArray(regionIds);
  return warehouses.filter(w => rMap[w?.region]);
}

function filterWarehousesGivenDomainTypes(warehouses, domainTypes) {
  if (isEmpty(domainTypes)) return warehouses;
  const dMap = getMapFromArray(domainTypes);
  return warehouses.filter(w => w.domainTypes.some(d => dMap[d]));
}
function filterWarehousesGivenWarehouseTypes(warehouses, warehouseTypes) {
  if (isEmpty(warehouseTypes)) return warehouses;
  const wMap = getMapFromArray(warehouseTypes);
  return warehouses.filter(w => wMap[w.warehouseType]);
}

async function initSubCategories() {
  const result = await getMarketProductCategories({ isSubCategory: true, parent: null, limit: null, offset: null });
  return result;
}

function mapSubCategories(subCategories) {
  return subCategories.map(subCategory => ({ value: subCategory._id, label: subCategory.name[getLangKey()] }));
}

async function initCountries() {
  const result = await getCountries();
  return result;
}

function mapCountries(countries) {
  return countries.map(country => ({ value: country._id, label: country.name[getLangKey()] }));
}

export const REPORT_STATUS = {
  100: {
    en: 'Preparing',
    tr: 'Hazırlanıyor',
  },
  200: {
    en: 'Ready',
    tr: 'Hazır',
  },
  300: {
    en: 'Failed',
    tr: 'Başarısız',
  },
};

export const REPORT_DATE_FORMAT = 'YYYY-MM-DD';

function resetMultiplySelect() {
  return [];
}

function selectAllSelectables(selectables, filters) {
  // reset
  if (isEmpty(filters)) return [];
  return selectables;
}
