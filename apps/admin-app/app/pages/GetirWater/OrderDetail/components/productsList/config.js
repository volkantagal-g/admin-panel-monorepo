export const tableColumns = t => {
  return [
    {
      title: t('waterOrderPage:PREVIOUS_ORDER.NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: t('waterOrderPage:PREVIOUS_ORDER.PRICE'),
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: t('waterOrderPage:PREVIOUS_ORDER.QUANTITY'),
      dataIndex: 'count',
      key: 'count',
      width: 100,
    },
  ];
};
