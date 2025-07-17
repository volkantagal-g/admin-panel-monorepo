import { FORM_CONTANTS } from '@app/pages/Client/Detail/components/MarketOrderTable/Filter/filterFormConstants';

export const transformData = data => {
  return data?.map(order => ({
    id: order.id,
    warehouse: order.warehouse?.warehouse,
    courier: order.courier?.courier,
    checkoutDate: order.checkout?.date,
    status: order.status,
    totalPrice: order.basket?.calculation?.totalAmount || 0,
    errors: order.checkoutErrorTexts,
    promoCode: order.promo?.applied?.[0]?.promoCode,
    domainType: order.domainType,
  }));
};

export const transformForApi = filters => {
  const values = {};
  Object.keys(filters)?.forEach(filter => {
    if (filters[filter]) values[filter] = filters[filter];
  });
  return {
    ...values,
    ...(values?.statuses && { statuses: FORM_CONTANTS.orderStatuses[values.statuses]?.value }),
  };
};
