import _ from 'lodash';

import { PRODUCT_CATEGORY_TYPE, PRODUCT_SUBCATEGORY_TYPE } from '@shared/shared/constants';
import { productCategoryTypes, productSubCategoryTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';
import { getDiffObj, setNullToEmptyStringDeep } from '@shared/utils/common';

export const getCategoryTypeOptions = () => {
  return Object.entries(productCategoryTypes).map(([key, value]) => {
    return {
      value: _.toString(key),
      label: value[getLangKey()],
      PRODUCT_SUBCATEGORY_TYPE,
    };
  });
};

export const getSubCategoryTypeOptions = () => {
  return Object.entries(productSubCategoryTypes).map(([key, value]) => {
    return {
      value: _.toString(key),
      label: value[getLangKey()],
    };
  });
};

const getModifiedInitialValues = (values, isSubCategory) => {
  const typeOptions = isSubCategory ? getSubCategoryTypeOptions() : getCategoryTypeOptions();
  const type = typeOptions.find(type => type.value === (values.type || '').toString());
  const newValues = {
    ...values,
    type,
  };
  return newValues;
};

const getModifiedValues = values => {
  const type = _.get(values, 'type.value');
  const newValues = { type: Number(type) };
  return newValues;
};

export const getOnlyModifiedValuesBeforeSubmit = ({
  initialValues,
  values,
}) => {
  const _initialValues = getModifiedValues(initialValues);
  const _values = getModifiedValues(values);
  const { newValues: changedValues } = getDiffObj(_initialValues, _values);
  setNullToEmptyStringDeep(changedValues);
  return changedValues;
};

export const getInitialValues = marketProductCategory => {
  const { isSubCategory } = marketProductCategory;
  const initialValues = { type: _.get(marketProductCategory, 'type', !isSubCategory && PRODUCT_CATEGORY_TYPE.NORMAL) };
  return getModifiedInitialValues(initialValues, isSubCategory);
};
