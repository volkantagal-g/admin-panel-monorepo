import * as Yup from 'yup';
import { get, toString } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';
import { getirMarketDomainTypes } from '@app/pages/MarketProduct/constantValues';

export const defaultValues = {
  domainTypes: [],
  name: {},
  description: '',
  substituteFor: null,
  isSubCategory: false,
  isCategoryOfTheWeek: false,
  isListable: true,
  isPublic: false,
  showUnitPrice: false,
};

export const validationSchema = () => {
  return (Yup.object()
    .shape({
      domainTypes: Yup.array().min(1).required(),
      name: YupMultiLanguage.string({ isRequired: true }),
      description: Yup.string()
        .trim()
        .required(),
      isSubCategory: Yup.boolean(),
      isCategoryOfTheWeek: Yup.boolean(),
      isListable: Yup.boolean(),
      isPublic: Yup.boolean(),
      showUnitPrice: Yup.boolean(),
    })
  );
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

const getModifiedValues = values => {
  const domainTypes = values.domainTypes.map(domainType => {
    return Number(domainType.value);
  });
  const newValues = {
    ...values,
    domainTypes,
  };

  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({ initialValues, values }) => {
  const _initialValues = getModifiedValues(initialValues);
  const _values = getModifiedValues(values);
  const { newValues: changedValues } = getDiffObj(_initialValues, _values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = marketProductCategory => {
  if (!get(marketProductCategory, '_id')) return defaultValues;
  const initialValues = {
    domainTypes: get(marketProductCategory, 'domainTypes', []),
    name: getLangDataOfItem(marketProductCategory, ['name'], ''),
    description: get(marketProductCategory, 'description', ''),
    substituteFor: get(marketProductCategory, 'substituteFor', null),
    isSubCategory: get(marketProductCategory, 'isSubCategory', false),
    isCategoryOfTheWeek: get(marketProductCategory, 'isCategoryOfTheWeek', false),
    isListable: get(marketProductCategory, 'isListable', true),
    isPublic: get(marketProductCategory, 'isPublic', false),
    showUnitPrice: marketProductCategory.showUnitPrice,
  };
  return getModifiedInitialValues(initialValues);
};
