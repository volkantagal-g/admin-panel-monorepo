import moment from 'moment';
import { Button } from 'antd';

import { getLangKey } from '@shared/i18n';
import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { MARKETPLACE_FINANCE_DATE_FORMAT_WITH_TIME, SUCCESS_JSON_MODAL_TYPE } from '../../../constants';

export const tableColumns = (t, handleOpenJSONModal) => [
  {
    title: <b>{t('global:DATE')}</b>,
    dataIndex: 'date',
    key: 'date',
    width: 60,
    render: date => moment(date).utc().format(MARKETPLACE_FINANCE_DATE_FORMAT_WITH_TIME),
  },
  {
    title: <b>{t('SUCCESS.TABLE.TYPE')}</b>,
    dataIndex: 'orderType',
    key: 'orderType',
    width: 50,
    render: orderType => orderType[getLangKey()],
  },
  {
    title: <b>{t('SUCCESS.TABLE.TRANSACTION_ID')}</b>,
    dataIndex: 'traceId',
    key: 'traceId',
    width: 100,
    render: traceId => <CopyToClipboard message={traceId} />,
  },
  {
    title: <b>{t('SUCCESS.TABLE.ORDER_ID')}</b>,
    dataIndex: 'orderId',
    key: 'orderId',
    width: 100,
    render: orderId => <CopyToClipboard message={orderId} />,
  },
  {
    title: <b>{t('SUCCESS.TABLE.REQUEST')}</b>,
    dataIndex: 'request',
    key: 'request',
    width: 100,
    align: 'center',
    render: request => (
      <Button
        type="primary"
        size="small"
        onClick={() => handleOpenJSONModal(SUCCESS_JSON_MODAL_TYPE.REQUEST, request)}
      >
        {t('SUCCESS.TABLE.JSON')}
      </Button>
    ),
  },
  {
    title: <b>{t('SUCCESS.TABLE.RESPONSE')}</b>,
    dataIndex: 'response',
    key: 'response',
    width: 100,
    align: 'center',
    render: response => (
      <Button
        type="primary"
        size="small"
        onClick={() => handleOpenJSONModal(SUCCESS_JSON_MODAL_TYPE.RESPONSE, response)}
      >
        {t('SUCCESS.TABLE.JSON')}
      </Button>
    ),
  },
];
