import * as Yup from 'yup';
import { isNil } from 'lodash';

import {
  COURIER_PLAN_STEP_DONE_STATE,
  COURIER_PLAN_STEP_IN_PROGRESS_STATE,
  COURIER_PLAN_STEP_FAILED_STATE,
  MAX_FILE_COUNT,
  COURIER_PLAN_STEP_COMPLETED_TYPE,
  HIDDEN_SAVE_BUTTON_STEPS,
} from '@app/pages/CourierPlan/constants';

export const validationFns = {
  isFileUploaderReadonly: fileList => fileList?.length === MAX_FILE_COUNT,
  isFinalFileUploaderReadonly: fileList => fileList?.length === MAX_FILE_COUNT,
  isOutputFileEnabled: step => [
    COURIER_PLAN_STEP_IN_PROGRESS_STATE,
    COURIER_PLAN_STEP_FAILED_STATE,
    COURIER_PLAN_STEP_DONE_STATE,
  ].includes(step.state),
  isBackButtonDisabled: step => isNil(step.prev),
  isContinueButtonDisabled: step => isNil(step.next) || step.state !== COURIER_PLAN_STEP_DONE_STATE,
  isLastStep: step => step.key === COURIER_PLAN_STEP_COMPLETED_TYPE,
  hideSaveButton: step => HIDDEN_SAVE_BUTTON_STEPS.includes(step.key),
  isDone: step => step.state === COURIER_PLAN_STEP_DONE_STATE,
};

export const defaultSchema = {
  fileList: Yup.array().max(MAX_FILE_COUNT),
  finalFileList: Yup.array().max(MAX_FILE_COUNT),
};
