import { Input } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { isEmpty as _isEmpty } from 'lodash';

import { Creators } from '../../../redux/actions';
import { isValidNumberInput } from '../../../utils';
import useStyles from './styles';

const Suffix = ({
  value,
  activeKey,
  clientListKey,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleUpButtonClick = () => {
    if (typeof value !== 'number') {
      dispatch(Creators.setInput({
        activeKey,
        value: 1,
        clientListKey,
      }));
    }
    else {
      dispatch(Creators.setInput({
        activeKey,
        value: value + 1,
        clientListKey,
      }));
    }
  };

  const handleDownButtonClick = () => {
    if (typeof value !== 'number' || value - 1 < 0) {
      dispatch(Creators.setInput({
        activeKey,
        value: 0,
        clientListKey,
      }));
    }
    else {
      dispatch(Creators.setInput({
        activeKey,
        value: value - 1,
        clientListKey,
      }));
    }
  };

  return (
    <div
      className={classes.suffixContainer}
    >
      <CaretUpOutlined
        size="8px"
        className={classes.caretBackgroundColor}
        onClick={handleUpButtonClick}
      />

      <CaretDownOutlined
        size="8px"
        className={classes.caretBackgroundColor}
        onClick={handleDownButtonClick}
      />
    </div>
  );
};

const InputNumber = ({
  value,
  activeKey,
  clientListKey,
  removable = false,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleInputChange = e => {
    const { value: inputValue } = e.target;

    if (!isValidNumberInput(inputValue)) {
      return;
    }
    dispatch(Creators.setInput({
      activeKey,
      value: removable && _isEmpty(inputValue) ? null : Number(inputValue),
      clientListKey,
    }));
  };

  return (
    <Input
      type="text"
      value={value}
      onChange={handleInputChange}
      suffix={(
        <Suffix
          value={value}
          activeKey={activeKey}
          clientListKey={clientListKey}
        />
      )}
      className={classes.container}
    />
  );
};

export default InputNumber;
