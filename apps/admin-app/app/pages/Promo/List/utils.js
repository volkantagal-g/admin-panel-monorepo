import { isEmpty } from 'lodash';

import { PROMO_TARGET, PromoUsageType } from '@app/pages/Promo/constantValues';
import { FlowType } from '@app/pages/Promo/types';

export const getPromosRequestBody = ({
  promoCode,
  startDate,
  endDate,
  status,
  discountReason,
  domainTypes,
  currentPage,
  rowsPerPage,
}) => {
  const requestBody = {};

  if (promoCode && !isEmpty(promoCode)) {
    requestBody.promoCode = promoCode;
  }

  if (startDate) {
    requestBody.startDate = startDate;
  }

  if (endDate) {
    requestBody.endDate = endDate;
  }

  requestBody.limit = rowsPerPage;
  requestBody.page = currentPage - 1;
  requestBody.promoUsageType = PromoUsageType.GENERAL;
  requestBody.promoTarget = PROMO_TARGET.GETIR_MARKET;
  requestBody.status = status;
  requestBody.discountReason = discountReason;
  requestBody.domainTypes = domainTypes;
  return requestBody;
};

export const getFormattedOrderCount = record => {
  if (record.flowType === FlowType.Normal) {
    return record.usedOrderCount;
  }
  if (record?.flow?.gainedOrderCount || 0 + record.orderLimitCount > 0) {
    return `/${record.orderLimitCount}`;
  }

  return '';
};
