export const generateColumns = ({ t }) => [
  {
    title: t('ACTION.REFUND_BY'),
    dataIndex: 'name',
    key: 'name',
    width: 100,
    render: name => {
      return name;
    },
  },
  {
    title: t('ACTION.REFUND_DATE'),
    dataIndex: 'date',
    key: 'date',
    width: 100,
    render: date => {
      return date;
    },
  },
];
