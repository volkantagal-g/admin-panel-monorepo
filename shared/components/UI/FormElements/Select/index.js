import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import { get } from 'lodash';

import { CloseOutlined, DeleteFilled } from '@ant-design/icons';

import useStyles from './styles';

import { t } from '@shared/i18n';
import { VALIDATE_STATUS } from '@shared/shared/constants';
import { mapOptionsData } from '@shared/components/UI/FormElements/utils';
import { TooltipUI } from '@shared/components/UI/CustomElements';

const { Item } = Form;

function SelectItem({
  errors,
  filterOption,
  hasForm,
  isFilterOptionEnabled,
  label,
  name,
  optionsData,
  optionLabelProp,
  optionValueProp,
  rules,
  shouldUpdate,
  ...otherProps
}) {
  const classes = useStyles();

  const options = mapOptionsData({
    optionsData,
    optionLabelProp,
    optionValueProp,
  });

  const renderSelectItem = () => (
    <Select
      {...otherProps}
      className={classes.selectItem}
      options={options}
      filterOption={isFilterOptionEnabled ? filterOption : false}
      getPopupContainer={triggerNode => triggerNode.parentNode}
      clearIcon={(
        <TooltipUI title={t('global:FORM_ELEMENTS.INFO.CLEAN')}>
          <DeleteFilled />
        </TooltipUI>
      )}
      removeIcon={(
        <TooltipUI title={t('global:FORM_ELEMENTS.INFO.REMOVE')}>
          <CloseOutlined />
        </TooltipUI>
      )}
    />
  );

  if (hasForm) {
    return (
      <Item
        help={errors && get(errors, name)}
        validateStatus={errors && get(errors, name) ? VALIDATE_STATUS.ERROR : VALIDATE_STATUS.SUCCESS}
        name={name}
        label={label}
        rules={rules ?? undefined}
        shouldUpdate={shouldUpdate}
      >
        {renderSelectItem()}
      </Item>
    );
  }

  return (
    <>
      {renderSelectItem()}
    </>
  );
}

SelectItem.propTypes = {
  allowClear: PropTypes.bool,
  autoClearSearchValue: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  disabled: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  filterOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  hasForm: PropTypes.bool,
  isFilterOptionEnabled: PropTypes.bool,
  label: PropTypes.string,
  loading: PropTypes.bool,
  maxTagCount: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf(['responsive'])]),
  mode: PropTypes.oneOf(['multiple', 'tags']),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]),
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  onDeselect: PropTypes.func,
  onDropdownVisibleChange: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  optionsData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  optionLabelProp: PropTypes.string,
  optionValueProp: PropTypes.string,
  placeholder: PropTypes.string,
  shouldUpdate: PropTypes.func,
  showSearch: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'small', 'middle']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]),
};

SelectItem.defaultProps = {
  allowClear: false,
  autoClearSearchValue: true,
  defaultValue: undefined,
  disabled: false,
  errors: {},
  filterOption: false,
  hasForm: true,
  isFilterOptionEnabled: false,
  label: '',
  loading: false,
  maxTagCount: 10,
  mode: undefined,
  name: undefined,
  onChange: () => {},
  onClear: () => {},
  onDeselect: () => {},
  onDropdownVisibleChange: () => {},
  onSearch: () => {},
  onSelect: () => {},
  optionsData: [],
  optionLabelProp: 'label',
  optionValueProp: 'value',
  placeholder: t('global:FORM_ELEMENTS.PLACEHOLDER.SELECT'),
  shouldUpdate: () => {},
  showSearch: true,
  size: 'large',
  value: undefined,
};

export default SelectItem;
