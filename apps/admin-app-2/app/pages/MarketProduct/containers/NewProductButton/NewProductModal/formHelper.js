import * as Yup from 'yup';
import _ from 'lodash';

import { bundleProductDisplayTypes } from '@shared/shared/constantValues';
import { getLangKey, t } from '@shared/i18n';
import { getLangDataOfProductFullName } from '@shared/utils/multiLanguage';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { MARKET_PRODUCT_TYPE } from '@shared/shared/constants';

export const defaultValues = {
  type: undefined,
  subType: undefined,
  unit: undefined,
  name: {},
  fullName: {},
  barcodes: [],
  isBundle: false,
  bundleDisplayType: null,
  sapReferenceCode: undefined,
  domainTypes: [],
};

export const validationSchema = values => {
  const isProductWeight = Number(values.type) === MARKET_PRODUCT_TYPE.WEIGHT;

  return Yup.object()
    .shape({
      type: Yup.number().required(),
      subType: isProductWeight && Yup.number(),
      unit: Yup.number().required(),
      name: YupMultiLanguage.string({ isRequired: true }),
      barcodes: Yup.array()
        .of(Yup.string().trim().required())
        .min(1)
        .required(t('marketProductPageV2:MISSING_BARCODE')),
      isBundle: !isProductWeight && Yup.boolean(),
      bundleDisplayType: !isProductWeight && values.isBundle && Yup.number(),
      domainTypes: Yup.array().min(1).required(),
    });
};

export const getDisplayTypeOptions = () => {
  return Object.entries(bundleProductDisplayTypes).map(([key, value]) => {
    return {
      value: Number(key),
      label: value[getLangKey()],
    };
  });
};
export const getModifiedValues = values => {
  const isProductWeight = Number(values.type) === MARKET_PRODUCT_TYPE.WEIGHT;

  const domainTypes = values.domainTypes.map(domainType => {
    return Number(domainType);
  });

  const newValues = {
    ...values,
    type: Number(values.type),
    subType: values.subType && Number(values.subType),
    fullName: getLangDataOfProductFullName(values),
    domainTypes,
  };

  if (_.isNull(values.bundleDisplayType)) {
    delete newValues.bundleDisplayType;
  }

  if (!values.isBundle) {
    delete newValues.isBundle;
  }

  if (Number(newValues.type) !== MARKET_PRODUCT_TYPE.WEIGHT) {
    delete newValues.subType;
  }

  if (isProductWeight) {
    delete newValues.isBundle;
    delete newValues.bundleDisplayType;
  }

  return newValues;
};
