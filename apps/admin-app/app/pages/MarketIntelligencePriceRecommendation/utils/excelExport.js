import Excel from '@shared/utils/excel';

export const exportPriceRecommendation = (data = {}) => {
  return new Excel({
    name: 'priceRecommendation',
    fields: data?.fields,
    data: data?.content,
  }).export();
};
