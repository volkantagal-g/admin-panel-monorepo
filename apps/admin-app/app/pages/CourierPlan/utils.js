import { isEqual, isObject, isArray, isEmpty } from 'lodash';
import moment from 'moment';
import { Tag } from 'antd';

import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  GETIR_LOCALS_DOMAIN_TYPE,
  DOMAIN_TYPES,
  GETIR_MARKET_TAG_COLORS,
  TAG_COLORS,
  DEFAULT_DATE_FORMAT,
} from '@shared/shared/constants';
import {
  getLimitAndOffset,
  removeNullOrUndefinedDeep,
} from '@shared/utils/common';

import {
  COURIER_PLAN_STEP_COMPLETED_TYPE,
  COURIER_PLAN_STEP_DONE_STATE,
  COURIER_PLAN_STEP_IN_PROGRESS_STATE,
  COURIER_PLAN_STEP_DRAFT_STATE,
  COURIER_PLAN_STEP_FAILED_STATE,
  COURIER_PLAN_STEP_1_TYPE,
  COURIER_PLAN_STEP_2_TYPE,
  COURIER_PLAN_STEP_3_TYPE,
  COURIER_PLAN_STEP_4_TYPE,
  XLSX_TYPE,
  FILE_DONE_STATUS,
} from './constants';

export const sortCourierPlanSteps = plan => {
  plan.steps.sort((a, b) => (a.prev === null || a.key === b.prev ? -1 : 1));
  return plan;
};

export const findCourierPlanCurrentStep = sortedPlan => {
  const firstIncompleteStep = sortedPlan.steps.find(
    step => step.state !== COURIER_PLAN_STEP_DONE_STATE,
  );
  if (!firstIncompleteStep) {
    return COURIER_PLAN_STEP_COMPLETED_TYPE;
  }
  if (
    [
      COURIER_PLAN_STEP_IN_PROGRESS_STATE,
      COURIER_PLAN_STEP_FAILED_STATE,
    ].includes(firstIncompleteStep.state)
  ) {
    return firstIncompleteStep.key;
  }
  if (firstIncompleteStep.state === COURIER_PLAN_STEP_DRAFT_STATE) {
    return firstIncompleteStep.prev || firstIncompleteStep.key;
  }
  return COURIER_PLAN_STEP_1_TYPE;
};

