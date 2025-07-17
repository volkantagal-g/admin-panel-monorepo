import { DeleteOutlined } from '@ant-design/icons';

import { Button, Popconfirm, Switch } from 'antd';

export const defaultColumns = (t, isOperationColumnActive, handleDelete, isEditActive) => {
  return [
    {
      title: t('installmentCommissionPage:POS_BANK'),
      dataIndex: 'posBank',
      key: 'posBank',
      sorter: true,
    },
    {
      title: t('installmentCommissionPage:INSTALLMENT_COUNT'),
      dataIndex: 'installment',
      key: 'installment',
      align: 'center',
      sorter: true,
    },
    {
      title: `${t('installmentCommissionPage:TRANSACTION_COMMISSION')} (%)`,
      dataIndex: 'commission',
      key: 'commission',
      editable: true,
      align: 'center',
      inputType: 'number',
      sorter: true,
    },
    {
      title: t('installmentCommissionPage:STATUS'),
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      editable: true,
      align: 'center',
      inputType: 'switch-button',
      render: isEnabled => <Switch disabled checked={isEnabled} />,
    },
    ...(isEditActive ? [
      {
        title: t('installmentCommissionPage:OPERATION'),
        dataIndex: 'operation',
        align: 'center',
        render: (_, record) => (isOperationColumnActive ? (
          <Popconfirm title={t('installmentCommissionPage:CONFIRM_DELETE')} onConfirm={() => handleDelete(record.id)}>
            <Button type="link" icon={<DeleteOutlined />}>{t('global:DELETE')}</Button>
          </Popconfirm>
        ) : null),
      },
    ] : []),

  ];
};
