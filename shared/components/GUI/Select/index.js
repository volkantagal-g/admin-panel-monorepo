import PropTypes from 'prop-types';
import { Select as SelectAntd } from 'antd';
import { memo, useMemo } from 'react';

import useStyles from './styles';
import { FloatingLabel } from '../FloatingLabel';
import { LabelWithTooltip } from '../LabelWithTooltip';

import { FormItem, formItemPropTypes, formItemsDefaultProps } from '@shared/components/GUI/FormItem';

export const Select = memo(function Select({
  children,
  allowClear,
  errors,
  filterOption,
  hasForm,
  label,
  mode,
  name,
  optionsData,
  rules,
  shouldUpdate,
  dataTestId,
  labelWithTooltip,
  usage,
  ...otherProps
}) {
  const classes = useStyles({ mode, label, usage });

  const isSingleSelect = !mode || !allowClear;
  const filterOptionStatus = filterOption ?? false;

  const labelComponent = useMemo(() => {
    if (labelWithTooltip) {
      return (
        <LabelWithTooltip
          label={labelWithTooltip.label}
          tooltipTitle={labelWithTooltip.tooltipTitle}
        />
      );
    }

    return label;
  }, [label, labelWithTooltip]);

  const memoizedSelectItem = useMemo(() => (
    <FloatingLabel label={labelComponent}>
      <SelectAntd
        getPopupContainer={trigger => trigger?.parentNode}
        {...otherProps}
        data-testid={dataTestId}
        className={classes.select}
        options={optionsData}
        filterOption={filterOptionStatus}
        showArrow={isSingleSelect}
        mode={mode}
        allowClear={allowClear}
      >
        {children}
      </SelectAntd>
    </FloatingLabel>
  ), [labelComponent, otherProps, dataTestId, classes.select, optionsData, filterOptionStatus, isSingleSelect, mode, allowClear, children]);

  if (hasForm) {
    return (
      <FormItem
        errors={errors}
        name={name}
        rules={rules ?? undefined}
        shouldUpdate={shouldUpdate}
      >
        {memoizedSelectItem}
      </FormItem>
    );
  }

  return (memoizedSelectItem);
});

Select.Option = SelectAntd.Option;

Select.propTypes = {
  ...formItemPropTypes,
  children: PropTypes.number,
  allowClear: PropTypes.bool,
  autoClearSearchValue: PropTypes.bool,
  dataTestId: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  disabled: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  filterOption: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  hasForm: PropTypes.bool,
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
  optionsData: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
    PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })),
    })),
  ]),
  shouldUpdate: PropTypes.func,
  showArrow: PropTypes.bool,
  showSearch: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    PropTypes.shape({
      data: PropTypes.oneOfType([() => null, PropTypes.objectOf(PropTypes.any)]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
    PropTypes.arrayOf(PropTypes.shape({
      data: PropTypes.oneOfType([() => null, PropTypes.objectOf(PropTypes.any)]),
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })),
  ]),
  labelWithTooltip: PropTypes.shape({}),
  usage: PropTypes.oneOf(['normal', 'table']),
  id: PropTypes.string,
};

Select.defaultProps = {
  ...formItemsDefaultProps,
  children: 0,
  allowClear: false,
  autoClearSearchValue: true,
  dataTestId: undefined,
  defaultValue: undefined,
  disabled: false,
  errors: {},
  filterOption: false,
  hasForm: true,
  label: '',
  loading: false,
  maxTagCount: 5,
  mode: undefined,
  name: undefined,
  onChange: undefined,
  onClear: undefined,
  onDeselect: undefined,
  onDropdownVisibleChange: undefined,
  onSearch: undefined,
  onSelect: undefined,
  optionsData: undefined,
  shouldUpdate: undefined,
  showArrow: false,
  showSearch: false,
  value: undefined,
  labelWithTooltip: undefined,
  usage: 'normal',
};
