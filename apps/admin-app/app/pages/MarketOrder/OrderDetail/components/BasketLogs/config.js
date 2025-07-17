import { getLangKey } from '@shared/i18n';
import { getTime } from '@shared/utils/dateHelper';

export const getTableColumns = t => [
  {
    title: t('BASKET_LOGS.TIME'),
    dataIndex: 'date',
    width: 100,
    render: date => getTime(date),
  },
  {
    title: t('BASKET_LOGS.ACTION'),
    dataIndex: 'message',
    width: 300,
    render: message => message[getLangKey()],
  },
  {
    title: t('BASKET_LOGS.DETAIL'),
    dataIndex: 'detail',
    key: 'detail',
  },
];
