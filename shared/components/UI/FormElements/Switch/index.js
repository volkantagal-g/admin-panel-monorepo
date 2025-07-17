import PropTypes from 'prop-types';
import { Form, Switch } from 'antd';
import { get } from 'lodash';

import { t } from '@shared/i18n';

import { VALIDATE_STATUS } from '@shared/shared/constants';

const { Item } = Form;

function SwitchItem({
  checkedChildren,
  errors,
  hasForm,
  label,
  name,
  unCheckedChildren,
  ...otherProps
}) {
  const renderInputItem = () => (
    <Switch
      {...otherProps}
      checkedChildren={t(`global:SWITCH.${checkedChildren}`)}
      unCheckedChildren={t(`global:SWITCH.${unCheckedChildren}`)}
    />
  );

  if (hasForm) {
    return (
      <Item
        help={errors && get(errors, name)}
        validateStatus={errors && get(errors, name) ? VALIDATE_STATUS.ERROR : VALIDATE_STATUS.SUCCESS}
        name={name}
        label={label}
      >
        {renderInputItem()}
      </Item>
    );
  }

  return (
    <>
      {renderInputItem()}
    </>
  );
}

SwitchItem.propTypes = {
  checkedChildren: PropTypes.oneOf(['YES', 'ACTIVE', 'ON']),
  defaultChecked: PropTypes.bool,
  errors: PropTypes.bool,
  hasForm: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]),
  unCheckedChildren: PropTypes.oneOf(['NO', 'INACTIVE', 'OFF']),
};

SwitchItem.defaultProps = {
  checkedChildren: 'ON',
  defaultChecked: true,
  errors: false,
  hasForm: true,
  name: undefined,
  label: undefined,
  unCheckedChildren: 'OFF',
};

export default SwitchItem;
