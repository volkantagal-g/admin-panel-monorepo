import { Select } from 'antd';

import {
  areStringValuesUnique,
  getBadgeOptions,
  getMasterCategoryLevelOptions,
  getParentNameOfMasterCategory,
  getWarehouseOptions,
} from './utils';

const { Option } = Select;

describe('getParentNameOfMasterCategory', () => {
  const masterCategory1 = {
    _id: '636b54c64127af1e0b04f4a9',
    name: {
      en: 'Master Sub Class (Level 40)',
      tr: 'Master Sub Class (Level 40)',
    },
    level: 40,
    parent: {
      _id: '636b54774127af53d904f4a6',
      name: {
        en: 'Master Class (Level 30)',
        tr: 'Master Class (Level 30)',
      },
      level: 30,
      parent: {
        _id: '636b54554127af4ef804f4a5',
        name: {
          en: 'Master Category (Level 20)',
          tr: 'Master Category (Level 20)',
        },
        level: 20,
        parent: {
          _id: '636b54044127af5f1204f4a4',
          name: {
            en: 'Master Main Category (Level 10)',
            tr: 'Master Main Category (Level 10)',
          },
          level: 10,
        },
      },
    },
  };

  it('returns an empty string when passed a null or undefined category', () => {
    const expectedResult = '';
    const result = getParentNameOfMasterCategory(null, true);
    expect(result).toEqual(expectedResult);
  });

  it('does not include the category name in the returned string when isCategoryNameIncluded is false', () => {
    const expectedResult = 'Master Main Category (Level 10) / Master Category (Level 20) / Master Class (Level 30)';
    const result = getParentNameOfMasterCategory(masterCategory1, false);
    expect(result).toEqual(expectedResult);
  });

  it('returns the correct parent name for a MASTER_SUB_CLASS level category', () => {
    const expectedResult = 'Master Main Category (Level 10) / Master Category (Level 20) / Master Class (Level 30) / Master Sub Class (Level 40)';
    const result = getParentNameOfMasterCategory(masterCategory1, true);
    expect(result).toEqual(expectedResult);
  });

  it('returns the correct parent name for a MASTER_CLASS level category', () => {
    const masterCategory = {
      _id: '636b54774127af53d904f4a6',
      name: {
        en: 'Master Class (Level 30)',
        tr: 'Master Class (Level 30)',
      },
      level: 30,
      parent: {
        _id: '636b54554127af4ef804f4a5',
        name: {
          en: 'Master Category (Level 20)',
          tr: 'Master Category (Level 20)',
        },
        level: 20,
        parent: {
          _id: '636b54044127af5f1204f4a4',
          name: {
            en: 'Master Main Category (Level 10)',
            tr: 'Master Main Category (Level 10)',
          },
          level: 10,
        },
      },
    };
    const expectedResult = 'Master Main Category (Level 10) / Master Category (Level 20) / Master Class (Level 30)';
    const result = getParentNameOfMasterCategory(masterCategory, true);
    expect(result).toEqual(expectedResult);
  });

  it('returns the correct parent name for a MASTER_CATEGORY level category', () => {
    const masterCategory = {
      _id: '636b54554127af4ef804f4a5',
      name: {
        en: 'Master Category (Level 20)',
        tr: 'Master Category (Level 20)',
      },
      level: 20,
      parent: {
        _id: '636b54044127af5f1204f4a4',
        name: {
          en: 'Master Main Category (Level 10)',
          tr: 'Master Main Category (Level 10)',
        },
        level: 10,
      },
    };
    const expectedResult = 'Master Main Category (Level 10) / Master Category (Level 20)';
    const result = getParentNameOfMasterCategory(masterCategory, true);
    expect(result).toEqual(expectedResult);
  });

  it('returns the correct parent name for a MASTER_MAIN_CATEGORY level category', () => {
    const masterCategory = {
      _id: '636b54044127af5f1204f4a4',
      name: {
        en: 'Master Main Category (Level 10)',
        tr: 'Master Main Category (Level 10)',
      },
      level: 10,
    };
    const expectedResult = 'Master Main Category (Level 10)';
    const result = getParentNameOfMasterCategory(masterCategory, true);
    expect(result).toEqual(expectedResult);
  });
});

describe('getMasterCategoryLevelOptions', () => {
  it('returns an array of objects containing the correct value and label for each level', () => {
    const expectedResult = [
      { value: '10', label: 'Master Main Category' },
      { value: '20', label: 'Master Category' },
      { value: '30', label: 'Master Class' },
      { value: '40', label: 'Master Sub Class' },
    ];
    const result = getMasterCategoryLevelOptions();

    expect(result).toEqual(expectedResult);
  });
});

describe('getBadgeOptions', () => {
  test('it should return an array of options', () => {
    const badges = [{ _id: '1', name: 'Badge 1' }, { _id: '2', name: 'Badge 2' }];
    expect(getBadgeOptions(badges)).toEqual([
      { value: '1', label: 'Badge 1' },
      { value: '2', label: 'Badge 2' },
    ]);
  });

  test('it should handle empty badges array', () => {
    const badges = [];
    expect(getBadgeOptions(badges)).toEqual([]);
  });

  test('it should handle missing name property', () => {
    const badges = [{ _id: '1' }, { _id: '2', name: 'Badge 2' }];
    expect(getBadgeOptions(badges)).toEqual([
      { value: '1', label: '' },
      { value: '2', label: 'Badge 2' },
    ]);
  });

  test('it should handle missing _id property', () => {
    const badges = [{ name: 'Badge 1' }, { _id: '2', name: 'Badge 2' }];
    expect(getBadgeOptions(badges)).toEqual([
      { value: '', label: 'Badge 1' },
      { value: '2', label: 'Badge 2' },
    ]);
  });

  test('it should handle missing badges array', () => {
    expect(getBadgeOptions()).toEqual([]);
  });
});

describe('getWarehouseOptions', () => {
  it('should return an array of Option components', () => {
    const warehouses = [
      { _id: '1', name: 'Warehouse A' },
      { _id: '2', name: 'Warehouse B' },
    ];
    const options = getWarehouseOptions(warehouses);
    expect(options).toEqual([
      <Option key="1" value="1" label="Warehouse A">Warehouse A</Option>,
      <Option key="2" value="2" label="Warehouse B">Warehouse B</Option>,
    ]);
  });
});

describe('areStringValuesUnique', () => {
  test('should return true for an array of unique string values', () => {
    const arr = ['a', 'b', 'c', 'd'];
    expect(areStringValuesUnique(arr)).toBe(true);
  });

  test('should return false for an array of non-unique string values', () => {
    const arr = ['a', 'b', 'c', 'a'];
    expect(areStringValuesUnique(arr)).toBe(false);
  });

  test('should return true for an array with null or undefined values', () => {
    const arr = [null, 'a', undefined, 'b'];
    expect(areStringValuesUnique(arr)).toBe(true);
  });

  test('should return true for an array with string and non-string values', () => {
    const arr = ['a', 1, {}, 'b'];
    expect(areStringValuesUnique(arr)).toBe(true);
  });
});
