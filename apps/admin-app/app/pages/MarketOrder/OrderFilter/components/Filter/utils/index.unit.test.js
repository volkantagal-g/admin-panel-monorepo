import { getDeviceTypes, getFormattedSelectOptions } from '.';

describe('Order filter util', () => {
  describe('#getDeviceTypes', () => {
    it('should return empty array if there are no selected platforms', () => {
      const deviceTypes = getDeviceTypes();
      expect(deviceTypes).toEqual([]);
    });

    it('should return mobile device types', () => {
      const deviceTypes = getDeviceTypes(['1']);
      expect(deviceTypes).toEqual(['Android', 'iPhone']);
    });

    it('should return web device types', () => {
      const deviceTypes = getDeviceTypes(['2']);
      expect(deviceTypes).toEqual(['Web']);
    });
  });
  describe('#getFormattedSelectOptions', () => {
    const mockedObjectMap = { name: { en: 'Getir', tr: 'getir' } };
    it('should return the corrrent refund amount', () => {
      const selectOptions = getFormattedSelectOptions(mockedObjectMap);
      expect(selectOptions).toMatchObject([{ value: 'name' }]);
    });
  });
});
