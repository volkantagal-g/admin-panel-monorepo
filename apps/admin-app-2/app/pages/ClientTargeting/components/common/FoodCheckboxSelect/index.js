import { useDispatch } from 'react-redux';

import CheckboxSelect from '../CheckboxSelect';
import { Creators } from '../../../redux/actions';

const FoodCheckboxSelect = ({ activeKey, value, label, clientListKey }) => {

  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(Creators.setInput({ activeKey, clientListKey: 'restaurants', value: [] }));
  };
  
  return (
    <CheckboxSelect 
      activeKey={activeKey}
      value={value}
      label={label}
      clientListKey={clientListKey}
      onChange={handleChange}
    />
  );
};

export default FoodCheckboxSelect;
