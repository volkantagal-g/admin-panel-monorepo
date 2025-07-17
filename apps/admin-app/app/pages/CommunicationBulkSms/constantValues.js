import { ACTIVENESS_STATUS, CAMPAIGN_STATUS } from '@app/pages/CommunicationBulkSms/constants';

export const campaignStatus = {
  [CAMPAIGN_STATUS.INITIALIZING]: { en: 'Initializing', tr: 'Oluşturuldu' },
  [CAMPAIGN_STATUS.READY_FOR_DELIVERY]: { en: 'Ready For Delivery', tr: 'Hazır' },
  [CAMPAIGN_STATUS.DELIVERY_IN_PROGRESS]: { en: 'Delivery In Progress', tr: 'Gönderiliyor' },
  [CAMPAIGN_STATUS.COMPLETED]: { en: 'Completed', tr: 'Tamamlandı' },
  [CAMPAIGN_STATUS.CANCELLED]: { en: 'Cancelled', tr: 'İptal Edildi' },
  [CAMPAIGN_STATUS.FAILED]: { en: 'Failed', tr: 'Başarısız' },
};

export const activenessStatus = {
  [ACTIVENESS_STATUS.ACTIVE]: { en: 'Active', tr: 'Aktif' },
  [ACTIVENESS_STATUS.INACTIVE]: { en: 'Inactive', tr: 'İnaktif' },
};
