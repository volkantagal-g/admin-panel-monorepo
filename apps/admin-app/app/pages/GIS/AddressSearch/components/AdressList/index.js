import { List, Typography } from 'antd';

const { Text } = Typography;

const AdressList = ({ data }) => {
  return (
    <List
      dataSource={data?.data}
      renderItem={item => {
        return (
          <List.Item>
            <Text>
              {item?._source?.address}
            </Text>
          </List.Item>
        );
      }}
    />
  );
};

export default AdressList;
