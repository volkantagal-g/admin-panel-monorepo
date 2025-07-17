import ActionSelection from '../ActionSelection';

const statusRender = ({ status, t }) => {
  if (status === 300) {
    return t('COMPLETED');
  }
  if (status === 100) {
    return t('WAITING');
  }
  if (status === 200) {
    return t('INPROGRESS');
  }
  return null;
};

export const tableColumns = ({ t }) => {
  return [
    {
      title: t('NOTIFICATION_ID'),
      dataIndex: '_id',
      key: 'id',
      width: 100,
    },
    {
      title: t('NOTIFICATION_NAME'),
      dataIndex: 'name',
      key: 'title',
      width: 80,
    },
    {
      title: t('CREATION_DATE'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 100,
    },
    {
      title: t('SENDING_DATE'),
      dataIndex: 'scheduledAt',
      key: 'scheduledAt',
      width: 100,
    },
    {
      title: t('PRIORITY'),
      dataIndex: 'priority',
      key: 'priority',
      width: 50,
      render: priority => (priority === 100 ? t('NORMAL') : t('HIGH')),
    },
    {
      title: t('STATUS'),
      dataIndex: 'status',
      width: 50,
      render: status => statusRender({ status, t }),
    },
    {
      title: t('ACTION'),
      width: 100,
      align: 'center',
      render: row => <ActionSelection notificationData={{ ...row }} />,
    },
  ];
};
