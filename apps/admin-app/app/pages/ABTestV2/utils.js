import moment from 'moment';

import { convertSelectOptions } from '@shared/utils/common';

import { MAX_VARIATIONS_COUNT, MIN_VARIATIONS_COUNT, TEMPLATE_TEST_TYPE } from './constants';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';

// in map function can be assign old object values accordingly csv and template search test type changes
export const generateVariations = (variationsCount, canFileUpload = false) => Array.from(Array(variationsCount).keys()).map(() => ({
  variationName: '',
  variationDescription: '',
  isFileUploadVisible: false,
  canFileUpload,
}));

export const mappedVariationsCounts = (min = MIN_VARIATIONS_COUNT) => Array.from(Array(MAX_VARIATIONS_COUNT - min).keys()).map(item => ({
  label: (item + min).toString(),
  value: item + min,
}));

export const getInitialValues = (testData = {}) => {
  const initialValues = {
    testName: '',
    experimentMotivation: '',
    description: '',
    testStartDate: moment(),
    testEndDate: moment(),
    testDomain: null,
    templateId: null,
    templateName: null,
    variations: [],
    _id: '',
    owners: [],
    excludeDate: [],
  };

  const mergedData = {
    ...initialValues,
    ...testData,
  };

  if (testData.owners && testData.owners.length > 0) {
    mergedData.owners = convertSelectOptions(testData.owners, { valueKey: 'id' });
  }

  if (testData.testStartDate && testData.testEndDate) {
    mergedData.testStartDate = moment(testData.testStartDate);
    mergedData.testEndDate = moment(testData.testEndDate);
  }
  return mergedData;
};

export const getTableRangeColumnRender = dateStr => moment(dateStr).format('YYYY-MM-DD');

export const checkUserEditPermission = ({ owners = [], createdBy = null, userId }) => {
  const ownerSet = new Set(owners);

  if (createdBy === userId) {
    return true;
  }

  if (ownerSet.size > 0 && ownerSet.has(userId)) {
    return true;
  }

  return false;
};

export const validateExcludeDate = (testEndDate, testStartDate, excludeDate = [], t) => {
  const current = moment().format(DEFAULT_DATE_FORMAT);
  let errorMessage = null;

  if (!current) errorMessage = t('EXCLUDE_ERRORS.DATE_ERROR');
  else if (
    excludeDate?.length > 0 &&
    excludeDate.some(
      date => moment(date.startDate).format(DEFAULT_DATE_FORMAT) <
          moment(testStartDate).format(DEFAULT_DATE_FORMAT) ||
        moment(date.endDate).format(DEFAULT_DATE_FORMAT) >
          moment(testEndDate).format(DEFAULT_DATE_FORMAT),
    )
  ) {
    errorMessage = t('EXCLUDE_ERRORS.CHECK_DATE_RANGE');
  }
  else if (excludeDate && excludeDate?.length > 0) {
    const duplicates = excludeDate.some((object, item) => {
      return excludeDate.some(
        (element, index) => item !== index &&
          moment(element.startDate).format(DEFAULT_DATE_FORMAT) ===
            moment(object.startDate).format(DEFAULT_DATE_FORMAT) &&
          moment(element.endDate).format(DEFAULT_DATE_FORMAT) ===
            moment(object.endDate).format(DEFAULT_DATE_FORMAT),
      );
    });
    if (duplicates) errorMessage = t('EXCLUDE_ERRORS.CANT_DEFINED_SAME_DAYS');
  }
  if (excludeDate?.length < 1) errorMessage = null;
  return errorMessage;
};

export const disabledDate = testEndDate => current => {
  return current && current > moment(testEndDate).add(6, 'months');
};

export const getDisabledDateByTestType = testType => {
  if (testType !== TEMPLATE_TEST_TYPE) {
    return null;
  }

  return current => current && current < moment().endOf('day');
};
