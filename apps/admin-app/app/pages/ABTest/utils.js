import moment from 'moment';

import { convertSelectOptions } from '@shared/utils/common';

import { TEST_TYPES, MAX_VARIATIONS_COUNT, MIN_VARIATIONS_COUNT, TEMPLATE_TEST_TYPE } from './constants';

// in map function can be assign old object values accordingly csv and template search test type changes
export const generateVariations = (variationsCount, canFileUpload = false) => Array.from(Array(variationsCount).keys()).map(() => ({
  variationName: '',
  variationFileURL: '',
  variationDescription: '',
  isFileUploadVisible: false,
  canFileUpload,
}));

export const mappedVariationsCounts = (min = MIN_VARIATIONS_COUNT) => Array.from(Array(MAX_VARIATIONS_COUNT - min).keys()).map(item => ({
  label: (item + min).toString(),
  value: item + min,
}));

export const testTypeConstraints = t => ([
  { label: t('global:CSV_UPLOAD_TEST_TYPE'), value: TEST_TYPES.CSV_UPLOAD },
  { label: t('global:TEMPLATE_TEST_TYPE'), value: TEST_TYPES.CLIENT_LIST_TEMPLATE },
]);

export const getInitialValues = (testData = {}) => {
  const initialValues = {
    testName: '',
    testCode: '',
    testDescription: '',
    testStartDate: moment(),
    testEndDate: moment(),
    testType: null,
    templateId: null,
    controlGroupPercentage: 50,
    testGroupPercentage: 50,
    variations: [],
    owners: [],
  };

  const mergedData = {
    ...initialValues,
    ...testData,
  };

  if (testData.owners && testData.owners.length > 0) {
    mergedData.owners = convertSelectOptions(testData.owners);
  }

  if (testData.testStartDate || testData.testEndDate) {
    mergedData.testStartDate = moment(testData.testStartDate);
    mergedData.testEndDate = moment(testData.testEndDate);
  }

  return mergedData;
};

export const getTableRangeColumnRender = dateStr => moment(dateStr).format('YYYY-MM-DD');

export const checkUserEditPermission = ({ owners = [], createdBy = null, userId }) => {
  const ownersSet = new Set(owners);

  if (createdBy === userId) {
    return true;
  }

  if (ownersSet.size > 0 && ownersSet.has(userId)) {
    return true;
  }

  return false;
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
