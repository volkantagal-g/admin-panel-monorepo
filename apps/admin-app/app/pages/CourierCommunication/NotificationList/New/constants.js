import { useTranslation } from 'react-i18next';

export const Languages = ['tr', 'en', 'nl', 'de', 'fr', 'es', 'it', 'pt', 'en-US'];

export const ChannelOptions = () => {
  const { t } = useTranslation(['courierCommunication']);

  return [
    {
      label: t('PUSH_NOTIFICATION'),
      value: 'push',
      disabled: false,
    },
    {
      label: t('APP_NOTIFICATION'),
      value: 'app',
      disabled: true,
    },
  ];
};

export const priorityOptions = {
  100: { en: 'Normal', tr: 'Normal' },
  200: { en: 'Urgent', tr: 'Acil' },
};

export const statusOptions = {
  100: { en: 'Pending', tr: 'Bekliyor' },
  200: { en: 'Running', tr: 'Koşma' },
  300: { en: 'Completed', tr: 'Tamamlanmış' },
  400: { en: 'Failed', tr: 'Arızalı' },
};

export const CATEGORY_FIELDS = 'name';

export const WAREHOUSE_REQUEST_FIELDS = '_id name';

export const NOTIFICATION_COURIER_CHOOSE_TYPES = {
  WAREHOUSE_CHOOSE: 'warehouse-choose',
  CSV_UPLOAD: 'csv-upload',
};
