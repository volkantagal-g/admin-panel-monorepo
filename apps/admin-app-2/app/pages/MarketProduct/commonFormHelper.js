import { cloneDeep, get, isBoolean, isEmpty, set, toString as toStringLodash } from 'lodash';

import * as Yup from 'yup';

import { getLangKey, t } from '@shared/i18n';
import { STRUCK_PRICE_SUPPORTER_TYPE } from '@shared/shared/constants';
import { struckPriceSupporters } from '@shared/shared/constantValues';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const validationSchemaStruckPrice = (values, { price, page }) => {
  return (Yup.object()
    .shape({
      struckPrice: Yup.object()
        .shape({
          price: Yup.number().required().test(
            'struckPriceControl',
            t(`${page}:STRUCK_PRICE_INFO.ERROR.STRUCK_PRICE_IS_LOWER`),
            value => {
              return value === 0 || value > price;
            },
          ),
          isEnabled: isBoolean(values?.struckPrice?.isEnabled) && Yup.boolean(),
          isShownUnderSpecialOffers: isBoolean(values?.struckPrice?.isShownUnderSpecialOffers) && Yup.boolean(),
          financial: !isEmpty(values?.struckPrice?.financial) && Yup.object()
            .shape({
              supplierSupportRate: values.struckPriceSupportType === toStringLodash(STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER) &&
                  Yup
                    .number()
                    .max(1, t(`${page}:STRUCK_PRICE_INFO.ERROR.SUPPLIER_SUPPORT_RATE`))
                    .positive(t(`${page}:STRUCK_PRICE_INFO.ERROR.SUPPLIER_SUPPORT_RATE`))
                    .required(),
              thirdPartySupportRate: values.struckPriceSupportType === toStringLodash(STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY) &&
                  Yup
                    .number()
                    .max(1, t(`${page}:STRUCK_PRICE_INFO.ERROR.THIRD_PARTY_SUPPORT_RATE`))
                    .positive(t(`${page}:STRUCK_PRICE_INFO.ERROR.THIRD_PARTY_SUPPORT_RATE`))
                    .required(),
              isFreeProduct: isBoolean(get(values, 'struckPrice.financial.isFreeProduct')) && Yup.boolean(),
            }),
        }),
    })
  );
};

export const getStruckPriceSupporterOptions = () => {
  return Object.entries(struckPriceSupporters).map(([key, value]) => {
    return {
      value: key,
      label: get(value, [getLangKey()]),
    };
  });
};
export const getModifiedValues = (values, isFormValue) => {
  const newValues = { ...cloneDeep(values) };
  const rateValue = isFormValue ? 0 : null;
  const thirdPartySupportRatePath = 'struckPrice.financial.thirdPartySupportRate';
  const supplierSupportRatePath = 'struckPrice.financial.supplierSupportRate';
  const isFreeProductPath = 'struckPrice.financial.isFreeProduct';

  if (newValues.struckPriceSupportType === toStringLodash(STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER)) {
    set(newValues, isFreeProductPath, false);
    set(newValues, thirdPartySupportRatePath, rateValue);
  }
  if (newValues.struckPriceSupportType === toStringLodash(STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY)) {
    set(newValues, isFreeProductPath, false);
    set(newValues, supplierSupportRatePath, rateValue);
  }
  if (newValues.struckPriceSupportType === toStringLodash(STRUCK_PRICE_SUPPORTER_TYPE.FREE)) {
    set(newValues, isFreeProductPath, true);
    set(newValues, supplierSupportRatePath, rateValue);
    set(newValues, thirdPartySupportRatePath, rateValue);
  }
  if (newValues.struckPriceSupportType === toStringLodash(STRUCK_PRICE_SUPPORTER_TYPE.GETIR_FINANCED)) {
    set(newValues, isFreeProductPath, false);
    set(newValues, supplierSupportRatePath, rateValue);
    set(newValues, thirdPartySupportRatePath, rateValue);
  }
  return newValues;
};
export const getOnlyModifiedValuesBeforeSubmitForStruckPrice = ({
  initialValues,
  values,
}) => {
  const _initialValues = getModifiedValues(initialValues, false);
  const _values = getModifiedValues(values, true);
  const { newValues: changedValues } = getDiffObj(_initialValues, _values);

  if (_initialValues?.struckPriceSupportType === _values?.struckPriceSupportType) {
    if ((Number(_values?.struckPriceSupportType) === STRUCK_PRICE_SUPPORTER_TYPE.SUPPLIER
      && !get(changedValues, 'struckPrice.financial.supplierSupportRate'))
      || (Number(_values?.struckPriceSupportType) === STRUCK_PRICE_SUPPORTER_TYPE.THIRD_PARTY
      && !get(changedValues, 'struckPrice.financial.thirdPartySupportRate'))) {
      delete changedValues.struckPrice?.financial;
    }
  }

  delete changedValues?.struckPriceSupportType;

  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};
