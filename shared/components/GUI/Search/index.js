import { Input as InputAntd } from 'antd';

import PropTypes from 'prop-types';

import { memo, useMemo } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import useStyles from './styles';
import { t } from '@shared/i18n';
import { VALIDATE_STATUS } from '@shared/shared/constants';
import { FormItem } from '@shared/components/GUI/FormItem';

export const Search = memo(
  function Search({
    errors,
    hasForm,
    name,
    prefix,
    ...otherProps
  }) {
    const classes = useStyles();
    const errorName = errors?.name;
    const validateStatus = errorName ? VALIDATE_STATUS.ERROR : VALIDATE_STATUS.SUCCESS;

    const memoizedInput = useMemo(() => (
      <InputAntd
        className={classes.search}
        prefix={prefix}
        {...otherProps}
      />
    ), [classes.search, otherProps, prefix]);

    if (hasForm) {
      return (
        <FormItem
          help={errorName}
          validateStatus={validateStatus}
          name={name}
        >
          {memoizedInput}
        </FormItem>
      );
    }
    return memoizedInput;
  },
);
Search.propTypes = {
  allowClear: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['off', 'on']),
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
  hasForm: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.element,
};
Search.defaultProps = {
  allowClear: false,
  autoComplete: 'off',
  defaultValue: undefined,
  disabled: false,
  errors: {},
  hasForm: true,
  name: undefined,
  onChange: undefined,
  onPressEnter: undefined,
  placeholder: t('global:SEARCH'),
  prefix: <SearchOutlined />,
};
