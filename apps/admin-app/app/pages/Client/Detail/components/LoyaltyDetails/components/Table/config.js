const DEFAULT_PAGINATION_CONFIG = {
  currentPage: 1,
  rowsPerPage: 10,
};

const tableColumns = ({ t }) => [
  {
    title: '#',
    key: '_index',
    width: 50,
    render: (_text, _record, index) => index + 1,
  },
  {
    title: t('LOYALTY.STAMP'),
    dataIndex: 'stamp',
    key: 'stamp',
  },
];

export { DEFAULT_PAGINATION_CONFIG, tableColumns };
