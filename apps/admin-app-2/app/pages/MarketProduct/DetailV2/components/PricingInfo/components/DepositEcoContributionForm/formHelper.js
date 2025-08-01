import * as Yup from 'yup';
import { isNumber } from 'lodash';

import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { priceFormatter } from '@app/pages/MarketProduct/utils';

export const getInitialValues = values => ({
  depositPrice: priceFormatter(values?.depositPrice),
  ecoContributionPrice: priceFormatter(values?.ecoContributionPrice),
});
export const validationSchema = () => (Yup.object()
  .shape({
    depositPrice: Yup.number()
      .min(0)
      .nullable(true)
      .transform((value, originalValue) => (isNumber(originalValue) ? originalValue : null)),
    ecoContributionPrice: Yup.number()
      .min(0)
      .nullable(true)
      .transform((value, originalValue) => (isNumber(originalValue) ? originalValue : null)),
  })
);
export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};
