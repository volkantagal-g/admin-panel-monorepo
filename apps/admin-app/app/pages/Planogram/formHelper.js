import { toString, get } from 'lodash';
import * as Yup from 'yup';

import { getLangKey } from '@shared/i18n';
import { isObjectIdValid, getRegexForCaseSensitiveLetters } from '@shared/utils/common';

export const initialValues = {
  planogramCategoryName: undefined,
  storageType: undefined,
};

export const validationSchema = () => {
  return Yup.object().shape({
    planogramCategoryName: Yup.string().required(),
    storageType: Yup.string().required(),
  });
};

const formatLabelText = (data, name) => {
  const itemName = data.name?.[getLangKey()];
  const labelText = name ? `${itemName} / ${name}` : itemName;

  if (data?.parent) {
    return formatLabelText(data?.parent, labelText);
  }

  return labelText;
};

export const formatDataForSelect = data => data?.map(item => ({ value: item._id, label: formatLabelText(item) }));

export const createNestedCategoriesData = (
  data,
  childItem,
  countryCode,
  level,
) => {
  const newLevel = data?.level || level - 10;
  const newItem = childItem
    ? {
      id: data._id,
      name: data.name,
      masterCategoryLevel: newLevel,
      child: { ...childItem },
    }
    : { name: data.name, id: data._id, masterCategoryLevel: newLevel };

  if (data?.parent) {
    return createNestedCategoriesData(
      data?.parent,
      newItem,
      countryCode,
      newLevel,
    );
  }

  return newItem;
};

export const findDeepChildId = data => {
  if (data?.child) {
    return findDeepChildId(data.child);
  }
  return data?.id;
};

export const getDeepDifferenceBetweenArrays = (
  formattedCategories,
  categoriesData,
) => {
  const filteredData = [];
  for (let i = 0; i < formattedCategories.length; i += 1) {
    let isCategoryAlreadyAvailable = false;
    categoriesData.forEach(category => {
      if (
        findDeepChildId(category) === findDeepChildId(formattedCategories[i])
      ) {
        isCategoryAlreadyAvailable = true;
      }
    });

    if (!isCategoryAlreadyAvailable) {
      filteredData.push(formattedCategories[i]);
    }
  }

  return filteredData;
};

export const formatSelectedCategories = (data, categoriesData) => {
  let formattedCategories = data?.map(item => createNestedCategoriesData(item));

  if (categoriesData.length) {
    const filteredFormattedCategories = getDeepDifferenceBetweenArrays(formattedCategories, categoriesData);
    formattedCategories = filteredFormattedCategories;
  }

  return formattedCategories;
};

export const getCustomDomainTypeOptions = customDomainTypes => customDomainTypes?.map(type => ({
  value: type?.key,
  label: type?.name[getLangKey()],
}));

export const selectFormatter = data => data?.map(item => ({ value: item.id, label: item.name }));

export const getSelectFilterOption = (_inputValue = '', option = {}, isIdSearchable = false, searchTerm = 'label', key = 'value') => {
  const keyValue = toString(get(option, key)) || '';
  const label = toString(get(option, searchTerm)) || toString(option.children) || '';
  const inputValue = toString(_inputValue);
  const ids = inputValue.split(',').map(id => id.trim()).filter(id => isObjectIdValid(id));
  const inputValueRegex = getRegexForCaseSensitiveLetters(inputValue);
  const matchedWords = label.match(inputValueRegex);
  let isMatched = !!get(matchedWords, 'length');
  if (isIdSearchable && ids.length) {
    isMatched = ids.includes(keyValue);
  }
  if (isIdSearchable && isObjectIdValid(keyValue) && keyValue === _inputValue) {
    isMatched = keyValue === _inputValue;
  }
  return isMatched;
};
