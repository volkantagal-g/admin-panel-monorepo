import moment from 'moment';
import { get } from 'lodash';

import { getLocalDateFormat, percentFormat } from '@shared/utils/localization';
import { getLangKey } from '@shared/i18n';

const STATUSES = {
  Pending: { tr: 'Onay bekliyor', en: 'Pending' },
  Approved: { tr: 'Onaylandı', en: 'Approved' },
  Rejected: { tr: 'Reddedildi', en: 'Rejected' },
};

export const tableColumns = t => [
  {
    title: t('clientDetail:GETIR_FOOD_TABLE.TABLE.COLUMNS.RESTAURANT_NAME'),
    dataIndex: 'restaurantName',
    key: 'restaurantName',
  },
  {
    title: t('clientDetail:GETIR_FOOD_TABLE.TABLE.COLUMNS.DISCOUNT_CODE'),
    dataIndex: 'orderNumber',
    key: 'orderNumber',
    align: 'center',
  },
  {
    title: t('clientDetail:GETIR_FOOD_TABLE.TABLE.COLUMNS.DISCOUNT_RATE'),
    dataIndex: 'discountValue',
    key: 'discountValue',
    render: discountValue => percentFormat().format(discountValue),
    align: 'center',
  },
  {
    title: t('clientDetail:GETIR_FOOD_TABLE.TABLE.COLUMNS.DATE'),
    dataIndex: 'processDate',
    key: 'processDate.date',
    render: processDate => moment.unix(processDate).format(getLocalDateFormat()),
    align: 'center',
  },
  {
    title: t('clientDetail:GETIR_FOOD_TABLE.TABLE.COLUMNS.TIME'),
    dataIndex: 'processDate',
    key: 'processDate.time',
    render: processDate => moment.unix(processDate).format('HH:mm'),
    align: 'center',
  },
  {
    title: t('clientDetail:GETIR_FOOD_TABLE.TABLE.COLUMNS.STATUS'),
    dataIndex: 'status',
    key: 'status',
    render: status => get(STATUSES, [status, getLangKey()]),
    align: 'center',
  },
];
