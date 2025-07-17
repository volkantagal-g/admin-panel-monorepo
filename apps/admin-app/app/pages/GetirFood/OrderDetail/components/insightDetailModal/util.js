import { get, has } from 'lodash';

import { feedbackSourceTypes, refundTypeMap, foodRefundSourceMap } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

export const populateInsight = ({ orderDetail, selectedInsight }) => {
  let inspect = {};
  const prodMap = {};
  orderDetail?.products?.forEach(product => {
    prodMap[product._id] = product;
  });
  const refundList = [];
  if (has(selectedInsight, ['refund', 'products'])) {
    selectedInsight?.refund?.products?.forEach(product => {
      const newProd = {};
      const productObject = prodMap[product.id];
      newProd.price = get(productObject, 'discountedPriceWithOption');
      if (has(product, 'count')) {
        newProd.amount = get(productObject, 'discountedPriceWithOption');
        newProd.name = get(productObject, 'name');
        newProd.isFullRefund = true;
      }
      else if (has(product, 'amount')) {
        newProd.name = get(productObject, 'name');
        newProd.amount = get(product, 'amount');
      }
      refundList.push(newProd);
    });
  }
  const feedbackChannel = get(selectedInsight, 'channel');
  const sourceName = get(feedbackSourceTypes, [feedbackChannel, getLangKey()], '');
  const selectedMainReason = get(selectedInsight, ['mainReason', 'name', getLangKey()], '');
  const selectedSubReason = get(selectedInsight, ['subReason', 'name', getLangKey()], '');
  inspect = {
    ...selectedInsight,
    sourceName,
    selectedMainReason,
    selectedSubReason,
  };
  const refundType = get(inspect, ['refund', 'refundType'], '');
  const refundSource = get(inspect, ['refund', 'source'], '');
  if (inspect.refund) {
    inspect.refund.sourceString = get(foodRefundSourceMap, [refundSource, getLangKey()], '');
    inspect.refund.refundTypeString = get(refundTypeMap, [refundType, getLangKey()], '');
  }
  return {
    refundList,
    inspect,
  };
};
