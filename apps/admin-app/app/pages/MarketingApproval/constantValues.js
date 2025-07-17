import { ASSET, STATUS } from '@app/pages/MarketingApproval/constants';

export const assetTypes = { [ASSET.NOTIFICATION]: { en: 'Notification', tr: 'Notification' } };
export const statusTypes = {
  [STATUS.FAILED]: { en: 'Failed', tr: 'Başarısız' },
  [STATUS.IN_PROGRESS]: { en: 'In Progress', tr: 'Devam Ediyor ' },
  [STATUS.WAITING]: { en: 'Waiting', tr: 'Bekliyor' },
  [STATUS.SUCCESS]: { en: 'Done', tr: 'Başarılı' },
  [STATUS.SENDING]: { en: 'Sending', tr: 'Gönderiliyor' },
};
