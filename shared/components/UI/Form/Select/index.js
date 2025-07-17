import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import _ from 'lodash';

import { t } from '@shared/i18n';
import { selectOptionsSearch } from '@shared/utils/common';

const { Item } = Form;

function SelectWrapper({
  selectKey = '',
  label = '',
  value = {},
  isTouched = false,
  hasError = false,
  optionsData = [],
  optionLabelProp = '',
  optionValueProp = '',
  labelTranslationCallback = false,
  loading = false,
  onChangeCallback = () => { },
  mode = '',
  disabled = false,
  shouldMapOptionsData = false,
  placeholder = '',
  itemStyle = {},
  allowClear = false,
  showSearch = true,
  filterOption = selectOptionsSearch,
  notFoundContent = t('NOT_FOUND'),
  onSearch = undefined,
  onDeselect = () => { },
  optionsSelectable = true,
  renderCustomItems = undefined,
  onDropdownVisibleChange = () => { },
  defaultValue,
}) {
  const mapOptionsData = () => {
    if (shouldMapOptionsData) {
      return optionsData;
    }
    return optionsData.map(optionData => {
      const textValue = _.isObject(optionData) ? _.get(optionData, optionLabelProp) : optionData;
      const optionLabel = labelTranslationCallback(textValue);
      const optionValue = optionValueProp ? _.get(optionData, optionValueProp) : optionData;
      return {
        label: optionLabel,
        value: optionValue,
      };
    });
  };

  return (
    <Item
      help={isTouched && hasError}
      validateStatus={isTouched && hasError ? 'error' : 'success'}
      name={selectKey}
      label={label}
      style={itemStyle}
    >
      <Select
        mode={mode}
        onChange={onChangeCallback}
        value={value}
        options={!renderCustomItems && mapOptionsData()}
        disabled={disabled}
        loading={loading}
        filterOption={filterOption}
        placeholder={placeholder}
        allowClear={allowClear}
        showSearch={showSearch}
        notFoundContent={notFoundContent}
        onSearch={onSearch}
        onDeselect={onDeselect}
        {...(!optionsSelectable && { open: false })}
        defaultValue={defaultValue}
        onDropdownVisibleChange={onDropdownVisibleChange}
      >
        {renderCustomItems && renderCustomItems()}
      </Select>
    </Item>
  );
}

SelectWrapper.propTypes = {
  selectKey: PropTypes.string,
  label: PropTypes.string,
  isTouched: PropTypes.bool,
  hasError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  labelTranslationCallback: PropTypes.func,
  optionsData: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  optionLabelProp: PropTypes.string,
  optionValueProp: PropTypes.string,
  onChangeCallback: PropTypes.func,
  mode: PropTypes.string,
  disabled: PropTypes.bool,
  shouldMapOptionsData: PropTypes.bool,
  itemStyle: PropTypes.shape({}),
  onDeselect: PropTypes.func,
  optionsSelectable: PropTypes.bool,
  renderCustomItems: PropTypes.func,
  onDropdownVisibleChange: PropTypes.func,
};

SelectWrapper.defaultProps = {
  selectKey: '',
  label: '',
  isTouched: false,
  hasError: false,
  optionsData: [],
  optionLabelProp: '',
  optionValueProp: '',
  labelTranslationCallback: label => {
    return label;
  },
  onChangeCallback: () => { },
  mode: '',
  disabled: false,
  shouldMapOptionsData: false,
  itemStyle: {},
  onDeselect: () => { },
  optionsSelectable: true,
  renderCustomItems: undefined,
  onDropdownVisibleChange: () => { },
};

export default SelectWrapper;
