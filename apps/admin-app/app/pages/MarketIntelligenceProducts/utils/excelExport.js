import Excel from '@shared/utils/excel';

export const exportMarketIntelligenceProducts = (data = {}) => {
  return new Excel({
    name: 'marketIntelligenceProducts',
    fields: data.fields,
    data: data.content,
  }).export();
};
