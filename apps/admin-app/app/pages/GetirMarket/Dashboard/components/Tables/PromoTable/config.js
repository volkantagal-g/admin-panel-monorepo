import { Tooltip, Typography } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { isNumber } from 'lodash';

const { Text } = Typography;

const ShownCaret = ({ name, record, selectedRows, classes }) => {
  if (!isNumber(record.index)) {
    return (
      <Tooltip title={name}>
        {name}
      </Tooltip>
    );
  }
  if (selectedRows.has(record.index)) {
    return (
      <Tooltip title={name}>
        <CaretUpOutlined className={classes.smallRightMargin} />{name}
      </Tooltip>
    );
  }
  return (
    <Tooltip title={name}>
      <CaretDownOutlined className={classes.smallRightMargin} />{name}
    </Tooltip>
  );
};

export const getColumns = (selectedRows, classes, t) => [
  {
    title: <Text strong>{t('global:PROMO')}</Text>,
    dataIndex: 'name',
    key: 'name',
    className: classes.smallerPadding,
    render: (name, record) => (<ShownCaret name={name} record={record} selectedRows={selectedRows} classes={classes} />),
  },
  {
    title: <Text strong>{t('global:COUNT')}</Text>,
    dataIndex: 'count',
    key: 'count',
    align: 'right',
    width: 58,
  },
  {
    title: <Text strong>%</Text>,
    dataIndex: 'ratio',
    key: 'ratio',
    align: 'right',
    width: 30,
  },
];
