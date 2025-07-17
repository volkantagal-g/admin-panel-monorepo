import { Button } from 'antd';

import _ from 'lodash';
import { Link } from 'react-router-dom';

import { getLangKey } from '@shared/i18n';

import { financeOrderStatuses } from '@shared/shared/constantValues';
import { formatDate } from '@shared/utils/dateHelper';

import { ROUTE } from '@app/routes';
import { FILTER_DOMAINS, FILTER_STATUSES, MAX_DELIVERY_MINUTE } from '../../constants';

export const getColumns = t => [
  {
    title: t('ORDER_ID'),
    dataIndex: 'orderId',
    width: '180px',
    fixed: 'left',
  },
  {
    title: t('WAREHOUSE_ID'),
    dataIndex: 'warehouseId',
    width: '180px',
  },
  {
    title: t('DOMAIN'),
    dataIndex: 'domainType',
    render: domain => _.find(FILTER_DOMAINS, { name: domain })?.trans[getLangKey()],
  },
  {
    title: t('CREATE_DATE'),
    dataIndex: 'checkoutDate',
    render: date => formatDate(date),
  },
  {
    title: t('DELIVERY_DATE'),
    dataIndex: 'deliverDate',
    render: date => formatDate(date),
  },
  {
    title: t('DELIVERY_DURATION'),
    dataIndex: 'timeToDelivery',
    render: date => date &&
      `${date <= MAX_DELIVERY_MINUTE ? date : MAX_DELIVERY_MINUTE} ${t(
        'MINUTE_SHORT',
      )}`,
  },
  {
    title: t('STATUS'),
    dataIndex: 'status',
    render: status => financeOrderStatuses[status][getLangKey()],
  },

  {
    title: t('CANCEL_INFO'),
    render: ({ cancelRejectCode, cancelNote, status }) => (FILTER_STATUSES[2].codes.includes(status) ? (
      <>
        {cancelRejectCode && (
        <p>
          <strong>{t('CANCEL_REASON')}: </strong>
          {cancelRejectCode
            ? t(`financeOrderDetailPage:CANCEL_REASONS.CODE_${cancelRejectCode}`) : ''}
        </p>
        )}
        {cancelNote && (
        <p>
          <strong>{t('CANCEL_NOTE')}: </strong>
          {cancelNote}
        </p>
        )}
      </>
    ) : (
      ''
    )),
  },
  {
    title: t('global:ACTION'),
    align: 'center',
    dataIndex: 'orderId',
    render: orderId => (
      <Button>
        <Link
          to={ROUTE.GETIR_FINANCE_ORDER_DETAIL.path.replace(
            ':orderId',
            orderId,
          )}
          target="_blank"
        >
          {t('global:DETAIL')}
        </Link>
      </Button>
    ),
  },
];
