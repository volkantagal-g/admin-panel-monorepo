import { useTranslation } from 'react-i18next';
import { Table } from 'antd';

import { generateTableColumns } from './config';
import useStyles from './styles';

const NoStockTable = ({
  title,
  data,
  ...otherProps
}) => {
  const { t } = useTranslation('getirMarketLiveMapPage');
  const classes = useStyles();
  const tableColumns = generateTableColumns({ classes }, t);

  return (
    <Table
      title={title}
      columns={tableColumns}
      dataSource={data}
      key="belowTable"
      size="small"
      tableLayout="fixed"
      pagination={false}
      className={classes.table}
      {...otherProps}
    />
  );
};

export default NoStockTable;
