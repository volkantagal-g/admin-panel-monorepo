export const transformData = data => {
  return data?.map(order => ({
    id: order.id,
    shop: order.shop,
    courier: order.courier,
    checkoutDate: order.checkoutDate,
    status: order.status,
    totalPrice: order.totalPrice,
  }));
};
