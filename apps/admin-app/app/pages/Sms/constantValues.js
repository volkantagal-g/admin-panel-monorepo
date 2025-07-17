export const statusTypeOptions = {
  1: { en: 'Active', tr: 'Aktif' },
  2: { en: 'Inactive', tr: 'İnaktif' },
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
    en: 'SMS Not Found',
    tr: 'SMS Bulunamadı',
  },
  ACCESS_DENIED: {
    en: 'You need to change the country selection to see this e-mail.',
    tr: 'Bu e-maili görebilmek için ülke seçimini değiştirmeniz gerekmektedir.',
  },
};
