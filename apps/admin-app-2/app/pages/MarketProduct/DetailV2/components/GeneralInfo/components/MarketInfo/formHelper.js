import * as Yup from 'yup';
import { get, toString } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { getirMarketDomainTypes, productSources } from '@app/pages/MarketProduct/constantValues';

export const validationSchema = (values, { isProductActive } = {}) => {
  return (Yup.object()
    .shape({
      domainTypes: Yup.array()
        .when('a', (a, schema) => {
          if (isProductActive) {
            return schema.min(1).required();
          }
          return schema;
        }),
      keywords: YupMultiLanguage.arrayOfStrings({ isRequired: true, isValidationSkipped: !isProductActive }),
      category: Yup.string()
        .when('a', (a, schema) => {
          if (isProductActive) {
            return schema.required();
          }
          return schema.optional();
        }),
      subCategory: Yup.string()
        .when('a', (a, schema) => {
          if (isProductActive) {
            return schema.required();
          }
          return schema;
        }),
    })
  );
};

export const getProductSourceOptions = () => {
  return Object.entries(productSources).map(([key, value]) => {
    return {
      value: key,
      label: value[getLangKey()],
    };
  });
};

const getModifiedInitialValues = values => {
  const domainTypes = values.domainTypes.map(type => {
    return {
      value: toString(type),
      label: get(getirMarketDomainTypes, [type, getLangKey()]),
    };
  });

  const newValues = {
    ...values,
    domainTypes,
  };
  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const { newValues: changedValues } = getDiffObj(initialValues, values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = marketProduct => {
  const initialValues = {
    domainTypes: get(marketProduct, 'domainTypes', []),
    category: {
      value: get(marketProduct, 'category._id', ''),
      label: get(marketProduct, ['category', 'name', getLangKey()], ''),
    },
    subCategory: {
      value: get(marketProduct, 'subCategory._id', ''),
      label: get(marketProduct, ['subCategory', 'name', getLangKey()], ''),
    },
    keywords: getLangDataOfItem(marketProduct, ['keywords'], []),
    boostedKeywords: getLangDataOfItem(marketProduct, ['boostedKeywords'], []),
    productSource: get(marketProduct, 'productSource'),
  };
  return getModifiedInitialValues(initialValues);
};
