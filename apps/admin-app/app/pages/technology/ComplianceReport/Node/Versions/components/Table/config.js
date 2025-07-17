const getFilterData = ({ versions, field }) => {
  return Array.from(
    new Set(versions.map(v => v[field])),
  ).map(data => ({
    text: data,
    value: data,
  }));
};

export const tableColumns = ({ t, versions }) => [
  {
    title: t('REPOSITORY_NAME'),
    dataIndex: 'repoName',
    key: 'repoName',
    filters: getFilterData({ versions, field: 'repoName' }),
    filterSearch: true,
  },
  {
    title: t('VERSION'),
    dataIndex: 'version',
    key: 'version',
    render: version => (version === 'Could not detected!' ? t('UNKNOWN_VERSION') : version),
    filters: getFilterData({ versions, field: 'version' }),
    filterSearch: true,
  },
  {
    title: t('TYPE'),
    dataIndex: 'type',
    key: 'type',
    render: type => (type === 'Could not detected!' ? t('UNKNOWN_VERSION') : type),
    filters: getFilterData({ versions, field: 'type' }),
    filterSearch: true,
  },
];
