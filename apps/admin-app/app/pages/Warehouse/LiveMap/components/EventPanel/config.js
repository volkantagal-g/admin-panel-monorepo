export const getTableColumns = () => {
  return [
    {
      dataIndex: 'name',
      key: 'name',
      render: name => <b>{name}</b>,
    },
    {
      dataIndex: 'detail',
      key: 'detail',
    },
  ];
};
