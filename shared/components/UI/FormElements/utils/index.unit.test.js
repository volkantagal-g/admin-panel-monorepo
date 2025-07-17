import * as utils from './index';

describe('FormElements Utils', () => {
  describe('#mapOptionsData', () => {
    it('should map given array and return desired select options', () => {
      const optionsData = [{
        id: 1,
        amount: 100,
      }, {
        id: 2,
        amount: 15,
      }];
      const optionLabelProp = 'id';
      const optionValueProp = 'amount';
      const expected = [{ label: 1, value: 100 }, { label: 2, value: 15 }];

      expect(utils.mapOptionsData({
        optionsData,
        optionLabelProp,
        optionValueProp,
      })).toMatchObject(expected);
    });
  });
});
