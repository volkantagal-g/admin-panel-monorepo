export const tableColumns = t => {
  return [
    {
      title: t('waterOrderPage:CARD.NO'),
      dataIndex: 'cardNo',
      key: 'cardNo',
      width: 100,
    },
    {
      title: t('waterOrderPage:CARD.BANK'),
      dataIndex: 'bankName',
      key: 'bankName',
      width: 100,
    },
    {
      title: t('waterOrderPage:CARD.POS_BANK'),
      dataIndex: 'posBank',
      key: 'posBank',
      width: 100,
    },
    {
      title: t('waterOrderPage:CARD.TRANSACTION_ID'),
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 100,
    },
  ];
};
