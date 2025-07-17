import { FORM_CONTANTS } from '@app/pages/Client/Detail/components/MarketOrderTable/Filter/filterFormConstants';

export const transformData = data => {
  return data?.map(order => ({
    id: order.id,
    warehouse: order.warehouse?.warehouse,
    courier: order.courier?.courier,
    checkoutDate: order.checkout?.date,
    status: order.status,
    totalPrice: order.basket?.products?.reduce((prev, curr) => prev + curr?.price, 0),
    errors: order.checkoutErrorTexts,
    promo: order.promo?.promoCode,
  }));
};

export const transformForApi = filters => {
  return {
    ...filters,
    ...(filters?.statuses && { statuses: FORM_CONTANTS.orderStatuses[filters.statuses]?.value }),
  };
};