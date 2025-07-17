export const tableColumns = t => {
  return [
    {
      title: t('waterOrderPage:REFUNDTABLE.PRODUCT_NAME'),
      dataIndex: 'productName',
      key: 'productName',
      width: 100,
    },
    {
      title: t('waterOrderPage:REFUNDTABLE.NUMBER'),
      dataIndex: 'numberOfRefundedProduct',
      key: 'numberOfRefundedProduct',
      width: 100,
    },
    {
      title: t('waterOrderPage:REFUNDTABLE.PRICE'),
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: price => price.toFixed(2),
    },
  ];
};