let warehouseDomainConstraintsArr = [];
export const warehouseDomainConstraints = t => {
  if (warehouseDomainConstraintsArr.length) {
    return warehouseDomainConstraintsArr;
  }
  warehouseDomainConstraintsArr = [
    {
      label: t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_10_DOMAIN_TYPE}`),
      value: [GETIR_10_DOMAIN_TYPE].join(),
      valueForMatching: [GETIR_10_DOMAIN_TYPE],
    },
    {
      label: t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_MARKET_DOMAIN_TYPE}`),
      value: [GETIR_MARKET_DOMAIN_TYPE].join(),
      valueForMatching: [GETIR_MARKET_DOMAIN_TYPE],
    },
    {
      label: t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_VOYAGER_DOMAIN_TYPE}`),
      value: [GETIR_VOYAGER_DOMAIN_TYPE].join(),
      valueForMatching: [GETIR_VOYAGER_DOMAIN_TYPE],
    },
    {
      label: t(`global:GETIR_MARKET_DOMAIN_TYPES:${GETIR_LOCALS_DOMAIN_TYPE}`),
      value: [GETIR_LOCALS_DOMAIN_TYPE].join(),
      valueForMatching: [GETIR_LOCALS_DOMAIN_TYPE],
    },
    {
      label: t('courierPlanPage:MERGE_DOMAIN_TYPE'),
      value: [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE].join(),
      valueForMatching: [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE],
    },
  ];
  return warehouseDomainConstraintsArr;
};

export const isStepOne = step => step.key === COURIER_PLAN_STEP_1_TYPE;

/**
 * Use this to conditionally render-view or logic based on the current step. At a give time, only one of the step will be `true`
 *
 * @param {*} step
 * @returns Map<currentStep>
 *
 * @example
 *
 * const currentStep = getCurrentStep(step);
 *
 * if (currentStep.step1) {
 *  // some logic
 * } else if (currentStep.step2) {
 *  // some logic
 * }
 *
 */
export const getCurrentStep = step => {
  return {
    step1: step.key === COURIER_PLAN_STEP_1_TYPE,
    step2: step.key === COURIER_PLAN_STEP_2_TYPE,
    step3: step.key === COURIER_PLAN_STEP_3_TYPE,
    step4: step.key === COURIER_PLAN_STEP_4_TYPE,
  };
};

export const mapWarehouseDomainTypeOptions = types => types.map(typeString => typeString?.split(',').map(type => parseInt(type, 10)));

export const getWarehouseConstraintsByEquality = ({ domainTypes, t }) => {
  return warehouseDomainConstraints(t)
    .filter(
      item => domainTypes.filter(type => isEqual(item.valueForMatching, type))
        .length > 0,
    )
    .map(item => item.value);
};

export const convertTTPValuesForForm = ({
  ttpRefStartDate,
  ...rest
}) => {
  const convertedTTPValues = { ...rest };

  if (ttpRefStartDate) {
    convertedTTPValues.ttpRefStartDate = ttpRefStartDate.map(date => moment(date));
  }
  return convertedTTPValues;
};

export const formatCourierPlanDetails = ({ plan, t }) => {
  if (!plan) {
    return plan;
  }
  let updatedPlan = { ...plan };
  sortCourierPlanSteps(updatedPlan);
  const currentStep = findCourierPlanCurrentStep(updatedPlan);
  const warehouseDomainType = getWarehouseConstraintsByEquality({
    domainTypes: updatedPlan.properties.warehouseDomainType,
    t,
  });
  updatedPlan = {
    ...updatedPlan,
    currentStep,
    properties: {
      ...updatedPlan.properties,
      warehouseDomainType,
    },
    steps: updatedPlan.steps.map(step => {
      let updatedStep = { ...step };
      if (updatedStep.data?.input?.ttp) {
        updatedStep = {
          ...updatedStep,
          data: {
            ...updatedStep.data,
            input: {
              ...updatedStep.data.input,
              ttp: convertTTPValuesForForm(updatedStep.data.input.ttp),
            },
          },
        };
      }
      return updatedStep;
    }),
  };
  return updatedPlan;
};

async function readFileContent(file) {
  const params = {};
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = e => {
      const fileData = e?.target?.result;
      params.file = fileData;
      params.key = file.name;
      resolve(params);
    };
    reader.onerror = reject;
  });
}

export const getFileParams = async ({ fileList = [], finalFileList = [] }) => {
  let params = {};
  if (fileList.length) {
    params = await readFileContent(fileList[0]);
  }
  if (finalFileList.length) {
    const content = await readFileContent(finalFileList[0]);
    params.finalFile = content.file;
    params.finalKey = content.key;
  }
  return params;
};

export const getProceedCourierPlanRequestParams = async ({
  type,
  step,
  planId,
  capDateRange,
  fileList,
  finalFileList,
}) => {
  const uploadParams = await getFileParams({ fileList, finalFileList });
  const params = {
    planId,
    stepKey: step.key,
    uploadParams,
  };
  // Step 1
  if (type) {
    params.data = { ...params.data, type };
  }
  // Step 3
  if (capDateRange) {
    params.data = { ...params.data, capDateRange };
  }
  return params;
};

export const getTTPRequestParams = async ({ planId, step, data }) => {
  const {
    ttpRefStartDate,
    ttpType,
    fileList,
    finalFileList,
    ...rest
  } = data;
  const params = {
    planId,
    stepKey: step.key,
  };
  const ttp = { ...rest, ttpType };
  let uploadParams = {};
  ttp.ttpRefStartDate = ttpRefStartDate?.map(date => moment(date).format(DEFAULT_DATE_FORMAT));

  if (fileList?.[0]?.status === FILE_DONE_STATUS) {
    ttp.fileName = fileList[0].name;
  }
  else {
    uploadParams = await getFileParams({ fileList });
  }

  if (finalFileList?.[0]?.status === FILE_DONE_STATUS) {
    ttp.finalFileName = finalFileList[0].name;
  }
  else {
    const fParams = await getFileParams({ finalFileList });
    uploadParams = { ...fParams, ...uploadParams };
  }
  return { ...params, uploadParams, data: { ttp } };
};

export const getDefaultFileList = file => (file
  ? [
    {
      uid: '-1',
      name: file,
      status: FILE_DONE_STATUS,
      type: XLSX_TYPE,
    },
  ]
  : []);

export const getFormValuesFromFormik = val => {
  let formValues = {};

  function checkKeyAndSetValue(values, path = '') {
    Object.keys(values).forEach(key => {
      if (isObject(values[key]) && !isArray(values[key])) {
        checkKeyAndSetValue(values[key], path ? `${path}.${key}` : key);
      }
      else {
        formValues = {
          ...formValues,
          [`${path ? `${path}.` : ''}${key}`]: values[key],
        };
      }
    });
  }
  checkKeyAndSetValue(val);

  return formValues;
};

export const getNewCourierPlanRequestParams = requestBody => {
  const planDate = requestBody.planDate.map(date => moment(date).format(DEFAULT_DATE_FORMAT));
  const body = {
    ...requestBody,
    planStartDate: planDate[0],
    planEndDate: planDate[1],
    properties: {
      ...requestBody.properties,
      warehouseDomainType: mapWarehouseDomainTypeOptions(
        requestBody.properties.warehouseDomainType,
      ),
      referenceDay1: requestBody.properties.referenceDay1.map(date => moment(date).format(DEFAULT_DATE_FORMAT)),
      referenceDay2: requestBody.properties.referenceDay2?.map(date => moment(date).format(DEFAULT_DATE_FORMAT)),
      excludedDays: requestBody.properties.excludedDays?.map(date => moment(date).format(DEFAULT_DATE_FORMAT)),
    },
  };
  delete body.planDate;
  if (isEmpty(body.properties.excludedDays)) {
    delete body.properties.excludedDays;
  }
  return removeNullOrUndefinedDeep(body, { removeEmpty: true });
};

export const getCourierPlansRequestBody = ({
  planDate,
  name,
  currentPage,
  rowsPerPage,
}) => {
  const requestBody = {};

  if (planDate && isArray(planDate)) {
    const [startDate, endDate] = planDate;
    requestBody.startDate = moment(startDate).format(DEFAULT_DATE_FORMAT);
    requestBody.endDate = moment(endDate).format(DEFAULT_DATE_FORMAT);
  }

  if (!isEmpty(name)) {
    requestBody.name = name;
  }

  const { limit, offset } = getLimitAndOffset({ currentPage, rowsPerPage });

  requestBody.limit = limit;
  requestBody.offset = offset;
  return requestBody;
};

export const getFormattedCourierPlanDetails = records => {
  let details = [...records];
  details.forEach(sortCourierPlanSteps);
  details = details.map(plan => ({
    ...plan,
    currentStep: findCourierPlanCurrentStep(plan),
    planDate: [plan.planStartDate, plan.planEndDate],
  }));
  return details;
};

export const renderTagForDomainTypes = ({ domainCode, t }) => {
  return domainCode.map(domain => {
    let label = `global:${DOMAIN_TYPES}:${domain[0]}`;
    let color = GETIR_MARKET_TAG_COLORS[DOMAIN_TYPES][domain[0]];
    if (domain.length === 2) {
      label = 'courierPlanPage:MERGE_DOMAIN_TYPE';
      color = TAG_COLORS.default;
    }
    return (
      <Tag key={label} color={color}>
        {t(label)}
      </Tag>
    );
  });
};

export const renderTagForStep = ({ step, t }) => {
  const label = `courierPlanPage:STEP_TYPES:${step}`;
  const color =
    step === COURIER_PLAN_STEP_COMPLETED_TYPE
      ? TAG_COLORS.success
      : TAG_COLORS.warning;
  return (
    <Tag key={label} color={color}>
      {t(label)}
    </Tag>
  );
};

export const isStepActive = (step, currentStep) => currentStep === step.key;

export const isStepFailed = step => step.state === COURIER_PLAN_STEP_FAILED_STATE;

export const isStepDone = step => step.state === COURIER_PLAN_STEP_DONE_STATE;

export const getStepTagColor = step => (isStepFailed(step) ? TAG_COLORS.danger : TAG_COLORS.success);

export const getPublishCourierPlanRequestParams = ({
  publishType,
  planId,
}) => ({
  publishType: parseInt(publishType, 10),
  planId,
});

export const getUpdatedExcludedDays = ({
  excludedDays,
  referenceDay1,
  referenceDay2,
}) => {
  if (!excludedDays?.length || referenceDay1?.length !== 2) {
    return [];
  }
  const [startDay1, endDay1] = referenceDay1;
  let startDay2;
  let endDay2;
  if (referenceDay2?.length === 2) {
    [startDay2, endDay2] = referenceDay2;
  }
  return excludedDays.filter(day => {
    const isInReferenceDay1 =
      day >= startDay1 && moment(day).startOf('day') <= endDay1;
    const isInReferenceDay2 =
      startDay2 && endDay2
        ? day >= startDay2 && moment(day).startOf('day') <= endDay2
        : true;
    return isInReferenceDay1 || isInReferenceDay2;
  });
};
