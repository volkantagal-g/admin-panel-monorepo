import { set, get, cloneDeep } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { getLangDataOfItem } from '@shared/utils/multiLanguage';
import { createMap } from '@shared/utils/common';

export const getDescriptionTagOptions = (tags = []) => {
  return tags.map(tag => {
    return {
      value: get(tag, '_id', ''),
      label: get(tag, ['name', getLangKey()], ''),
    };
  });
};

export const getModifiedInitialValues = (values, _tags) => {
  const tagsMap = createMap(_tags);
  const tags = values.tags.map(tagId => {
    return {
      value: tagId,
      label: get(tagsMap, [tagId, 'name', getLangKey()]),
    };
  });

  const newValues = { ...values, tags };
  return newValues;
};

export const getModifiedValues = (values, checkboxes, marketProduct) => {
  const tags = values.tags.map(tag => {
    return tag.value;
  });

  const newValues = {
    ...(checkboxes.description && { description: values.description }),
    ...(checkboxes.tags && { tags }),
    ...(checkboxes.ingredients && { ingredients: values.ingredients }),
    ...(checkboxes.picURL && { picURL: values.picURL }),
    ...(checkboxes.widePicURL && { widePicURL: values.widePicURL }),
    ...(checkboxes.additionalPropertyTables && { additionalPropertyTables: values.additionalPropertyTables }),
    ...(checkboxes.hfssInfo && { hfssInfo: values.hfssInfo }),
  };

  const additionalInfosPath = 'details.additionalInfos';

  if (checkboxes.additionalInfos && checkboxes.usage) {
    const details = get(values, 'details', {});
    set(newValues, 'details', cloneDeep(details));
    const additionalInfos = get(values, additionalInfosPath);
    set(newValues, additionalInfosPath, cloneDeep(additionalInfos));
  }
  else {
    if (checkboxes.additionalInfos) {
      const originalDetails = get(marketProduct, 'details', {});
      set(newValues, 'details', cloneDeep(originalDetails));
      const additionalInfos = get(values, additionalInfosPath);
      set(newValues, additionalInfosPath, cloneDeep(additionalInfos));
    }

    if (checkboxes.usage) {
      const originalDetails = get(marketProduct, 'details');
      set(newValues, 'details', cloneDeep(originalDetails));
      const usage = get(values, 'details.usage');
      set(newValues, 'details.usage', cloneDeep(usage));
    }
  }
  return newValues;
};

export const getInitialValues = (data, tags, marketProduct) => {
  const initialValues = {
    description: getLangDataOfItem(data, ['description'], ''),
    tags: get(data, 'tags', []),
    ingredients: getLangDataOfItem(data, ['ingredients'], ''),
    details: {
      ...(get(marketProduct, 'details', {})),
      usage: getLangDataOfItem(data, ['details', 'usage'], ''),
      additionalInfos: getLangDataOfItem(data, ['details', 'additionalInfos'], ''),
    },
    picURL: getLangDataOfItem(data, ['picURL'], ''),
    widePicURL: getLangDataOfItem(data, ['widePicURL'], ''),
    additionalPropertyTables: get(data, 'additionalPropertyTables', []),
    hfssInfo: {
      ...(marketProduct?.hfssInfo || {}),
      hfssIndicator: data?.hfssInfo?.hfssIndicator,
      hfssFoodOrDrink: data?.hfssInfo?.hfssFoodOrDrink,
      hfssFoodCategory: data?.hfssInfo?.hfssFoodCategory,
      hfssNutrientProfileScore: data?.hfssInfo?.hfssNutrientProfileScore,
    },
  };
  return getModifiedInitialValues(initialValues, tags);
};
