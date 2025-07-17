import { Checkbox as CheckboxAntd } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { memo, useMemo } from 'react';

import useStyles from './styles';
import { FormItem, formItemPropTypes, formItemsDefaultProps } from '@shared/components/GUI/FormItem';

export const Checkbox = memo(function Checkbox({
  children,
  hasForm,
  name,
  centerForm,
  className,
  ...otherProps
}) {
  const classes = useStyles({ centerForm });

  const memoizedCheckbox = useMemo(() => (
    <CheckboxAntd
      className={classNames(classes.checkbox, className)}
      {...otherProps}
    >
      {children}
    </CheckboxAntd>
  ), [classes.checkbox, className, otherProps, children]);

  if (hasForm) {
    return (
      <FormItem name={name} className={centerForm}>
        {memoizedCheckbox}
      </FormItem>
    );
  }
  return memoizedCheckbox;
});
Checkbox.propTypes = {
  ...formItemPropTypes,
  center: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.number]),
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  hasForm: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
};
Checkbox.defaultProps = {
  ...formItemsDefaultProps,
  center: undefined,
  defaultChecked: false,
  disabled: false,
  hasForm: false,
  name: undefined,
  onChange: undefined,
};
