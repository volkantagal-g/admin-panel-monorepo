import _isNumber from 'lodash/isNumber';

import * as utils from './utils';
import { CONFIG_TYPES } from '@app/pages/Config/constants';
import {
  numberMockedConfig,
  objectMockedConfig,
  booleanMockedConfig,
  stringMockedConfig,
  arrayMockedConfig,
} from '@shared/api/marketConfig/index.mock.data';

describe('Config List Page -  Utils', () => {
  describe('#getDefaultValueByType', () => {
    it('should work without failing when BOOLEAN type in param', () => {
      expect(utils.getDefaultValueByType({ type: CONFIG_TYPES.BOOLEAN })).toStrictEqual(false);
    });
    it('should work without failing when OBJECT type in param', () => {
      expect(utils.getDefaultValueByType({ type: CONFIG_TYPES.OBJECT })).toStrictEqual({});
    });
    it('should work without failing when ARRAY type in param', () => {
      expect(utils.getDefaultValueByType({ type: CONFIG_TYPES.ARRAY })).toStrictEqual([]);
    });
    it('should work without failing when STRING type in param', () => {
      expect(utils.getDefaultValueByType({ type: CONFIG_TYPES.STRING })).toStrictEqual(undefined);
    });
    it('should return undefined as no type param sent', () => {
      expect(utils.getDefaultValueByType({})).toStrictEqual(undefined);
    });
  });
  describe('#getFormattedInputValue', () => {
    it('should work without failing when config is in STRING type', () => {
      const { value: stringMockedValue } = stringMockedConfig;
      expect(utils.getFormattedInputValue({ ...stringMockedConfig })).toStrictEqual(stringMockedValue);
    });
    it('should work without failing when config is in BOOLEAN type', () => {
      const { value: booleanMockedValue } = booleanMockedConfig;
      expect(utils.getFormattedInputValue({ ...booleanMockedConfig })).toStrictEqual(booleanMockedValue);
    });
    it('should work without failing when config is in NUMBER type', () => {
      const { value: numberMockedValue } = numberMockedConfig;
      expect(utils.getFormattedInputValue({ ...numberMockedConfig })).toStrictEqual(_isNumber(numberMockedValue) && parseFloat(numberMockedValue));
    });
    it('should work without failing when config is in OBJECT type', () => {
      const { value: objectMockedValue } = objectMockedConfig;
      expect(utils.getFormattedInputValue({ ...objectMockedConfig })).toStrictEqual(JSON.stringify(objectMockedValue));
    });
    it('should work without failing when config is in ARRAY type', () => {
      const { value: arrayMockedValue } = arrayMockedConfig;
      expect(utils.getFormattedInputValue({ ...arrayMockedConfig })).toStrictEqual(JSON.stringify(arrayMockedValue));
    });
    it('should throw ERROR when required params are not met', () => {
      const typeBrokenConfig = { ...stringMockedConfig }; // select a random one
      typeBrokenConfig.type = 'test'; // and manipulate its type
      // doc ref: You must wrap the code in a function, otherwise the error will not be caught and the assertion will fail.
      expect(() => {
        utils.getFormattedInputValue({ ...typeBrokenConfig });
      }).toThrow();
      // expect(utils.getFormattedInputValue({ ...typeBrokenConfig })).toThrow(/\/Unexpected configuration value\//);
    });
  });
  describe('#getTableChildrenFromCustomValues', () => {
    // selected a random mock config with isCustomEnabled false
    it('should work without failing with random CONFIG and empty countries', () => {
      expect(utils.getTableChildrenFromCustomValues({ ...arrayMockedConfig }, { countries: [] })).toStrictEqual(null);
    });
  });
});
