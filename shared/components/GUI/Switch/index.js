import { Switch as SwitchAntd } from 'antd';

import PropTypes from 'prop-types';

import { memo, useMemo } from 'react';

import useStyles from './styles';
import { t } from '@shared/i18n';
import { FormItem } from '@shared/components/GUI/FormItem';

export const Switch = memo(function Switch({
  checkedColor,
  errors,
  hasForm,
  name,
  unCheckedColor,
  size,
  checkedChildren,
  unCheckedChildren,
  ...otherProps
}) {
  const classes = useStyles({ checkedColor, unCheckedColor, size });

  const memoizedSwitchItem = useMemo(() => (
    <SwitchAntd
      {...otherProps}
      checkedChildren={t(`global:SWITCH.${checkedChildren}`)}
      unCheckedChildren={t(`global:SWITCH.${unCheckedChildren}`)}
      className={classes.switch}
    />
  ), [checkedChildren, classes.switch, otherProps, unCheckedChildren]);

  if (hasForm) {
    return (
      <FormItem errors={errors} name={name} valuePropName="checked">
        {memoizedSwitchItem}
      </FormItem>
    );
  }

  return memoizedSwitchItem;
});

Switch.propTypes = {
  checkedChildren: PropTypes.oneOf(['YES', 'ACTIVE', 'ON', 'ENABLED']),
  checkedColor: PropTypes.oneOf(['primary', 'secondary', 'active_switch']),
  disabled: PropTypes.bool,
  hasForm: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func || undefined,
  onClick: PropTypes.func || undefined,
  size: PropTypes.oneOf(['small', 'medium']),
  unCheckedChildren: PropTypes.oneOf(['NO', 'INACTIVE', 'OFF', 'CLOSE', 'DISABLED']),
  unCheckedColor: PropTypes.oneOf(['close', 'danger']),
};
Switch.defaultProps = {
  checkedChildren: 'ACTIVE',
  checkedColor: 'active_switch',
  disabled: false,
  hasForm: false,
  loading: false,
  onChange: undefined,
  onClick: undefined,
  size: 'medium',
  unCheckedChildren: 'CLOSE',
  unCheckedColor: 'close',
};
