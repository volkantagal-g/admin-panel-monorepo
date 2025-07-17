import { Space, Typography } from 'antd';

import useStyles from './styles';

const { Text } = Typography;

const Or = () => {
  const classes = useStyles();

  return (
    <Space className={classes.container}>
      <Text>-or-</Text>
    </Space>
  );
};

export default Or;
