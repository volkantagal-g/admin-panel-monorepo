import { getLangKey } from '@shared/i18n';

import { productGroupTypes, productGroupPlacements, productGroupHierarchies } from '../constantValues';

export const getGroupTypeOptions = () => {
  return Object.entries(productGroupTypes).map(([key, value]) => {
    return {
      value: key,
      label: value[getLangKey()],
    };
  });
};

export const getPlacementOptions = () => {
  return Object.entries(productGroupPlacements).map(([key, value]) => {
    return {
      value: Number(key),
      label: value,
    };
  });
};

export const getHierarchyOptions = () => {
  return Object.entries(productGroupHierarchies).map(([key, value]) => {
    return {
      value: key,
      label: value[getLangKey()],
    };
  });
};

export const findDuplicates = data => {
  return data
    .map(item => item.productId.trim())
    .filter((value, index, self) => self.indexOf(value) !== index);
};
