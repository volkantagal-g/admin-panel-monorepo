import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

export const tableColumnsWarehouses = t => {
  return [
    {
      title: t('WAREHOUSES'),
      width: 140,
      render: ({ _id, name }) => (
        <Link to={`/warehouse/detail/${_id}`}>
          <Text>{name}</Text>
        </Link>
      ),
    },
  ];
};
