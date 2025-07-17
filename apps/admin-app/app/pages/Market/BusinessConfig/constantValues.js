import { marketBusinessConfigFields, marketBusinessConfigDomains } from './constants';

export const marketBusinessConfigFieldValues = {
  [marketBusinessConfigFields.MESSAGES]: {
    en: 'Messages',
    tr: 'Mesajlar',
  },
  [marketBusinessConfigFields.BATCH_QUEUE_TIME_ESTIMATION]: {
    en: 'Batching & Queue & Time Estimation',
    tr: 'Sipariş Birleştirme & Kuyruk & Tahmini Süre',
  },
  [marketBusinessConfigFields.MANUAL_WAREHOUSE_AGGRESSION_LEVELS]: {
    en: 'Agression Level Settings',
    tr: 'Agresiflik Seviyesi Ayarları',
  },
};

export const marketBusinessConfigDomainValues = {
  [marketBusinessConfigDomains.GETIR10]: {
    en: 'Getir10',
    tr: 'Getir10',
  },
  [marketBusinessConfigDomains.MARKET]: {
    en: 'GetirMore',
    tr: 'GetirBüyük',
  },
  [marketBusinessConfigDomains.WATER]: {
    en: 'GetirWater',
    tr: 'GetirSu',
  },
};
