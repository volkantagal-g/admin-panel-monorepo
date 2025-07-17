import { cloneDeep, difference } from 'lodash';

import { PARAMETER_TYPE } from '../constants';
import { TAG_VALUE_SEPARATOR } from './components/ReportTypeForm/formUtils';

// remove fakeKeys added for UI
// parameters array and dropdownOptions array has fakeKeys for form management
export function getCleanData(data, prevTags = []) {
  const newData = cloneDeep(data);
  // remove fakeKeys and unnecessary dropdownOptions
  if (newData?.parameters?.length) {
    newData.parameters.forEach((param, pIndex) => {
      delete newData.parameters[pIndex].fakeKey;
      if (param.type !== PARAMETER_TYPE.dropdown) {
        // remove unnecessary dropdownOptions
        delete newData.parameters[pIndex].dropdownOptions;
        delete newData.parameters[pIndex].isMultiSelect;
      }
      if (param.type === PARAMETER_TYPE.dropdown) {
        param.dropdownOptions.forEach((option, dIndex) => {
          delete newData.parameters[pIndex].dropdownOptions[dIndex].fakeKey;
        });
      }
    });
  }

  let addedTags = [];
  let removedTags = [];
  // tags may not be changed, so it wouldn't come up here
  if (newData.reportTags) {
    // Get the id from custom tag value string for UI purposes, "id<sep>color<sep>..."
    const newTags = newData.reportTags.map(tag => getReportTagIdFromCustomValue(tag));
    addedTags = difference(newTags, prevTags);
    removedTags = difference(prevTags, newTags);
    delete newData.reportTags;
  }

  return [newData, addedTags, removedTags];
}
// for passing a custom value to tag render
export function getCustomTagValue(rt, canClose) {
  return `${rt._id}${TAG_VALUE_SEPARATOR}${rt.backgroundColor}${TAG_VALUE_SEPARATOR}${rt.textColor}${TAG_VALUE_SEPARATOR}${canClose}`;
}

export function getReportTagIdFromCustomValue(value) {
  return value.split(TAG_VALUE_SEPARATOR)[0];
}
