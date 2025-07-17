export const parseRows = rows => {
  if (!rows) return [];
  return Object.keys(rows)
    .map((key, index) => index + 1);
};

export const getDetailPageTitle = serviceType => {
  let title = '';
  if (serviceType === 1) {
    title = 'NOTIFICATION_CALLBACK_URLS_DETAIL';
  }
  else if (serviceType === 2) {
    title = 'SMS_CALLBACK_URLS_DETAIL';
  }
  else if (serviceType === 3) {
    title = 'EMAIL_CALLBACK_URLS_DETAIL';
  }
  return title;
};
