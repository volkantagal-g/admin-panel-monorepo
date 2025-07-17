import { isNullOrEmpty } from '@shared/utils/common';

export const getOrderDetailMapCenter = ({ courier, restaurant, deliveryAddress }) => {
  if (!isNullOrEmpty(courier)) {
    return [courier?.lat, courier?.lon];
  }
  if (!isNullOrEmpty(deliveryAddress)) {
    return [deliveryAddress?.location?.coordinates[1], deliveryAddress?.location?.coordinates[0]];
  }
  if (!isNullOrEmpty(restaurant)) {
    return [restaurant?.location.lat, restaurant?.location.lon];
  }
  return [41, 29];
};

export const getFoodOrderMarkerOptions = iconImageHref => ({
  iconLayout: 'default#image',
  iconImageSize: [30, 30],
  iconImageOffset: [-15, -30],
  draggable: false,
  iconImageHref,
});
