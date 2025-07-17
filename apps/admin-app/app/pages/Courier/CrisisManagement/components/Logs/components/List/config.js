import moment from 'moment';

import { getLocalDateTimeFormat } from '@shared/utils/localization';

export const tableColumns = t => [
  {
    title: t('CRISIS_MGMT.CARD_NO'),
    dataIndex: 'cardNumber',
    width: 80,
  },
  {
    title: t('global:DATE'),
    dataIndex: 'createdAt',
    width: 150,
    render: (_, row) => moment(row.updatedAt || row.createdAt).format(getLocalDateTimeFormat()),

  },
  {
    title: t('global:USER'),
    dataIndex: ['user', 'name'],
    width: 200,
  },
  {
    title: t('ACTION'),
    align: 'right',
    dataIndex: 'action',
    render: action => t(action),
  },
];
