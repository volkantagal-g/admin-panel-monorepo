export default function generateTableColumns(t) {
  const columns = [
    {
      title: t('NUMBER_OF_VENDORS'),
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: t('NUMBER_OF_OPEN_FOR_SALE_VENDORS'),
      dataIndex: 'openForSaleCount',
      key: 'openForSaleCount',
    },
    {
      title: t('NUMBER_OF_OPEN_VENDORS'),
      dataIndex: 'isOpenTrueCount',
      key: 'isOpenTrueCount',
    },
    {
      title: t('NUMBER_OF_CLOSED_VENDORS'),
      dataIndex: 'isOpenFalseCount',
      key: 'isOpenFalseCount',
    },
  ];
  return columns;
}
