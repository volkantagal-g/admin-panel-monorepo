import { useState } from 'react';
import { Switch, Space, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { Creators } from '../../../redux/actions';
import useStyles from './styles';

const { Text } = Typography;

const SwitchInput = ({ activeKey, clientListKey, label, value, onChange }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [checked, setChecked] = useState(value);

  // eslint-disable-next-line no-shadow
  const handleSwitchChange = value => {
    setChecked(value);
    if (onChange) onChange(value);

    if (typeof clientListKey === 'object') {
      return clientListKey.forEach(listKey => {
        dispatch(Creators.setInput({ activeKey, clientListKey: listKey, value }));
      });
    }
    return dispatch(Creators.setInput({ activeKey, clientListKey, value }));
  };

  return (
    <Space direction="vertical" className={classes.container}>
      <Text>{label}</Text>
      <Switch
        className={checked ? classes.switchWrapperChecked : classes.switchWrapperUnchecked}
        checked={value}
        onChange={handleSwitchChange}
      />
    </Space>
  );
};

export default SwitchInput;
