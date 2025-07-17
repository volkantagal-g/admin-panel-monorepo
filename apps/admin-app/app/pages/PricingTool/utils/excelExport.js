import Excel from '@shared/utils/excel';

export const exportPricingTool = (data = {}) => {
  return new Excel({
    name: 'pricingTool',
    fields: data.fields,
    data: data.content,
  }).export();
};
