export const EMAIL_STATUS = {
  ACTIVE: 1,
  INACTIVE: 2,
};

export const EMAIL_PROCESS_STATUS = {
  CREATED: 1,
  PRE_PROCESS: 2, // WARMING
  READY: 3,
  IN_PROCESS: 4, // SENDING
  FINISHED: 5,
  CANCEL: 6,
  FAIL: 7,
};

export const EMAIL_ACTIONS = {
  DETAIL: 'DETAIL',
  DUPLICATE: 'DUPLICATE',
  CANCEL: 'CANCEL',
};

export const FILE_UPLOAD_TYPE = {
  CLIENT_IMPORT_TEMPLATE: 'clientImportTemplate',
  EXCLUDED_CLIENT_IMPORT_TEMPLATE: 'excludedClientImportTemplate',
};

export const TEMPLATE_FIELDS = [FILE_UPLOAD_TYPE.CLIENT_IMPORT_TEMPLATE];

export const DATE_FORMAT = 'YYYY/MM/DD HH:mm';

export const SENGRID_URL = 'https://mc.sendgrid.com/design-library/your-designs';
export const SENDER_MAIL_STATE_KEY = 'senderMail';
export const SENDER_NAME_STATE_KEY = 'senderName';
