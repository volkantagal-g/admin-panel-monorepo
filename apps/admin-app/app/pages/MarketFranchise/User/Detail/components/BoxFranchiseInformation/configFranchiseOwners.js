import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Text } = Typography;

export const tableColumnsFranchiseOwners = t => {
  return [
    {
      title: t('FRANCHISE_OWNERS'),
      width: 140,
      render: ({ _id, name }) => (
        <Link to={`/marketFranchise/user/detail/${_id}`}>
          <Text>{name}</Text>
        </Link>
      ),
    },
  ];
};
