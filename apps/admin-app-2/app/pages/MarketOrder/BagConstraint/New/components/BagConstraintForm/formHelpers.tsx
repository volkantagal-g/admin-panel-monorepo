import { getLangKey } from '@shared/i18n';
import { FromValues, MasterCategory, Value } from '../../../types';

export const getFormattedSelectOptions = (
  values: Value[],
  langKey = getLangKey(),
) => {
  return values.map(({ _id, name }) => ({
    value: _id,
    label: name?.[langKey],
  }));
};

export const getInitialValues = (): FromValues => {
  return {
    status: true,
    firstGroupItems: [],
    secondGroupItems: [],
    description: { tr: '', en: '' },
  };
};

export const getUnselectedValues = (allValues: MasterCategory[], selectedValues: string[]) => {
  return allValues.filter(({ value }) => !selectedValues?.includes(value));
};

export const getValuesBeforeSubmit = (values: FromValues) => {
  const { description, status, firstGroupItems, secondGroupItems } = values;
  return {
    description,
    isActive: status,
    left: {
      type: 1,
      items: firstGroupItems,
    },
    right: {
      type: 1,
      items: secondGroupItems,
    },
  };
};
