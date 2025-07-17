import { Space, Typography, DatePicker } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { Creators } from '../../../redux/actions';
import useStyles from './styles';
import { startDate, getEndDate } from '../../../redux/initialState';

const { Text } = Typography;
const DateSelect = ({ activeKey, clientListKey, value, label }) => {
  const classes  = useStyles();
  const dispatch = useDispatch();

  const handleDateChange = value => {
    dispatch(Creators.setInput({ activeKey, clientListKey, value }));
  };

  const getDisabledDate = current => {
    return current && (current < moment(startDate) || current > moment(getEndDate()));
  };

  return (
    <Space direction="vertical" className={classes.container}>
      <Text>{label}</Text>
      <DatePicker 
        value={value} 
        onChange={handleDateChange} 
        className={classes.fullWidth} 
        disabledDate={getDisabledDate}
      />
    </Space>
  );
};

export default DateSelect;
