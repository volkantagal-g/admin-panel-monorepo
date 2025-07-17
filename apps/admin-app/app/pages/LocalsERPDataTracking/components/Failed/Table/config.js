import moment from 'moment';

import { Button } from 'antd';

import { getLangKey } from '@shared/i18n';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { MARKETPLACE_FINANCE_DATE_FORMAT_WITH_TIME } from '@app/pages/LocalsERPDataTracking/constants';

export const getTableColumns = (t, handleOpenErrorModal) => [
  {
    title: <b>{t('global:DATE')}</b>,
    dataIndex: 'date',
    key: 'date',
    width: 60,
    render: date => moment(date).utc().format(MARKETPLACE_FINANCE_DATE_FORMAT_WITH_TIME),

  },
  {
    title: <b>{t('FAILED.TABLE.TYPE')}</b>,
    dataIndex: 'orderType',
    key: 'orderType',
    width: 50,
    render: orderType => orderType[getLangKey()],
  },
  {
    title: <b>{t('FAILED.TABLE.TRANSACTION_ID')}</b>,
    dataIndex: 'traceId',
    key: 'traceId',
    width: 100,
    render: traceId => <CopyToClipboard message={traceId} />,
  },
  {
    title: <b>{t('FAILED.TABLE.ORDER_ID')}</b>,
    dataIndex: 'orderId',
    key: 'orderId',
    width: 100,
    render: orderId => <CopyToClipboard message={orderId} />,
  },
  {
    title: <b>{t('FAILED.TABLE.DESCRIPTION')}</b>,
    dataIndex: 'message',
    key: 'message',
    width: 100,
    render: message => {
      return (
        <Button size="small" type="primary" onClick={() => handleOpenErrorModal(message)}>
          {t('FAILED.TABLE.ERROR_DETAIL')}
        </Button>
      );
    },
  },
];
