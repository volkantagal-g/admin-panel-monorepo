// TESTING_PRACTICE_EXAMPLE UNIT_TEST

import * as utils from './common';
import { currencyFormat } from '@shared/utils/localization';

describe('Common Utils', () => {
  describe('#getReversedCoordinate', () => {
    it('should reverse and return the given coord array', () => {
      const coord = [41.0211, 29.0040];
      const expected = [29.0040, 41.0211];

      expect(utils.getReversedCoordinate(coord)).toMatchObject(expected);
    });
  });

  describe('#getReversedPolygonCoordinates', () => {
    it('should reverse and return the given polygon coords', () => {
      const coordinates = [
        [
          [26.3096809387207, 38.35875325216884],
          [26.28925323486328, 38.350003292977526],
          [26.290454864501953, 38.338155509668155],
          [26.3096809387207, 38.35875325216884],
        ],
        [
          [26.3096809387207, 38.35875325216884],
          [26.28925323486328, 38.350003292977526],
          [26.290454864501953, 38.338155509668155],
          [26.3096809387207, 38.35875325216884],
        ],
      ];
      const expected = [
        [
          [38.35875325216884, 26.3096809387207],
          [38.350003292977526, 26.28925323486328],
          [38.338155509668155, 26.290454864501953],
          [38.35875325216884, 26.3096809387207],
        ],
        [
          [38.35875325216884, 26.3096809387207],
          [38.350003292977526, 26.28925323486328],
          [38.338155509668155, 26.290454864501953],
          [38.35875325216884, 26.3096809387207],
        ],
      ];

      expect(utils.getReversedPolygonCoordinates(coordinates)).toMatchObject(expected);
    });
  });

  describe('#isObjectIdValid', () => {
    it('should return true for valid id', () => {
      expect(utils.isObjectIdValid('12345AAAAA12345AAAAA1234')).toBe(true);
    });
    it('should return false for invalid id', () => {
      expect(utils.isObjectIdValid(undefined)).toBe(false);
      expect(utils.isObjectIdValid(null)).toBe(false);
      expect(utils.isObjectIdValid('12345AAAAZ12345AAAAA1234')).toBe(false);
    });
  });

  describe('#getStateObject', () => {
    it('should return correct value', () => {
      const state = { a: { b: 'B' } };
      expect(utils.getStateObject(state, 'a', 'b')).toBe('B');
    });
    it('should return correct default value when field missing', () => {
      const state = {};
      const defaultObject = { initialValue: 'B' };
      expect(utils.getStateObject(state, 'a', 'b', defaultObject)).toBe('B');
    });
  });
  describe('#searchItemFields', () => {
    it('should return true for empty inputs', () => {
      expect(utils.searchItemFields()).toBe(true);
    });
    it('should return true for correct search', () => {
      const item = { field1: 'test1', field2: 'test2' };
      expect(utils.searchItemFields(item, 'test1')).toBe(true);
      expect(utils.searchItemFields(item, 'test1 test2')).toBe(true);
      expect(utils.searchItemFields(item, 'test2', ['field2'])).toBe(true);
    });
    it('should return correct default value when field missing', () => {
      const item = { field1: 'test1', field2: 'test2' };
      expect(utils.searchItemFields(item, 'test3')).toBe(false);
      expect(utils.searchItemFields(item, 'test1 test3')).toBe(false);
      expect(utils.searchItemFields(item, 'test2', ['field1'])).toBe(false);
    });
  });

  describe('#getLimitAndOffset', () => {
    it('should return correct limit and offset for default input', () => {
      expect(utils.getLimitAndOffset()).toEqual({ limit: 10, offset: 0 });
    });
    it('should return correct limit and offset for given input', () => {
      const pagination = { currentPage: 5, rowsPerPage: 20 };
      expect(utils.getLimitAndOffset(pagination)).toEqual({ limit: 20, offset: 80 });
    });
  });

  describe('#formatNumber', () => {
    it('should return empty string for empty inputs', () => {
      expect(utils.formatNumber()).toBe('');
    });
    it('should return correct string for inputs', () => {
      expect(utils.formatNumber(4656.8099999999995)).toBe('4.656.80');
      expect(utils.formatNumber(23123.123456, 3)).toBe('23.123.120');
    });
  });
  describe('#createMap', () => {
    it('should return empty object for empty inputs', () => {
      expect(utils.createMap()).toEqual({});
    });
    it('should return correct object for inputs', () => {
      const list = [{ id: 123 }, { id: 321 }];
      const options = { field: 'id' };
      expect(utils.createMap(list, options)).toEqual({ 123: list[0], 321: list[1] });
    });
    it('should map inputs containing a "." correctly', () => {
      const list = [{ email: 'test@email.invalid' }, { email: 'test.another@email.invalid' }];
      const options = { field: 'email' };
      expect(utils.createMap(list, options)).toEqual({ 'test@email.invalid': list[0], 'test.another@email.invalid': list[1] });
    });
  });

  describe('#getDiffObj', () => {
    it('should return empty objects for empty inputs', () => {
      expect(utils.getDiffObj()).toEqual({
        oldValues: {},
        newValues: {},
        unsetValues: {},
      });
    });
    it('should return correct object for inputs', () => {
      const first = { a: 1 };
      const second = { b: 2 };
      const result = utils.getDiffObj(first, second);
      expect(result).toEqual(
        {
          oldValues: { b: undefined },
          newValues: { b: 2 },
          unsetValues: { a: 1 },
        },
      );
    });
  });

  describe('#isNullOrEmpty', () => {
    it('should return true for empty inputs', () => {
      expect(utils.isNullOrEmpty()).toBe(true);
      expect(utils.isNullOrEmpty(undefined)).toBe(true);
      expect(utils.isNullOrEmpty(null)).toBe(true);
      expect(utils.isNullOrEmpty('')).toBe(true);
      expect(utils.isNullOrEmpty('  ')).toBe(true);
    });
    it('should return false for non-empty inputs', () => {
      expect(utils.isNullOrEmpty(0)).toBe(false);
      expect(utils.isNullOrEmpty({})).toBe(false);
      expect(utils.isNullOrEmpty([])).toBe(false);
    });
  });

  describe('#pushByPath', () => {
    it('should work correctly', () => {
      const obj = {};
      utils.pushByPath(obj, 'a', 1);
      expect(obj).toEqual({ a: [1] });
      utils.pushByPath(obj, 'a', 2);
      expect(obj).toEqual({ a: [1, 2] });
    });
  });
  describe('#getErrorCode', () => {
    it('should work correctly', () => {
      const obj = { response: { data: { code: 'test' } } };
      expect(utils.getErrorCode(obj)).toBe('test');
    });
  });

  describe('#getErrorMessage', () => {
    it('should work correctly', () => {
      const obj = { response: { data: { message: 'test' } } };
      expect(utils.getErrorMessage(obj)).toBe('test');
    });
  });

  describe('#getRegexForCaseSensitiveLetters', () => {
    it('should return regexp object', () => {
      expect(utils.getRegexForCaseSensitiveLetters('test')).toBeInstanceOf(RegExp);
    });
  });

  describe('#getSelectFilterOption', () => {
    it('should return true when no params provided', () => {
      expect(utils.getSelectFilterOption()).toBe(true);
    });
    it('should return true for correct id search', () => {
      const inputValue = '12345AAAAA12345AAAAA1234';
      const option = { label: '12345AAAAA12345AAAAA1234' };
      expect(utils.getSelectFilterOption(inputValue, option, true)).toBe(true);
    });
    it('should match special turkish characters', () => {
      const inputValue = 'iŞçĞ';
      const option = { label: 'İşÇğ' };
      expect(utils.getSelectFilterOption(inputValue, option)).toBe(true);
    });
  });

  describe('#removeItemFromArrayByPath', () => {
    it('should remove correct array', () => {
      const data = { a: [1, 2], b: [3, 4] };
      const path = 'b';
      const index = 1;
      utils.removeItemFromArrayByPath(data, path, index);
      expect(data).toEqual({ a: [1, 2], b: [3] });
    });
  });

  describe('#normalizeNumber', () => {
    it('should return undefined when no params provided', () => {
      expect(utils.normalizeNumber()).toBe(undefined);
    });
    it('should return correctly when param provided', () => {
      expect(utils.normalizeNumber(7.00001)).toBe(7);
    });
  });

  describe('#setNullToEmptyStringDeep', () => {
    it('should work correctly', () => {
      const obj = { a: '', b: { c: '' } };
      utils.setNullToEmptyStringDeep(obj);
      const expected = { a: null, b: { c: null } };
      expect(obj).toEqual(expected);
    });
  });

  describe('#generateFileName', () => {
    it('should work correctly', () => {
      const uniq1 = utils.generateFileName();
      const uniq2 = utils.generateFileName();
      expect(uniq1).not.toEqual(uniq2);
    });
  });

  describe('#selectOptionsSearch', () => {
    it('should work correctly', () => {
      expect(utils.selectOptionsSearch('ASD', { label: 'asdf' })).toBe(true);
    });
  });
  describe('#isMobile', () => {
    it('should return false for jsdom env', () => {
      expect(utils.isMobile()).toBe(false);
    });
    it('should return true for mocked navigator', () => {
      Object.defineProperty(global.navigator, 'userAgent', { get: () => 'iPhone' });
      expect(utils.isMobile()).toBe(true);
    });
  });

  describe('#inDevelopmentEnvironment', () => {
    it('should be ture for test env since it is default local unless dev or prod', () => {
      expect(utils.inDevelopmentEnvironment).toBe(true);
    });
  });

  describe('#removeNullOrUndefinedDeep', () => {
    it('should be remove null or undefined default case', () => {
      const obj = { a: null, b: undefined, c: '' };
      expect(utils.removeNullOrUndefinedDeep(obj)).toEqual({ c: '' });
    });
    it('should remove empty string as well if option set', () => {
      const obj = { a: null, b: undefined, c: '' };
      expect(utils.removeNullOrUndefinedDeep(obj, { removeEmpty: true })).toEqual({});
    });
  });

  describe('#thousandSeparator', () => {
    it('should seperate with dots', () => {
      expect(utils.thousandSeparator(123123)).toBe('123.123');
    });
    it('should separate with given input ', () => {
      expect(utils.thousandSeparator(123123, ':')).toBe('123:123');
    });
  });

  describe('#getCityName', () => {
    it('should get the city name from city array', () => {
      const cityArray = [{ name: 'test_name', _id: 'test_id' }];
      expect(utils.getCityName(cityArray, 'test_id')).toBe('test_name');
    });
  });

  describe('#searchColumnDataByRegex', () => {
    it('should return false for non-string inputs', () => {
      expect(utils.searchColumnDataByRegex(123)).toBe(false);
    });
    it('should return false for no match', () => {
      expect(utils.searchColumnDataByRegex('test123', 'asd')).toBe(null);
    });
    it('should return match array for match', () => {
      const result = utils.searchColumnDataByRegex('test123', 'test1');
      expect(Array.from(result)).toStrictEqual(['test1']);
    });
  });

  describe('#getMaskedName', () => {
    it('should work correctly', () => {
      const fakeName = 'Foo Bar Foo';
      expect(utils.getMaskedName(fakeName)).toBe('Foo B. F.');
    });
  });

  describe('#getMaskedPhoneNumber', () => {
    it('should work correctly', () => {
      const fakeNumber = '05555555555';
      expect(utils.getMaskedPhoneNumber(fakeNumber)).toBe('055******55');
    });
  });

  describe('#alphabeticallySortByParam', () => {
    it('should work correctly', () => {
      const data = [{ label: 'b' }, { label: 'a' }];
      expect(utils.alphabeticallySortByParam(data)).toStrictEqual([{ label: 'a' }, { label: 'b' }]);
    });
  });

  describe('#isCountryInDivision', () => {
    it('should return false for no inputs', () => {
      expect(utils.isCountryInDivision()).toBe(false);
    });
    it('should return false for incorrect inputs', () => {
      const country = { _id: 'test_id_1' };
      const division = { countries: [{ _id: 'test_id_2' }] };
      expect(utils.isCountryInDivision(country, division)).toBe(false);
    });
    it('should return true for correct inputs', () => {
      const country = { _id: 'test_id_1' };
      const division = { countries: [{ _id: 'test_id_1' }] };
      expect(utils.isCountryInDivision(country, division)).toBe(true);
    });
  });

  describe('#getDivisionOfACountryFromAllDivisions', () => {
    it('should return null for no inputs', () => {
      expect(utils.getDivisionOfACountryFromAllDivisions()).toBe(null);
    });
    it('should return null for incorrect inputs', () => {
      const country = { _id: 'test_id_1' };
      const divisions = [{ countries: [{ _id: 'test_id_2' }] }];
      expect(utils.getDivisionOfACountryFromAllDivisions(country, divisions)).toBe(null);
    });
    it('should return country for correct inputs', () => {
      const country = { _id: 'test_id_1' };
      const divisions = [{ countries: [{ _id: 'test_id_1' }] }];
      expect(utils.getDivisionOfACountryFromAllDivisions(country, divisions)).toEqual(divisions[0]);
    });
  });

  describe('#getRelativeRouteWithSlug', () => {
    it('should return undefined for no inputs', () => {
      expect(utils.getRelativeRouteWithSlug()).toBe(undefined);
    });

    it('should return correctly for given inputs', () => {
      const route = '/test/:id';
      const params = { id: 'test_id' };
      expect(utils.getRelativeRouteWithSlug(route, params)).toBe('/test/test_id');
    });
  });

  describe('#exportExcel', () => {
    it('should shouldn\'t return anything', () => {
      URL.createObjectURL = jest.fn().mockReturnValue('http://test.com');
      expect(utils.exportExcel()).toBe(undefined);
    });
    it('should shouldn\'t return anything', () => {
      const data = [{ a: 1 }, { a: 2 }];
      const fileName = 'test';
      const columns = [{ title: 'a column', key: 'a' }];
      expect(utils.exportExcel(data, fileName, columns)).toBe(undefined);
    });
    it('should shouldn\'t return anything with null/undefined data', () => {
      const data = [{ a: 1 }, { a: 2 }, { a: null }, { a: undefined }];
      const fileName = 'test';
      const columns = [{ title: 'a column', key: 'a' }];
      expect(utils.exportExcel(data, fileName, columns)).toBe(undefined);
    });
  });

  describe('#convertToCapitalLetter', () => {
    it('should work correctly', () => {
      expect(utils.convertToCapitalLetter('test1 test2')).toBe('Test1 Test2');
    });
  });
  describe('#getFileExtension', () => {
    it('should work correctly', () => {
      expect(utils.getFileExtension('asd.txt')).toBe('txt');
    });
  });
  describe('#isValidObjectId', () => {
    it('should return true for valid id', () => {
      expect(utils.isValidObjectId('12345aaaaa12345aaaaa1234')).toBe(true);
    });
    it('should return false for invalid id', () => {
      expect(utils.isValidObjectId(undefined)).toBe(false);
      expect(utils.isValidObjectId(null)).toBe(false);
      expect(utils.isValidObjectId('12345AAAAZ12345AAAAA1234')).toBe(false);
    });
  });

  describe('#hasDuplicates', () => {
    it('should return false for default empty array', () => {
      expect(utils.hasDuplicates()).toBe(false);
    });
    it('should return false for unique  array', () => {
      const arr = [1, 2, 3];
      expect(utils.hasDuplicates(arr)).toBe(false);
    });
    it('should return true for duplicated array', () => {
      const arr = [1, 2, 3, 1];
      expect(utils.hasDuplicates(arr)).toBe(true);
    });
  });

  describe('#getRandomNumber', () => {
    it('should return valid integer without parameter for default empty array', () => {
      expect(utils.getRandomNumber()).toBeGreaterThanOrEqual(0);
      expect(utils.getRandomNumber()).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
    });
    it('should return valid integer accordingly min parameter', () => {
      const expectedMin = 1881;
      expect(utils.getRandomNumber({ min: expectedMin })).toBeGreaterThanOrEqual(expectedMin);
    });
    it('should return valid integer accordingly max parameter', () => {
      const expectedMax = 1881;
      expect(utils.getRandomNumber({ max: expectedMax })).toBeLessThanOrEqual(expectedMax);
    });
  });

  describe('#replaceNonBreakingSpacesToSpace', () => {
    it('should return valid string', () => {
      const replacedText = utils.replaceNonBreakingSpacesToSpace(
        currencyFormat({ maxDecimal: 1, minDecimal: 1 }).format(42.9312),
      );
      expect(replacedText).toBe('TRY 42.9');
    });
  });
});
