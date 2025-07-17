import moment from 'moment';

import { t } from '@shared/i18n';
import { getLocalDateTimeFormat } from '@shared/utils/localization';

export const tableColumns = () => {
  const columns = [
    {
      title: '#',
      dataIndex: '_id',
      key: '_id',
      render: (_item, _record, index) => `${index + 1}.`,
      width: 200,
    },
    {
      title: t('franchiseLegalPage:DETAIL.DATE_OF_SENT_NOTIFICATION'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: createdAt => moment(createdAt).format(getLocalDateTimeFormat()),
    },
  ];

  return columns;
};
