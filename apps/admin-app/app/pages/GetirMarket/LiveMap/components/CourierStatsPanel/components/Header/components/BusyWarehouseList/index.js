import { List, Typography } from 'antd';

const BusyWarehouseList = ({ header, data, classes }) => (
  <List
    header={<Typography.Text strong>
      {header}
    </Typography.Text>}
    footer={null}
    dataSource={data}
    size="small"
    split
    renderItem={item => (
      <List.Item className={classes.dropdownItem}>
        {item}
      </List.Item>
    )}
  />
);

export default BusyWarehouseList;
