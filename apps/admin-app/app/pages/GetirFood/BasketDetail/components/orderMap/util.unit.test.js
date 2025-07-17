import { getOrderDetailMapCenter, getFoodOrderMarkerOptions } from './util';

describe('orderMap util', () => {
  describe('#getOrderDetailMapCenter', () => {
    it('should return [41, 29] for empty object', () => {
      expect(getOrderDetailMapCenter({})).toEqual([41, 29]);
    });

    it('should return courier lat lon if exists', () => {
      expect(getOrderDetailMapCenter({ courier: { lat: 25, lon: 25 } })).toEqual([25, 25]);
    });

    it('should return deliveryAddress location coordinates if exists', () => {
      expect(getOrderDetailMapCenter({ deliveryAddress: { location: { coordinates: [30, 58] } } })).toEqual([58, 30]);
    });

    it('should return restoran location if exists', () => {
      expect(getOrderDetailMapCenter({ restaurant: { location: { lat: 60, lon: 21 } } })).toEqual([60, 21]);
    });
  });

  describe('#getFoodOrderMarkerOptions', () => {
    it('should return proper marker options with given options', () => {
      const iconImageHref = 'a_login_image_url.png';
      expect(getFoodOrderMarkerOptions(iconImageHref)).toEqual({
        iconLayout: 'default#image',
        iconImageSize: [30, 30],
        iconImageOffset: [-15, -30],
        draggable: false,
        iconImageHref,
      });
    });
  });
});
