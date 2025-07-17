export const tableColumns = ({ t }) => {
  return [
    {
      title: t('SEGMENT_ID'),
      dataIndex: '_id',
      key: 'id',
      width: 100,
    },
    {
      title: t('SEGMENT_NAME'),
      dataIndex: 'name',
      key: 'title',
      width: 80,
    },
    {
      title: t('CREATION_DATE_TIME'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
    },
    {
      title: t('COURIER_COUNT'),
      dataIndex: 'targetIds',
      key: 'targetIds',
      width: 100,
      render: targetIds => {
        return targetIds.length;
      },
    },
  ];
};
