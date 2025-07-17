import axios from '@shared/axios/common';
import { getLangKey } from '@shared/i18n';

export const createAndDeleteLimit = ({ body }) => {
  return axios({
    method: 'POST',
    url: '/pricingRuleset/createAndDeleteLimit',
    data: body,
  }).then(response => {
    return response.data;
  });
};
export const createTier = ({ name, operationType, value, isEnabled, segmentIds }) => {
  return axios({
    method: 'POST',
    url: '/pricingRuleset/createTier',
    data: { name, operationType, value, isEnabled, segmentIds },
  }).then(response => {
    return response.data;
  });
};

export const updateLimit = ({ id, body }) => {
  return axios({
    method: 'PATCH',
    url: `/pricingRuleset/updateLimit/${id}`,
    data: { ...body },
  }).then(response => {
    return response.data;
  });
};

export const getLimitAndWarehouses = ({ id }) => {
  return axios({
    method: 'GET',
    url: `/pricingRuleset/getLimitsAndWarehouses/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const getTier = ({ id }) => {
  return axios({
    method: 'GET',
    url: `/pricingRuleset/getTier/${id}`,
  }).then(response => {
    return response.data;
  });
};

export const exportWarehouseLimits = () => {
  const langKey = getLangKey();
  return axios({
    method: 'POST',
    url: '/pricingRuleset/exportWarehouseLimits',
    data: { lang: langKey },
  }).then(response => {
    return response.data;
  });
};
export const getTierList = ({
  id,
  limit,
  name,
  page,
  segmentIds,
  sort,
}) => {
  return axios({
    method: 'GET',
    url: '/pricingRuleset/getTierList',
    params: {
      id,
      limit,
      name,
      page,
      segmentIds,
      sort,
    },
  }).then(response => {
    return response.data;
  });
};
export const updateTier = ({ id, name, operationType, value, isEnabled, segmentIds }) => {
  return axios({
    method: 'PATCH',
    url: `/pricingRuleset/updateTier/${id}`,
    data: { name, operationType, value, isEnabled, segmentIds },
  }).then(response => {
    return response.data;
  });
};
export const getSignedPricingRulesetTierPricingImportUrl = () => {
  return axios({
    method: 'GET',
    url: '/pricingRuleset/getSignedPricingRulesetTierPricingImportUrl',
  }).then(response => {
    return response.data;
  });
};
export const importPricingRulesetTierPricing = ({ fileName }) => {
  return axios({
    method: 'POST',
    url: '/pricingRuleset/importPricingRulesetTierPricing',
    data: { fileName },
  }).then(response => {
    return response.data;
  });
};
