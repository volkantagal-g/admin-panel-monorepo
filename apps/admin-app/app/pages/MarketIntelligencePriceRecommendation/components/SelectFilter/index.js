import { useSelector } from 'react-redux';
import { Select } from 'antd';

import SelectTitle from '../SelectTitle';

import { stateSelector } from '../../redux/selectors';

import useStyles from '../../styles';

const { Option } = Select;

const SelectFilter = ({ description, placeholder, type, setFilters, filters, options, mode, optionList, disabled, src }) => {
  const classes = useStyles();

  const loading = useSelector(stateSelector.loading);
  const maxTagCount = mode === 'multiple' ? filters[type]?.length : null;

  return (
    <>
      <SelectTitle src={src} description={description} />
      <Select
        showSearch
        filterOption
        allowClear
        value={
          filters[type] && (filters[type]?.length > 0 || filters[type] !== '')
            ? filters[type]
            : null
        }
        mode={mode}
        maxTagCount={filters[type]?.length > 1 ? 0 : 1}
        maxTagPlaceholder={
          maxTagCount
            ? `+ ${
              maxTagCount - (filters[type]?.length > 1 ? 0 : 1)
            } ${description}`
            : null
        }
        className={classes.filterWrapper}
        placeholder={placeholder}
        onChange={value => setFilters({ ...filters, [type]: value || '' })}
        disabled={loading || disabled}
      >
        {options ||
          optionList?.map(option => (
            <Option key={option} value={option} label={option}>
              <div className="demo-option-label-item">{option}</div>
            </Option>
          ))}
      </Select>
    </>
  );
};

export default SelectFilter;
