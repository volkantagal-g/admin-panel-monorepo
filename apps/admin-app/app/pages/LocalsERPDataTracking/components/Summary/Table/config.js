import { Button } from 'antd';

import { getLangKey } from '@shared/i18n';

export const tableColumns = (t, linkClassname, handleFailDetailClick, handleSuccessDetailClick) => [
  {
    title: <b>{t('SUMMARY.TABLE.DATA_TYPE')}</b>,
    dataIndex: 'orderType',
    key: 'orderType',
    render: orderType => <b>{orderType[getLangKey()]}</b>,
  },
  {
    title: <b>{t('SUMMARY.TABLE.RECEIVED')}</b>,
    dataIndex: 'received',
    key: 'received',
    align: 'center',
  },
  {
    title: <b>{t('SUMMARY.TABLE.SENT')}</b>,
    dataIndex: 'sent',
    key: 'sent',
    align: 'center',
    render: (value, record) => (value > 0 ?
      <Button className={linkClassname} onClick={() => handleSuccessDetailClick(record.orderType?.value)} type="link">{value}</Button> :
      value),
  },
  {
    title: <b>{t('SUMMARY.TABLE.FAILED')}</b>,
    dataIndex: 'failed',
    key: 'failed',
    align: 'center',
    render: (value, record) => (value > 0 ?
      <Button className={linkClassname} onClick={() => handleFailDetailClick(record.orderType?.value)} type="link">{value}</Button> :
      value),
  },
];
