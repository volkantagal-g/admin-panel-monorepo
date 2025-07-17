/* eslint-disable max-len */

export const exampleImportCreateL1 = {
  CountryCode: 'TR',
  Target: 'L1',
  NameTR: '',
  NameEN: '',
  Description: '',
  isActive: true,
};

export const exampleImportCreateL2 = {
  CountryCode: 'TR',
  Target: 'L2',
  ParentID: '6156af7a9883dce26caa1ebe',
  NameTR: '',
  NameEN: '',
  Description: '',
  CategoryRole: '',
  isActive: true,
};

export const exampleImportCreateL3 = {
  CountryCode: 'TR',
  Target: 'L3',
  ParentID: '6156af7a9883dce26caa1ebe',
  NameTR: '',
  NameEN: '',
  Description: '',
  PickingOrder: '',
  isActive: true,
};

export const exampleImportCreateL4 = {
  CountryCode: 'TR',
  Target: 'L4',
  ParentID: '6156af7a9883dce26caa1ebe',
  NameTR: '',
  NameEN: '',
  Description: '',
  isActive: true,
};

export const exampleImportUpdateCommon = {
  Id: '6156af7a9883dce26caa1ebe',
  NameTR: '',
  NameEN: '',
  Description: '',
  isActive: true,
};

export const exampleImportUpdateDiffL2 = { CategoryRole: 'POWER' };

export const exampleImportUpdateDiffL3 = { PickingOrder: '' };

export const getExampleImportUpdate = levels => {
  let example = exampleImportUpdateCommon;
  if (levels.includes('L2')) {
    example = { ...example, ...exampleImportUpdateDiffL2 };
  }
  if (levels.includes('L3')) {
    example = { ...example, ...exampleImportUpdateDiffL3 };
  }
  return example;
};

export const getExampleImportCreate = (level, countryCode) => {
  if (level === 'L1') {
    exampleImportCreateL1.CountryCode = countryCode;
    return exampleImportCreateL1;
  }
  if (level === 'L2') {
    exampleImportCreateL2.CountryCode = countryCode;
    return exampleImportCreateL2;
  }
  if (level === 'L3') {
    exampleImportCreateL3.CountryCode = countryCode;
    return exampleImportCreateL3;
  }
  if (level === 'L4') {
    exampleImportCreateL4.CountryCode = countryCode;
    return exampleImportCreateL4;
  }
  return 'L1';
};
