import { get, isFinite } from 'lodash';

import * as Yup from 'yup';

import { productImperialUnits, productMetricUnits, productUnits } from '@shared/shared/constantValues';
import { getLangKey, t } from '@shared/i18n';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { currencyFormat } from '@shared/utils/localization';

export const getUnitOptions = () => {
  const metricOptions = Object.entries(productMetricUnits).map(([key, value]) => (
    {
      value: key,
      label: get(value, [getLangKey()], ''),
    }
  ));

  const imperialOptions = Object.entries(productImperialUnits).map(([key, value]) => (
    {
      value: key,
      label: get(value, [getLangKey()], ''),
    }
  ));

  return [
    {
      label: t('marketProductPageV2:UNIT_PRICE_INFO.METRIC_UNITS'),
      options: metricOptions,
    },
    {
      label: t('marketProductPageV2:UNIT_PRICE_INFO.IMPERIAL_UNITS'),
      options: imperialOptions,
    },
  ];
};
export const getInitialValues = marketProduct => ({
  unit: get(marketProduct, 'unit', ''),
  quantity: get(marketProduct, 'quantity', null),
  perUnit: get(marketProduct, 'perUnit', null),
}
);
export const validationSchema = values => {
  const hasAnyUnitPriceProperty = values.unit || values.quantity || values.perUnit;
  return (Yup.object()
    .shape({
      unit: Yup.string().nullable(true).when('a', (a, schema) => {
        if (hasAnyUnitPriceProperty) {
          return schema.required();
        }
        return schema;
      }),
      quantity: Yup.number().min(0).nullable(true).when('a', (a, schema) => {
        if (hasAnyUnitPriceProperty) {
          return schema.required();
        }
        return schema;
      }),
      perUnit: Yup.number().min(0).nullable(true).when('a', (a, schema) => {
        if (hasAnyUnitPriceProperty) {
          return schema.required();
        }
        return schema;
      }),
    })
  );
};
export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const modifiedInitialValues = { unitPriceProperties: { ...initialValues } };
  const modifiedValues = { unitPriceProperties: { ...values } };
  const { newValues: changedValues } = getDiffObj(modifiedInitialValues, modifiedValues);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};
export const getUnitPrice = (perUnit, quantity, unitKey, price) => {
  if (!isFinite(price) || !isFinite(perUnit) || !isFinite(quantity) || !price || !perUnit || !quantity) {
    return '';
  }
  const perUnitPrice = price * (perUnit / quantity);
  const unit = get(productUnits, [unitKey, getLangKey()], '');
  const unitPrice = `${currencyFormat().format(perUnitPrice)} / ${perUnit} ${unit}`;
  return unitPrice;
};

export const getPrice = (singleProductPrice, domainType, bundleProductPrices) => {
  if (!bundleProductPrices?.subProductPrices?.length) {
    return singleProductPrice?.filter(({ domainType: type }) => Number(type) === Number(domainType))
      ?.find(({ isDiscounted }) => isDiscounted === false)?.price || 0;
  }
  return singleProductPrice?.filter(({ domainType: type }) => Number(type) === Number(domainType))
    ?.find(({ isDiscounted }) => isDiscounted === true)?.price || 0;
};
