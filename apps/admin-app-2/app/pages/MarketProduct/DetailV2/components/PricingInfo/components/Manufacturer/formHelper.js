import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const getInitialValues = values => ({ manufacturerId: values?.manufacturerId });
export const validationSchema = () => (Yup.object()
  .shape({ manufacturerId: Yup.string() })
);
export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};
