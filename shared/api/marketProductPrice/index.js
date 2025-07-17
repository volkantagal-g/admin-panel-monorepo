import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

export const getMarketProductAllPrice = ({ id, warehouseId }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/getMarketProductAllPrice',
    data: { id, warehouseId },
  }).then(({ data }) => data);
};

export const updateMarketProductPricing = ({ id, body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/updateMarketProductPricing',
    data: { id, ...body },
  }).then(({ data }) => data);
};

export const createBuyingPriceFinancials = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/createBuyingPriceFinancials',
    data: { ...body },
  }).then(({ data }) => data);
};

export const updateBuyingPriceFinancials = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/updateBuyingPriceFinancials',
    data: { ...body },
  }).then(({ data }) => data);
};

export const createSellingPriceFinancials = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/createSellingPriceFinancials',
    data: { ...body },
  }).then(({ data }) => data);
};

export const createSellingPriceDiscountedFinancials = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/createSellingPriceDiscountedFinancials',
    data: { ...body },
  }).then(({ data }) => data);
};

export const getMarketProductsPriceList = ({ limit, offset, warehouseIds, productIds, domainTypes, startDate, endDate, pricingTypes, priceOption }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/getMarketProductsPriceList',
    data: { limit, offset, warehouseIds, productIds, domainTypes, startDate, endDate, pricingTypes, priceOption },
  }).then(({ data }) => data);
};
export const updateMarketProductPrice = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/updateMarketProductPrice',
    data: { ...body },
  }).then(({ data }) => data);
};

export const updateMarketProductDiscounted = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/updateMarketProductDiscountedPrice',
    data: { ...body },
  }).then(({ data }) => data);
};

export const getMarketProductPriceDetail = ({ id }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/getMarketProductPriceDetail',
    data: { id },
  }).then(response => response.data);
};

export const getMarketProductDiscountedPriceDetail = ({ discountedPriceId }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/getMarketProductDiscountedPriceDetail',
    data: { discountedPriceId },
  }).then(response => response.data);
};

export const deletePrice = ({ priceId }) => {
  return axios({
    method: 'DELETE',
    url: '/marketProductPrice/deletePrice',
    params: { priceId },
  }).then(({ data }) => data);
};

export const deleteDiscountedPrice = ({ discountedPriceId }) => {
  return axios({
    method: 'DELETE',
    url: '/marketProductPrice/deleteDiscountedPrice',
    params: { discountedPriceId },
  }).then(({ data }) => data);
};

export const exportPricings = () => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/exportPricings',
    data: { lang: getLangKey() },
  }).then(({ data }) => data);
};

export const exportDiscountedPricings = () => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/exportDiscountedPricings',
    data: { lang: getLangKey() },
  }).then(({ data }) => data);
};

export const getSignedPricingsImportUrl = () => {
  return axios({
    method: 'GET',
    url: '/marketProductPrice/getSignedPricingsImportUrl',
  }).then(({ data }) => data);
};

export const importPricings = ({ fileName, priceType }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/importPricings',
    data: { fileName, priceType },
  }).then(({ data }) => data);
};

export const importMarketProductBuyingPrices = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/importSupplierBuyingFinancial',
    data: { fileName },
  }).then(({ data }) => data);
};

export const importMarketProductPricingMetadata = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/importPriceMetadata',
    data: { fileName },
  }).then(({ data }) => data);
};

export const exportMarketProductPricingMetadata = () => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/exportPriceMetadata',
    data: { lang: getLangKey() },
  }).then(response => {
    return response.data;
  });
};

export const updateBundleSubProductPrices = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/updateBundleSubProductPrices',
    data: { ...body },
  }).then(({ data }) => data);
};

export const updateBundleSubProductStruckPrice = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/updateBundleSubProductStruckPrice',
    data: { ...body },
  }).then(({ data }) => data);
};

export const deleteBundleStruckPrice = ({ body }) => {
  return axios({
    method: 'DELETE',
    url: '/marketProductPrice/deleteBundleStruckPrice',
    data: { ...body },
  }).then(({ data }) => data);
};

export const deleteBuyingPriceFinancials = ({ productId, supplierId }) => {
  return axios({
    method: 'DELETE',
    url: '/marketProductPrice/deleteBuyingPriceFinancials',
    data: { productId, supplierId },
  }).then(({ data }) => data);
};

export const exportMarketProductSupplierBuyingPrices = () => {
  return axios({
    method: 'POST',
    url: '/marketProductPrice/exportSupplierBuyingPrices',
    data: { lang: getLangKey() },
  }).then(response => {
    return response.data;
  });
};
