import { getLangKey } from '@shared/i18n';

export const mapDataForTable = (data, cityMap = {}) => {
  const langKey = getLangKey();
  if (data.length < 1) return [];
  return data.map(order => ({
    _id: order._id,
    delivery_type: order.deliveryType,
    confirmation_code: order.confirmationId,
    order_no: order.client && order.client.sucArtisanOrderCount,
    price: order.totalPrice,
    client: order.client && order.client.name,
    client_id: order.client && order.client._id,
    artisan: order.shop && order.shop.name,
    artisan_id: order.shop && order.shop._id,
    platform: order.deviceInfo && order.deviceInfo.deviceType,
    city: cityMap[order.cityId] && cityMap[order.cityId].name[langKey],
    warehouse: order.warehouse && order.warehouse.name,
    warehouse_id: order.warehouse && order.warehouse._id,
    courier: order.courier && order.courier.name,
    courier_id: order.courier && order.courier.id,
    checkout_date: order.checkoutDate,
    status: order.status,
    cancel_reason: (order.cancelReason && order.cancelReason.messages[langKey]),
  }));
};
