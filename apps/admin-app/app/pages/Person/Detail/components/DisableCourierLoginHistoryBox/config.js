import moment from 'moment';

import { getLocalDateFormat } from '@shared/utils/localization';
import { getLangKey } from '@shared/i18n';

export const getTableColumns = ({ t }) => {
  return [
    {
      title: t('DATE'),
      dataIndex: 'date',
      key: 'date',
      width: 150,
      render: date => moment(date).format(getLocalDateFormat()),
    },
    {
      title: t('COURIER_LOGIN.REASON'),
      dataIndex: 'reason',
      key: 'reason',
      width: 150,
      render: reason => reason?.[getLangKey()],
    },
    {
      title: t('COURIER_LOGIN.EXPLANATION'),
      dataIndex: 'explanation',
      key: 'explanation',
      width: 150,
    },
  ];
};
