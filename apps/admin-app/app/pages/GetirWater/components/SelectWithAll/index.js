import { Select, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import { getAllOption, ALL_OPTION } from '../../Campaigns/constants';
import { getSelectFilterOption } from '@shared/utils/common';

const { Option } = Select;

const SelectWithAll = ({ items, loading, maxTagCount, labelInValue, label, rules, name, disabled, ...props }) => {
  const { t } = useTranslation('getirWaterCampaignsPage');

  const handleSelectAll = value => {
    if (value && value.length && (labelInValue ? value.find(item => item.value === ALL_OPTION) : value.includes(ALL_OPTION))) {
      if (value.length === items.length + 1) {
        return [];
      }
      return labelInValue ? items : items.map(item => item.value);
    }
    return value;
  };

  return (
    <Form.Item name={name} label={label} rules={rules} getValueFromEvent={handleSelectAll}>
      <Select
        filterOption={getSelectFilterOption}
        loading={loading}
        mode="multiple"
        onChange={handleSelectAll}
        maxTagCount={maxTagCount}
        labelInValue={labelInValue}
        disabled={disabled}
        {...props}
      >
        <Option key={getAllOption(t).value}>{getAllOption(t).label}</Option>
        {items.map(item => (
          <Option key={item.value}>{item.label}</Option>
        ))}
      </Select>
    </Form.Item>
  );
};

SelectWithAll.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
  loading: PropTypes.bool,
  maxTagCount: PropTypes.number,
  label: PropTypes.string,
  rules: PropTypes.arrayOf(PropTypes.shape({})),
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

SelectWithAll.defaultProps = {
  items: [],
  loading: false,
  maxTagCount: 3,
  disabled: false,
  label: '',
  rules: [],
  name: '',
};

export default SelectWithAll;
