export const SMS_STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
};

export const PROCESS_STATUS = {
  CREATED: 1,
  PRE_PROCESS: 2, // IN PROGRESS
  READY: 3,
  IN_PROCESS: 4, // SENDING
  FINISHED: 5,
  CANCEL: 6,
  FAIL: 7,
};

export const REQUEST_ERROR_REASON = {
  INVALID_PATH_VARIABLE: 'INVALID_PATH_VARIABLE',
  ENTITY_NOT_FOUND: 'ENTITY_NOT_FOUND',
  WRONG_COUNTRY_SELECTION: 'ACCESS_DENIED',
};

export const FILE_UPLOAD_TYPE = {
  USER_LIST: 'clientImportTemplate',
  EXCLUDED_USER_LIST: 'excludedClientImportTemplate',
};

export const TEMPLATE_FIELDS = [FILE_UPLOAD_TYPE.USER_LIST];

export const DATE_FORMAT = 'YYYY/MM/DD HH:mm';

export const SMS_ACTIONS = {
  DETAIL: 'DETAIL',
  DUPLICATE: 'DUPLICATE',
  CANCEL: 'CANCEL',
};

export const SENDER_SMS = [{ label: 'info@getir.com', value: 'info@getir.com' }];
export const SENDER_NAME = [{ label: 'Getir', value: 'Getir' }];
