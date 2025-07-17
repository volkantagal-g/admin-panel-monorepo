export const tableColumns = t => [
  {
    title: <b>{t('TABLE.HEADERS.CONFIG_NAME')}</b>,
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: <b>{t('TABLE.HEADERS.PREVIOUS_VALUE')}</b>,
    dataIndex: 'previousValue',
    key: 'previousValue',
    render: value => value.toString(),
  },
  {
    title: <b>{t('TABLE.HEADERS.NEW_VALUE')}</b>,
    dataIndex: 'newValue',
    key: 'newValue',
    render: value => value.toString(),
  },
];
