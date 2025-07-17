import axios from '@shared/axios/common';

export const getRecommendationData = async ({ domainType, integrationType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketIntelligencePriceRecommendation/getRecommendationData',
    data: { domainType, integrationType },
    json: true,
  });
  return response.data;
};

export const getCompetitorListPriceReco = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketIntelligencePriceRecommendation/getCompetitorListPriceReco',
    data: { domainType },
    json: true,
  });
  return response.data;
};

export const getSimulateIndex = async ({ productList, competitorList, domainType, baseCompetitor, indexType, priorityList, integrationType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketIntelligencePriceRecommendation/getSimulateIndex',
    data: { productList, competitorList, domainType, baseCompetitor, indexType, priorityList, integrationType },
    json: true,
  });
  return response.data;
};

export const getPricingRulesData = async ({ domainType }) => {
  const response = await axios({
    method: 'POST',
    url: 'marketIntelligencePriceRecommendation/getPricingRulesData',
    data: { domainType },
    json: true,
  });
  return response.data;
};
