import { Switch } from 'antd';

export const columns = t => [
  {
    title: t('installmentCommissionPage:POS_BANK'),
    dataIndex: 'posBank',
    key: 'posBank',
  },
  {
    title: t('installmentCommissionPage:INSTALLMENT_COUNT'),
    dataIndex: 'installment',
    key: 'installment',
    align: 'center',
  },
  {
    title: `${t('installmentCommissionPage:TRANSACTION_COMMISSION')} (%)`,
    dataIndex: 'commission',
    key: 'commission',
    align: 'center',
  },
  {
    title: t('installmentCommissionPage:STATUS'),
    dataIndex: 'isEnabled',
    key: 'isEnabled',
    align: 'center',
    render: isEnabled => <Switch disabled checked={isEnabled} />,
  },
  {
    title: t('installmentCommissionPage:OPERATION'),
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    render: operation => <p>{t(`installmentCommissionPage:${operation}`)} </p>,

  },
];
