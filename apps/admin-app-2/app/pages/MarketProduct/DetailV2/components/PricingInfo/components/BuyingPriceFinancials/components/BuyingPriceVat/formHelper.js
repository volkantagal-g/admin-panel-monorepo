import * as Yup from 'yup';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { priceFormatter } from '@app/pages/MarketProduct/utils';

export const getInitialValues = values => ({ wholesaleVat: priceFormatter(values?.wholesaleVat) });
export const validationSchema = () => (Yup.object()
  .shape({ wholesaleVat: Yup.string() })
);
export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};
