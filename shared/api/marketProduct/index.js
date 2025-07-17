import { isEmpty, isFinite } from 'lodash';

import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';
import { getUser } from '@shared/redux/selectors/auth';

export const getMarketProducts = ({
  limit,
  offset,
  queryText,
  filterOptions,
  statusList,
  fields = [],
  ids = [],
  populate,
  hasTotalCount,
  supplyFieldsPopulateOptions,
  useAPIGatewayCache = false,
  shouldGetSuppliersAndManufacturerFromNewPricingService,
  excludeIds,
  isVisible,
}) => {
  const data = {
    statusList,
    filterOptions,
    populate,
    hasTotalCount,
    shouldGetSuppliersAndManufacturerFromNewPricingService,
    ...(queryText?.length ? { queryText } : undefined),
    ...(ids?.length ? { ids } : undefined),
    ...(supplyFieldsPopulateOptions ? { supplyFieldsPopulateOptions } : undefined),
    ...(excludeIds ? { excludeIds } : undefined),
    ...(isVisible !== undefined ? { isVisible } : undefined),
  };
  if (!isEmpty(fields)) {
    data.fields = fields.join(' ');
  }
  if (isFinite(limit)) {
    data.limit = limit;
  }
  if (isFinite(offset)) {
    data.offset = offset;
  }
  return axios({
    method: 'POST',
    url: '/marketProduct/getMarketProducts',
    headers: { 'x-use-api-gw-cache': useAPIGatewayCache },
    data,
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductWithCategoryPositions = ({ id, populate }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getMarketProductWithCategoryPositions',
    data: { id, populate },
  }).then(response => {
    return response.data;
  });
};

export const createMarketProduct = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/createMarketProduct',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateMarketProduct = ({ id, body: updateData }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/updateMarketProduct',
    data: { id, updateData },
  }).then(response => {
    return response.data;
  });
};

export const getDomainPrices = () => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getDomainPrices',
  }).then(response => {
    return response.data;
  });
};

export const updateDomainPricesBulk = ({ domainPrices }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/updateDomainPricesBulk',
    data: { domainPrices },
  }).then(response => {
    return response.data;
  });
};

export const createMarketProductImageUrl = ({ extension }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/createMarketProductImageUrl',
    data: { extension },
  }).then(response => {
    return response.data;
  });
};

export const getProductsOfSubCategory = ({ categoryId, subCategoryId }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getProductsOfSubCategory',
    data: { categoryId, subCategoryId },
  }).then(response => {
    return response.data;
  });
};

export const updateMarketCategoryPosition = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/updateMarketCategoryPosition',
    data,
  }).then(response => {
    return response.data;
  });
};

export const updateMainCategory = ({ body: data }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/updateMainCategory',
    data,
  }).then(response => {
    return response.data;
  });
};

export const getProductPositionsByCategory = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getProductPositionsByCategory',
    data: { id },
  }).then(response => {
    return response.data;
  });
};

export const updateProductPositionsBulk = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/updateProductPositionsBulk',
    data: body,
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductFeedData = ({ productId }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getMarketProductFeedData',
    data: { productId },
  }).then(response => {
    return response.data;
  });
};

export const getMarketProductsByIds = ({ productIds, warehouseId }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getMarketProductsByIds',
    data: { productIds, warehouseId },
  }).then(response => {
    return response.data;
  });
};

export const getSignedMarketProductDomainLimitsImportUrl = () => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getSignedMarketProductDomainLimitsImportUrl',
  }).then(response => {
    return response.data;
  });
};

export const importMarketProductDomainLimits = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/importMarketProductDomainLimits',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};

export const exportMarketProductDomainLimits = () => {
  return axios({
    method: 'POST',
    url: '/marketProduct/exportMarketProductDomainLimits',
    data: { lang: getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const getSignedMarketProductDetailsImportUrl = () => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getSignedMarketProductDetailsImportUrl',
  }).then(response => {
    return response.data;
  });
};

export const importMarketProductDetails = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/importMarketProductDetails',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};

export const exportMarketProductDetails = () => {
  const userEmail = getUser()?.email;
  return axios({
    method: 'POST',
    url: '/marketProduct/exportMarketProductDetails',
    data: { lang: getLangKey(), userEmail },
  }).then(response => {
    return response.data;
  });
};

export const getSignedMarketProductAdditionalTablesImportUrl = () => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getSignedMarketProductAdditionalTablesImportUrl',
  }).then(response => {
    return response.data;
  });
};

export const importMarketProductAdditionalTables = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/importMarketProductAdditionalTables',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};

export const exportMarketProductAdditionalTables = () => {
  const userEmail = getUser()?.email;
  return axios({
    method: 'POST',
    url: '/marketProduct/exportMarketProductAdditionalTables',
    data: { lang: getLangKey(), userEmail },
  }).then(response => {
    return response.data;
  });
};

export const getSignedMarketProductCategoryPositionsImportUrl = () => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getSignedMarketProductCategoryPositionsImportUrl',
  }).then(response => {
    return response.data;
  });
};

export const importMarketProductCategoryPositions = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/importMarketProductCategoryPositions',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};

export const exportMarketProductCategoryPositions = () => {
  return axios({
    method: 'POST',
    url: '/marketProduct/exportMarketProductCategoryPositions',
    data: { lang: getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const exportMarketProductSupplyAndLogistic = () => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/exportSupplies',
    data: { lang: getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const getSignedMarketProductSupplyAndLogisticImportUrl = () => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/getSignedLogisticsImportUrl',
  }).then(response => {
    return response.data;
  });
};

export const importMarketProductSupplyAndLogistic = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/supplyLogistic/importSupplies',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};

export const getProductActivationValidationErrors = ({ ids }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getProductActivationValidationErrors',
    data: { ids, lang: getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const assignFamilyToProduct = ({ productId, familyId }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/assignFamilyToProduct',
    data: { productId, familyId },
  }).then(({ data }) => data);
};

export const getSignedMarketProductTogglesImportUrl = () => {
  return axios({
    method: 'POST',
    url: '/marketProduct/getSignedMarketProductTogglesImportUrl',
  }).then(response => {
    return response.data;
  });
};

export const importMarketProductToggles = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/marketProduct/importMarketProductToggles',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};
