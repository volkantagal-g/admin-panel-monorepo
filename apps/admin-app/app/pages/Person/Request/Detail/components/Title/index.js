import { Typography } from 'antd';

import useStyles from './styles';

const { Text } = Typography;

const Title = ({ children }) => {
  const classes = useStyles();

  return <Text className={classes.title}>
    {children}
  </Text>;
};

export default Title;