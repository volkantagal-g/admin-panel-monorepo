import axios from '@shared/axios/common';

// services managed by customer-squad
export const cancelOrder = ({ domainType, id, reasonId, reasonName, note }) => {
  return axios({
    method: 'POST',
    url: `/customer/order/${id}/cancel`,
    data: { domainType, reasonId, reasonName, note },
  }).then(response => {
    return response.data || {};
  });
};

export const getOrderCancelOptions = ({ id, domainType }) => axios({
  method: 'GET',
  url: `/customer/order/${id}/cancelOptions?domainType=${domainType}`,
}).then(response => {
  return response.data;
});

export const partialRefundOrder = ({ domainType, orderId, products, refundBagFee, refundDeliveryFee, refundServiceFee }) => {
  return axios({
    method: 'POST',
    url: `/customer/order/${orderId}/refund/partial`,
    data: { domainType, products, refundBagFee, refundDeliveryFee, refundServiceFee },
  }).then(response => {
    if (response.data?.success) {
      return response.data;
    }

    throw new Error();
  });
};

export const wholeRefundOrder = ({ warehouseId, orderId, products }) => {
  return axios({
    method: 'POST',
    url: `/customer/order/${orderId}/refund/whole`,
    data: { warehouseId, products },
  }).then(response => {
    return response.data;
  });
};

export const getWholeRefundReasons = () => axios({
  method: 'GET',
  url: '/customer/order/refund/whole/reasons',
}).then(response => {
  return response.data;
});

export const createPromo = ({
  deliveryFee,
  client,
  discountAmount,
  isBalanceEnabled,
  doNotApplyMinimumBasketSize,
  domainTypes,
  countryCode,
  title,
  validDayAmount,
}) => axios({
  method: 'POST',
  url: '/customer/promo',
  data: {
    deliveryFee,
    client,
    discountAmount,
    isBalanceEnabled,
    doNotApplyMinimumBasketSize,
    domainTypes,
    countryCode,
    title,
    validDayAmount,
  },
}).then(response => {
  return response.data;
});

export const getPromoById = ({ promoId }) => axios({
  method: 'GET',
  url: `/customer/promo/${promoId}`,
}).then(response => response.data);

export const updatePromoDates = ({ promoCode, validUntil, validFrom }) => axios({
  method: 'PUT',
  url: `/customer/promo/${promoCode}`,
  data: {
    validFrom,
    validUntil,
  },
}).then(response => response.data);

export const updatePromoStatus = ({ promoId, status }) => axios({
  method: 'PUT',
  url: `/customer/promo/${promoId}/status`,
  data: { status },
}).then(response => response.data);
