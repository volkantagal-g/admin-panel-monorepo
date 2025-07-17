import * as Yup from 'yup';

import { getLangKey } from '@shared/i18n';
import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export const defaultValues = {
  domainTypes: [],
  name: {},
  description: '',
  substituteFor: null,
  isSubCategory: false,
  isCategoryOfTheWeek: false,
  parent: '',
};

export const validationSchema = values => {
  return Yup.object()
    .shape({
      domainTypes: Yup.array().min(1).required(),
      name: YupMultiLanguage.string({ isRequired: true }),
      description: Yup.string()
        .trim()
        .required(),
      isSubCategory: Yup.boolean(),
      isCategoryOfTheWeek: Yup.boolean(),
      parent: values.isSubCategory && Yup.string().required(),
    });
};

export const getParentCategoryOptions = parentCategories => {
  return parentCategories
    .filter(parentCategory => parentCategory?.parent?._id === undefined)
    .map(parentCategory => {
      return {
        value: parentCategory?._id,
        label: parentCategory?.name[getLangKey()],
      };
    });
};

export const getModifiedValues = values => {
  const domainTypes = values.domainTypes.map(domainType => {
    return Number(domainType);
  });
  const newValues = {
    ...values,
    domainTypes,
  };

  if (newValues.isSubCategory) {
    delete newValues.substituteFor;
  }
  else {
    delete newValues.parent;
  }

  return newValues;
};
