import { formatPromoCode, getOrderMarkerSrc } from './utils';

import motoMarker from '@shared/assets/markers/marker_moto_red_on_green.png';
import botMarker from '@shared/assets/images/bot-icon.png';
import getirDeliveryMarker from '@shared/assets/images/food-getir-delivery-icon.png';
import motoPartTimeMarker from '@shared/assets/markers/marker_moto_parttime_primary.png';
import restaurantDeliveryMarker from '@shared/assets/images/food-restaurant-delivery-icon.png';
import onFootMarker from '@shared/assets/markers/marker_onfoot_yellow.png';
import vanMarker from '@shared/assets/markers/marker_van_green.png';
import vanWaterMarker from '@shared/assets/markers/marker_van_water_green.png';
import mituMarker from '@shared/assets/markers/marker_mitu_green.png';

describe('Test Utils', () => {
  it('should format the promo code according to max limit', () => {
    expect(formatPromoCode()).toBeNull();
    expect(formatPromoCode('NEW_PROMO')).toBe('NEW_PROMO');
    expect(formatPromoCode('NEW_LONG_PROMO_CODE_TO_TRIMOUT')).toBe('NEW_LONG_PROMO_CODE_TO...');
  });

  test('get order marker src should return correct markers', () => {
    expect(getOrderMarkerSrc({ getirCouriersBusyOnCheckout: true })).toBe(motoMarker);

    expect(getOrderMarkerSrc({ isBot: true, courier: true })).toBe(botMarker);

    expect(getOrderMarkerSrc({
      courier: { courierType: 9, workType: 1 },
      deliveryType: 1,
    })).toBe(getirDeliveryMarker);

    expect(getOrderMarkerSrc({
      courier: { courierType: 9, workType: 2 },
      deliveryType: 1,
    })).toBe(motoPartTimeMarker);

    expect(getOrderMarkerSrc({
      courier: { courierType: 2 },
      deliveryType: 2,
    })).toBe(restaurantDeliveryMarker);

    expect(getOrderMarkerSrc({ courier: { courierType: 3 } })).toBe(onFootMarker);
    expect(getOrderMarkerSrc({ courier: { courierType: 5 } })).toBe(vanMarker);
    expect(getOrderMarkerSrc({ courier: { courierType: 6 } })).toBe(vanWaterMarker);
    expect(getOrderMarkerSrc({ courier: { courierType: 7 } })).toBe(mituMarker);
  });
});
