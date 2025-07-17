import { Typography } from 'antd';

export const generateTableColumns = ({ classes }, t) => (
  [
    {
      title: <Typography.Text strong>{t('global:WAREHOUSE')}</Typography.Text>,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      className: classes.cell,
    },
  ]
);
