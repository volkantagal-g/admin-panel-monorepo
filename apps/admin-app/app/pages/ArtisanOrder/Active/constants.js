export const artisanActiveOrderStatusesWithQueue = [
  { tr: 'Sıraya Alındı', en: 'Queued', value: 0 },
  {
    tr: 'İleri Tarihli Sipariş Onayı Bekleniyor',
    en: 'Scheduled Verifying',
    value: 325,
  },
  { tr: 'İleri Tarihe Planlandı', en: 'Scheduled', value: 350 },
  { tr: 'Onay Bekleniyor', en: 'Verifying', value: 400 },
  { tr: 'Hazırlanıyor', en: 'Preparing', value: 500 },
  { tr: 'Hazırlandı', en: 'Prepared', value: 550 },
  { tr: "Runner'a Teslim Ediliyor", en: 'Handover To Runner', value: 560 },
  { tr: 'Runner Teslim Aldı', en: 'On Runner', value: 570 },
  { tr: 'Kurye Onayı Bekleniyor', en: 'Handover', value: 600 },
  { tr: 'Müşteriye Gidiyor', en: 'Onway', value: 700 },
  { tr: 'Adrese Ulaştı', en: 'Reached', value: 800 },
];

export const lastActivityDiff = [
  { name: '0-20', value: '0-20' },
  { name: '20-40', value: '20-40' },
  { name: '40-60', value: '40-60' },
  { name: '60+', value: '60-999999999' },
];

export const courierDomainTypes = [
  { name: 'DEDICATED', value: 6 },
  { name: 'POOL', value: 0 },
];
