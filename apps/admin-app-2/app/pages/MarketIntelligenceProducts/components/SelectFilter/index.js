import { Select } from 'antd';

import SelectTitle from '../SelectTitle';
import useStyles from '@app/pages/MarketIntelligenceProducts/styles';

const { Option } = Select;

const SelectFilter = ({ src, description, placeholder, handleChange, options }) => {
  const classes = useStyles();

  return (
    <>
      <SelectTitle src={src} description={description} />
      <Select
        allowClear
        showSearch
        className={classes.selectItem}
        onChange={handleChange}
        placeholder={placeholder}
      >
        {options?.map(value => (
          <Option key={value} value={value} label={value}>{value}</Option>
        ))}
      </Select>
    </>
  );
};
export default SelectFilter;
