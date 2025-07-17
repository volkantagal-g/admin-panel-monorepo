import Excel from '@shared/utils/excel';

export const exportMarketIntelligencePriceIndex = (data = {}) => {
  return new Excel({
    name: 'marketIntelligencePriceIndex',
    fields: data.fields,
    data: data.content,
  }).export();
};
