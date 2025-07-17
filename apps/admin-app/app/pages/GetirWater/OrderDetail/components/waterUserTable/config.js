export const tableColumns = t => {
  return [
    {
      title: t('waterOrderPage:WATER_TABLE.NAME'),
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: t('waterOrderPage:WATER_TABLE.EMAIL'),
      dataIndex: 'email',
      key: 'email',
      width: 100,
    },
    {
      title: t('waterOrderPage:WATER_TABLE.GSM'),
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 100,
    },
    {
      title: t('waterOrderPage:WATER_TABLE.ROLE'),
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: role => t(`waterRoles:${role}`),
    },
  ];
};
