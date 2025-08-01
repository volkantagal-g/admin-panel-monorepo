import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { priceFormatter } from '@app/pages/MarketProduct/utils';

export const getInitialValues = values => ({ vat: values?.vat ? priceFormatter(values.vat * 100) : null });
export const validationSchema = () => (Yup.object()
  .shape({ vat: Yup.string() })
);
export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  if (changedValues?.vat) {
    changedValues.vat /= 100;
  }
  return changedValues;
};
