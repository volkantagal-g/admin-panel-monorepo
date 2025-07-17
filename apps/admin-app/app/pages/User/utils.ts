import { isEqual } from 'lodash';

export const getChangedValues = ({
  initialValues,
  values,
  isNew,
}: {
  initialValues: UserType,
  values: UserType,
  isNew: boolean
}): UserType => {
  if (isNew) {
    return values;
  }
  return Object.keys(values).reduce((acc, key) => {
    if (!isEqual(values[key as keyof UserType], initialValues[key as keyof UserType])) {
      (acc as any)[key] = values[key as keyof UserType];
    }
    return acc;
  }, {} as UserType);
};
