import { getLangKey } from '@shared/i18n';
import { BagConstraint, Item, Value } from '../../../types';

export const getFormattedSelectOptions = (
  values: Value[],
  langKey = getLangKey(),
) => {
  return values.map(({ _id, name }) => ({
    value: _id,
    label: name?.[langKey],
  }));
};

const getArrayFieldValues = (items: Item[] | string[]) => items?.map((item: Item | string) => (typeof item === 'object' ? item.id : item));

export const getInitialValues = (bagConstraint = {}) => {
  const { isActive, description, firstGroup, secondGroup } = bagConstraint as BagConstraint;
  return {
    status: isActive,
    firstGroupItems: getArrayFieldValues(firstGroup),
    secondGroupItems: getArrayFieldValues(secondGroup),
    description,
  };
};

export const getUnselectedValues = (allValues = [], selectedValues = []) => {
  return allValues.filter(({ value }) => !selectedValues?.includes(value));
};
