import { isNaN } from 'lodash';

import { TIME_UNITS } from './constants';

export const constructTagsArray = ({ tagsTr, tagsEn }) => {
  const constructedTagsArray = [];

  for (let i = 0; i < tagsTr.length; i++) {
    const tag = {
      trText: tagsTr[i].text,
      enText: tagsEn[i].text,
      type: tagsTr[i].type,
      key: `tag-${i}-${tagsTr[i].type}`,
    };

    constructedTagsArray.push(tag);
  }

  return constructedTagsArray;
};

export const restructureTagsForSubmit = tagsArray => {
  const tagsTr = [];
  const tagsEn = [];

  for (let i = 0; i < tagsArray.length; i++) {
    const tag = tagsArray[i];

    tagsTr.push({
      text: tag.trText,
      type: tag.type,
    });

    tagsEn.push({
      text: tag.enText,
      type: tag.type,
    });
  }

  return {
    tr: tagsTr,
    en: tagsEn,
  };
};

export const getServingsAddonAfter = ({ value, t }) => {
  if (!value || isNaN(Number(value))) {
    return t('DETAILS.TAGS.SERVINGS');
  }

  if (Number(value) === 1) {
    return t('DETAILS.TAGS.SERVING');
  }

  return t('DETAILS.TAGS.SERVINGS');
};

export const getTimeUnitAddonAfter = ({ value, t, timeUnit }) => {
  if (!value || isNaN(Number(value))) {
    if (timeUnit === TIME_UNITS.MINUTE) {
      return t('DETAILS.TAGS.MINUTES');
    }
    return t('DETAILS.TAGS.HOURS');
  }

  if (value === 1) {
    if (timeUnit === TIME_UNITS.MINUTE) {
      return t('DETAILS.TAGS.MINUTE');
    }
    return t('DETAILS.TAGS.HOUR');
  }

  if (timeUnit === TIME_UNITS.MINUTE) {
    return t('DETAILS.TAGS.MINUTES');
  }
  return t('DETAILS.TAGS.HOURS');
};
