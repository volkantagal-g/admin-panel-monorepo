import { Table } from 'antd';

import './index.css';

const CourierCountTable = ({ columns, data, className, ...otherProps }) => (
  <Table
    columns={columns}
    dataSource={data}
    key="courierCountsTable"
    size="small"
    tableLayout="fixed"
    showHeader={false}
    pagination={false}
    className={className}
    {...otherProps}
  />
);

export default CourierCountTable;
