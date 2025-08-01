import { Checkbox, Space } from 'antd';
import { useDispatch } from 'react-redux';

import { Creators } from '../../../redux/actions';
import useStyles from './styles';

const CheckboxSelect = ({ activeKey, clientListKey, value, label, onChange, description, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCheckboxChange = e => {
    dispatch(Creators.setInput({ activeKey, clientListKey, value: e.target.checked }));
    if (typeof onChange === 'function') {
      onChange();
    }
  };

  return (
    <Space direction="vertical" className={classes.container}>
      <Checkbox checked={value} onChange={handleCheckboxChange} {...rest}>
        {label}
      </Checkbox>
      {description && <small className={classes.description}>{description}</small>}
    </Space>
  );
};

export default CheckboxSelect;
