import FAIL_REASON from '@app/pages/Sms/Detail/components/StatisticModal/constant';

export const smsStatisticsFailReason = {
  [FAIL_REASON.LANGUAGE_MISMATCH]: {
    tr: 'Kullanıcı dili eşleşmiyor',
    en: "Client language doesn't match",
  },
  [FAIL_REASON.CLIENT_COUNTRY_NOT_FOUND]: {
    tr: 'Kullanıcı ülkesi bulunamadı',
    en: 'Client country not found',
  },
  [FAIL_REASON.TARGET_COUNTRY_MISMATCH]: {
    tr: 'Ülke uyuşmazlığı',
    en: 'Client country mismatch',
  },
  [FAIL_REASON.TARGET_COUNTRY_NOT_FOUND]: {
    tr: 'Hedef ülke bulunamadı',
    en: 'Target country not found',
  },
  [FAIL_REASON.MARKET_SERVICE_ERROR]: {
    tr: 'İletişim Tercihi alınamadı',
    en: 'Communication Preference cannot be retrieved',
  },
  [FAIL_REASON.PERMISSION_NOT_FOUND]: {
    tr: "İletişim izni database'de bulunmuyor",
    en: 'Communication permission does not exist in database',
  },
  [FAIL_REASON.CLIENT_LANGUAGE_EMPTY]: {
    tr: 'Kullanıcı uygulama dili bulunamadı',
    en: 'Client app language is empty',
  },
  [FAIL_REASON.GIVEN_LANGUAGE_EMPTY]: {
    tr: 'Panel kampanya dili bulunamadı',
    en: 'Panel app language is empty',
  },
  [FAIL_REASON.SMS_NOT_ALLOWED]: {
    tr: "SMS'e izin verilmiyor",
    en: 'Client SMS is not allowed',
  },
  [FAIL_REASON.SMS_USER_DAILY_LIMIT_EXCEED]: {
    tr: 'SMS Günlük limit aşıldı',
    en: 'SMS User Daily limit exceed',
  },
  [FAIL_REASON.CLIENT_NOT_FOUND]: {
    tr: 'Kullanıcı bulunamadı',
    en: 'Client not found',
  },
  [FAIL_REASON.STOCK_IS_NOT_AVAILABLE]: {
    tr: 'Stok uygun değil',
    en: 'Stock is not available',
  },
  [FAIL_REASON.AGGRESSION_LEVEL_NOT_DESIRED]: {
    tr: 'Agresiflik seviyesi uygun değil',
    en: "Aggression level doesn't match",
  },
  [FAIL_REASON.WAREHOUSE_NOT_FOUND]: {
    tr: 'Kullanıcının deposu bulunamadı',
    en: 'Warehouse not found for client',
  },
  [FAIL_REASON.USER_DAILY_LIMIT_EXCEED]: {
    tr: 'Günlük limit aşıldı',
    en: 'Client daily cap exceed',
  },
  [FAIL_REASON.DOMAIN_TYPE_LIMIT_EXCEED]: {
    tr: 'Hizmet limiti aşıldı',
    en: 'Client service cap exceed',
  },
  [FAIL_REASON.USER_DAY_LIMIT_EXCEED]: {
    tr: 'Sıklık limiti aşıldı',
    en: 'Client frequency cap exceed',
  },
  [FAIL_REASON.TARGET_WAREHOUSE_MISMATCH]: {
    tr: 'Depo uyuşmazlığı',
    en: 'Client warehouse mismatch',
  },
  [FAIL_REASON.TARGET_RESTAURANT_MISMATCH]: {
    tr: 'Restoran uyuşmazlığı',
    en: 'Client restaurant mismatch with target restaurants',
  },
  [FAIL_REASON.TARGET_TRADESMAN_MISMATCH]: {
    tr: 'Hedef esnaf uyuşmazlığı',
    en: 'Client tradesman mismatch with target tradesman',
  },
  [FAIL_REASON.GLOBAL_TIME_INVALID]: {
    tr: 'Global saatler geçerli değil',
    en: 'Global time is invalid',
  },
  [FAIL_REASON.PROMO_DISABLE]: {
    tr: 'Kampanya aktif değil',
    en: 'Promo is inactive',
  },
  [FAIL_REASON.GLOBAL_TIME_EXCEED]: {
    tr: 'Gönderim zamanı Global saatler ile eşleşmiyor',
    en: 'Global time is exceed',
  },
  [FAIL_REASON.PUSH_TOKEN_IS_EMPTY]: {
    tr: "Kullanıcı push token'ı bulunamadı",
    en: 'Client push token is empty',
  },
  [FAIL_REASON.WAREHOUSEID_NOT_VALID]: {
    tr: 'WarehouseId geçerli değil',
    en: 'WarehouseId not valid',
  },
  [FAIL_REASON.CLIENT_CITY_NOT_FOUND]: {
    tr: 'Kullanıcı şehri bulunamadı',
    en: 'Client city not found',
  },
  [FAIL_REASON.TARGET_CITY_MISMATCH]: {
    tr: 'Şehir uyuşmazlığı',
    en: 'Client city mismatch',
  },
  [FAIL_REASON.TARGET_HEXAGONID_MISMATCH]: {
    tr: 'Restoran ve Kullanıcı HexagonId uyuşmazlığı',
    en: 'Client HexagonId mismatch',
  },
  [FAIL_REASON.DEVICE_TYPE_INVALID]: {
    tr: 'Cihaz Türü geçersiz',
    en: 'Device Type is invalid',
  },
  [FAIL_REASON.DAILY_HARD_CAP]: {
    tr: 'Günlük zorunlu limite ulaşıldı',
    en: 'Daily Hard Cap exceed',
  },
  [FAIL_REASON.DAILY_SERVICE_CAP]: {
    tr: 'Günlük zorunlu servis limitine ulaşıldı',
    en: 'Daily Service Cap exceed',
  },
  [FAIL_REASON.INCORRECT_NUMBER]: {
    tr: 'Geçersiz Numara',
    en: 'Incorrect Number',
  },
  [FAIL_REASON.REPEATED_MESSAGE]: {
    tr: 'Tekrar eden mesaj',
    en: 'Repeated Message',
  },
  [FAIL_REASON.BLACKLIST]: {
    tr: 'Numara kara listede ',
    en: 'Number is in blacklist',
  },
  [FAIL_REASON.IYS_ERROR]: {
    tr: 'IYS hatası alındı',
    en: 'IYS error',
  },
  [FAIL_REASON.CLIENT_NOT_REACHABLE]: {
    tr: 'Müşteriye ulaşılamıyor',
    en: 'Client number is not reachable',
  },
  [FAIL_REASON.IYS_ACCOUNT_ERROR]: {
    tr: 'IYS hesap hatası',
    en: 'IYS account error',
  },
  [FAIL_REASON.MESSAGE_PRICE_EXCEEDS]: {
    tr: 'Max fiyat eşiği aşıldı',
    en: 'Max price has been exceeded',
  },
  [FAIL_REASON.SENDING_LIMIT]: {
    tr: 'Hizmet sağlayıcı gönderim limiti hatası ',
    en: 'Provider sending limit is exceeded',
  },
  [FAIL_REASON.PROVIDER_ERROR]: {
    tr: 'Hizmet sağlayıcı hatası',
    en: 'Provider error',
  },
};
