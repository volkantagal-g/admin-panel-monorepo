import { memo } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { VALIDATE_STATUS } from '@shared/shared/constants';

import useStyles from './styles';

const { Item } = Form;

export const FormItem = memo(function FormItem({
  children,
  errors,
  name,
  ...otherProps
}) {
  let customName = name;
  if (Array.isArray(name)) {
    customName = name?.join('.');
  }
  const classes = useStyles();
  const errorName = get(errors, customName);
  const validateStatus = errorName ? VALIDATE_STATUS.ERROR : VALIDATE_STATUS.SUCCESS;

  return (
    <Item
      className={classes.formItem}
      help={errorName}
      validateStatus={validateStatus}
      name={customName}
      {...otherProps}
    >
      {children}
    </Item>
  );
});

export const formItemDefaultPropTypes = {
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]),
};

export const formItemPropTypes = {
  children: PropTypes.element.isRequired,
  ...formItemDefaultPropTypes,
};

export const formItemsDefaultProps = { errors: undefined, name: undefined };

FormItem.propTypes = { ...formItemPropTypes };
FormItem.defaultProps = { ...formItemsDefaultProps };
