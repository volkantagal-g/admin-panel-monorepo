export const notificationCenterDomainTypeOptions = {
  1: { en: 'Getir', tr: 'Getir' },
  2: { en: 'GetirFood', tr: 'GetirYemek' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  6: { en: 'GetirLocals', tr: 'GetirÇarşı' },
  7: { en: 'GetirBitaksi', tr: 'GetirBitaksi' },
  8: { en: 'GetirWater Marketplace', tr: 'GetirSuPazaryeri' },
  11: { en: 'GetirJobs', tr: 'Getirİş' },
};

export const statusTypeOptions = {
  1: { en: 'Inactive', tr: 'İnaktif' },
  2: { en: 'Active', tr: 'Aktif' },
};

export const processStatus = {
  1: { en: 'Created', tr: 'Oluşturuldu' },
  2: { en: 'Warming', tr: 'Hazırlanıyor' },
  3: { en: 'Ready', tr: 'Hazır' },
  4: { en: 'Sending', tr: 'Gönderiliyor' },
  5: { en: 'Completed', tr: 'Tamamlandı' },
  6: { en: 'Canceled', tr: 'İptal Edildi' },
  7: { en: 'Failed', tr: 'Hata Aldı' },
};

export const requestErrorReasonOptions = {
  INVALID_PATH_VARIABLE: {
    en: 'İnvalid path variable',
    tr: 'Hatalı url parametresi',
  },
  ENTITY_NOT_FOUND: {
    en: 'NOTIFICATION_CENTER Not Found',
    tr: 'NOTIFICATION_CENTER Bulunamadı',
  },
  ACCESS_DENIED: {
    en: 'You need to change the country selection to see this e-mail.',
    tr: 'Bu e-maili görebilmek için ülke seçimini değiştirmeniz gerekmektedir.',
  },
};
