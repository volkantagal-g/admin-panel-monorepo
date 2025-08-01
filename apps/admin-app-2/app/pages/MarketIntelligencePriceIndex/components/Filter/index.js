import { Select } from 'antd';

import SelectTitle from '@app/pages/MarketIntelligencePriceIndex/components/SelectTitle';
import { FILTER_KEY } from '@app/pages/MarketIntelligencePriceIndex/constants';

import useStyles from '@app/pages/MarketIntelligencePriceIndex/styles';

const { Option } = Select;

const Filter = ({
  list,
  placeholder,
  description,
  src,
  isLoading,
  mode = '',
  setFilters,
  filters,
  filterKey,
}) => {
  const classes = useStyles();

  return (
    <>
      <SelectTitle src={src} description={description} />
      <Select
        className={classes.selectWidth}
        placeholder={placeholder}
        onChange={value => {
          setFilters({ ...filters, [FILTER_KEY[filterKey]]: value });
        }}
        disabled={isLoading}
        mode={mode}
        allowClear
        value={filters ? filters[FILTER_KEY[filterKey]] : []}
      >
        {list &&
          list?.map(value => (
            <Option key={value} value={value} label={value}>
              <div className={classes.demoOptionLabelItem}>{value}</div>
            </Option>
          ))}
      </Select>
    </>
  );
};

export default Filter;
