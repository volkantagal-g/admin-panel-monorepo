import { isEqual } from 'lodash';

export const getChangedValues = ({ initialValues, values, isNew }: { initialValues: Partial<RoleType>, values: Partial<RoleType>, isNew: boolean }) => {
  if (isNew) {
    return values;
  }
  return Object.keys(values).reduce((acc, key) => {
    if (!isEqual(values[key as keyof Partial<RoleType>], initialValues[key as keyof Partial<RoleType>])) {
      (acc as any)[key] = values[key as keyof Partial<RoleType>];
    }
    return acc;
  }, {} as Partial<RoleType>);
};
