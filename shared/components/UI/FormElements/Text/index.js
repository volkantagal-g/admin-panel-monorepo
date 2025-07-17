import { Input, Form } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { VALIDATE_STATUS } from '@shared/shared/constants';
import { t } from '@shared/i18n';

import useStyles from './styles';
import { TooltipUI } from '@shared/components/UI/CustomElements';

const { Item } = Form;

const infoSuffixItem = ({ infoSuffixTitle }) => (
  <TooltipUI title={infoSuffixTitle}>
    <InfoCircleOutlined />
  </TooltipUI>
);

function TextItem({
  autoComplete,
  errors,
  hasForm,
  infoSuffixTitle,
  label,
  name,
  placeholder,
  hasInfoSuffix,
  suffix,
  ...otherProps
}) {
  const classes = useStyles();

  const renderTextItem = () => (
    <Input
      {...otherProps}
      className={classes.textItem}
      placeholder={placeholder}
      suffix={hasInfoSuffix ? infoSuffixItem({ infoSuffixTitle }) : suffix}
      autoComplete={autoComplete}
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
        {renderTextItem()}
      </Item>
    );
  }

  return (
    <>
      {renderTextItem()}
    </>
  );
}

TextItem.propTypes = {
  addonAfter: PropTypes.element,
  addonBefore: PropTypes.element,
  allowClear: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['off', 'on']),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  disabled: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])),
  hasForm: PropTypes.bool,
  hasInfoSuffix: PropTypes.bool,
  infoSuffixTitle: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.element,
  showCount: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'small', 'middle']),
  suffix: PropTypes.element,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TextItem.defaultProps = {
  addonAfter: undefined,
  addonBefore: undefined,
  allowClear: false,
  autoComplete: 'off',
  defaultValue: undefined,
  disabled: false,
  errors: {},
  hasForm: true,
  hasInfoSuffix: false,
  infoSuffixTitle: undefined,
  label: undefined,
  maxLength: undefined,
  name: undefined,
  onChange: () => {},
  onPressEnter: () => {},
  placeholder: t('global:FORM_ELEMENTS.PLACEHOLDER.TEXT'),
  prefix: undefined,
  showCount: false,
  size: 'large',
  suffix: undefined,
  value: undefined,
};

export default TextItem;
