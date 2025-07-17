export const communicationChannelTypes = {
  1: { en: 'Notification', tr: 'Bildirimler' },
  2: { en: 'SMS', tr: 'SMS' },
  3: { en: 'E-Mail', tr: 'E-Mail' },
};

export const notificationTypes = {
  TXN: { en: 'Transactional', tr: 'İşlemsel' },
  CMPGN: { en: 'Campaign', tr: 'Kampanya' },
};

export const smsDeliveryStatuses = {
  SENDING: { en: 'Sending', tr: 'Gönderiliyor', color: 'gold' },
  SENT: { en: 'Sent', tr: 'Gönderildi', color: 'cyan' },
  DELIVERED: { en: 'Delivered', tr: 'Teslim Edildi', color: 'green' },
  FAILED: { en: 'Failed', tr: 'Başarısız', color: 'red' },
};

export const emailStatuses = {
  1: { en: 'Received', tr: 'Teslim Alındı', color: 'cyan' },
  2: { en: 'Queued', tr: 'Sıraya Alındı', color: 'cyan' },
  3: { en: 'Sent To Provider', tr: 'Sağlayıcıya Gönderildi', color: 'cyan' },
  4: { en: 'In Provider Progress', tr: 'Sağlayıcıya Gönderiliyor', color: 'cyan' },
  5: { en: 'Success', tr: 'Başarılı', color: 'green' },
  6: { en: 'Fail', tr: 'Başarısız', color: 'red' },
  7: { en: 'Open', tr: 'Açık', color: 'gold' },
};

export const emailTypes = {
  TXN: { en: 'Transactional', tr: 'İşlemsel' },
  CMPGN: { en: 'Campaign', tr: 'Kampanya' },
};
