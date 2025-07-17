import { COMPONENT_TYPE } from '@app/pages/Popup/constants';

export const popupTypeOptions = {
  0: { en: 'Generic', tr: 'Jenerik' },
  1: { en: 'Promo', tr: 'Promosyon' },
  2: { en: 'Legal', tr: 'Legal' },
  3: { en: 'Refer A Friend', tr: 'Arkadaşını Öner' },
};

export const popupStatusTypeOptions = {
  2: { en: 'Active', tr: 'Aktif' },
  1: { en: 'Inactive', tr: 'İnaktif' },
};

export const promoStatusOptions = {
  1: { en: 'Inactive', tr: 'İnaktif' },
  2: { en: 'Active', tr: 'Aktif' },
  3: { en: 'Deleted', tr: 'Silinmiş' },
};

export const requestErrorReasonOptions = {
  INVALID_PATH_VARIABLE: {
    en: 'İnvalid path variable',
    tr: 'Hatalı url parametresi',
  },
  ENTITY_NOT_FOUND: {
    en: 'Popup Not Found',
    tr: 'Popup Bulunamadı',
  },
  ACCESS_DENIED: {
    en: 'Please change selected country',
    tr: 'Bu bildirimi görebilmek için ülke seçimini değiştirmeniz gerekmektedir',
  },
};

export const localsFilteredMerchantListOptions = {
  1: { en: 'Show All Chain Merchants', tr: 'Tüm Zincir İşletmeleri Göster' },
  2: { en: 'Show Specific Chain Merchant', tr: 'Seçili Zincir İşletmesini Göster' },
  3: { en: 'Show Specific Merchant Type', tr: 'Seçili İşletme Tipini Göster' },
};

export const totalOrderCountControllerOptions = {
  1: { en: 'Getir10', tr: 'Getir10' },
  2: { en: 'GetirFood', tr: 'GetirYemek' },
  3: { en: 'GetirMore', tr: 'GetirBüyük' },
  4: { en: 'GetirWater', tr: 'GetirSu' },
  6: { en: 'GetirLocal', tr: 'GetirÇarşı' },
};

export const controllerOptions = {
  1: { en: 'Total Order Count Control', tr: 'Toplam Sipariş Sayısı Kontrolü' },
  2: { en: 'Stock Level Control', tr: 'Stok Seviyesi Kontrolü' },
  3: { en: 'Aggression Level Control', tr: 'Agresiflik Seviyesi Kontrolü' },
  4: { en: 'City And Warehouse Control', tr: 'Şehir ve Depo Kontrolü' },
  5: { en: 'Daily Planner', tr: 'Günlük Planlama' },
};

export const inclusionTypeOptions = {
  1: { en: 'All', tr: 'Tümü' },
  2: { en: 'Any', tr: 'Herhangi biri' },
};

export const componentTypes = {
  // [COMPONENT_TYPE.TOAST_MESSAGE]: { en: 'Toast Popup', tr: 'Toast Popup' },
  [COMPONENT_TYPE.STANDARD]: { en: 'Standard', tr: 'Standart' },
  // [COMPONENT_TYPE.FULL_SCREEN]: { en: 'Full Screen', tr: 'Tam Ekran' },
};
