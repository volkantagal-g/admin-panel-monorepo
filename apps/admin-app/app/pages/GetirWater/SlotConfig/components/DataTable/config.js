import { InputNumber } from 'antd';

export const generateColumns = ({ t, handleInputChange }) => {
  const rules = [
    {
      title: t('SLOT_START'),
      dataIndex: 'slot',
      key: 'slot',
      render: slot => {
        const start = slot.split('-')[0];
        return `${start}:00`;
      },
    },
    {
      title: t('SLOT_END'),
      dataIndex: 'slot',
      key: 'slot',
      render: slot => {
        const end = slot.split('-')[1];
        return `${end}:00`;
      },
    },
    {
      title: t('CURRENT_ORDER_COUNT'),
      dataIndex: 'currentOrderCount',
      key: 'currentOrderCount',
      render: currentOrderCount => currentOrderCount,
    },
    {
      title: t('SLOT_CAPACITY'),
      dataIndex: 'cap',
      key: 'cap',
      render: cap => cap,
    },
    {
      title: t('NEW_SLOT_CAPACITY'),
      width: 350,
      render: (text, record) => (
        <InputNumber
          type="number"
          onChange={e => handleInputChange(e, record.slot)}
          min={0}
        />
      ),
    },
  ];
  return rules;
};
