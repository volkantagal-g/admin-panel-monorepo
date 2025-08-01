import { Input, Space, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { Creators } from '../../../redux/actions';
import useStyles from './styles';

const { Text } = Typography;
const TextInput = ({
  activeKey, 
  clientListKey, 
  placeholder,
  value,
  label,
  type="text",
}) => {
  const dispatch = useDispatch();
  const classes =  useStyles();

  const handleInputChange = e => {
    dispatch(Creators.setInput({ activeKey, clientListKey, value: e.target.value }));
  };

  return (
    <Space direction="vertical" className={classes.container}>
      <Text>{label}</Text>
      <Input
        className={classes.fullWidth}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}  
        type={type}
      />
    </Space>
  );
};

export default TextInput;
