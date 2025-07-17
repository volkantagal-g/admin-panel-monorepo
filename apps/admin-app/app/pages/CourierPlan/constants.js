export const COURIER_PLAN_STEP_DRAFT_STATE = 1;
export const COURIER_PLAN_STEP_IN_PROGRESS_STATE = 2;
export const COURIER_PLAN_STEP_DONE_STATE = 3;
export const COURIER_PLAN_STEP_FAILED_STATE = 4;

export const COURIER_PLAN_STEP_1_TYPE = 1;
export const COURIER_PLAN_STEP_2_TYPE = 2;
export const COURIER_PLAN_STEP_3_TYPE = 3;
export const COURIER_PLAN_STEP_4_TYPE = 4;
export const COURIER_PLAN_STEP_COMPLETED_TYPE = COURIER_PLAN_STEP_4_TYPE;

export const FORECAST_TYPE = Object.freeze({
  Data: 1,
  Hybrid: 2,
  Operational: 3,
});

export const CSV_TYPES = 'text/csv, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
export const XLSX_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const TTP_CRITERIA_QUEUE = 1;
export const TTP_CRITERIA_BATCH = 2;
export const TTP_CRITERIA_DURATION = 3;
export const TTP_CRITERIA_TYPES = [
  TTP_CRITERIA_QUEUE,
  TTP_CRITERIA_BATCH,
  TTP_CRITERIA_DURATION,
];

export const MAX_FILE_COUNT = 1;

export const PUBLISH_TYPE_STANDARD = 1;
export const PUBLISH_TYPE_SCHEDULED_IMPLEMENTED = 2;
export const PUBLISH_TYPES = [
  PUBLISH_TYPE_STANDARD,
  PUBLISH_TYPE_SCHEDULED_IMPLEMENTED,
];

export const HIDDEN_SAVE_BUTTON_STEPS = [COURIER_PLAN_STEP_4_TYPE];

export const DATA_TTP_TYPE = 1;
export const OPTIMAL_TTP_TYPE = 2;
export const TTP_TYPES = [DATA_TTP_TYPE, OPTIMAL_TTP_TYPE];
export const FILE_DONE_STATUS = 'done';

export const PLAN_TYPES = [
  1, // Conservative
  2, // Aggressive
];
