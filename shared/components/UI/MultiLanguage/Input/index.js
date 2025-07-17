import PropTypes from 'prop-types';
import { useTheme } from 'react-jss';
import { Row, Col, Form, Input } from 'antd';
import _ from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { getYupErrorPath } from '@shared/yup';
import { generateComponentId } from '@shared/utils/generateComponentId';

const MultiLanguageInput = props => {
  const theme = useTheme();
  const {
    label,
    fieldPath,
    formik,
    disabled,
    onFocus,
    onBlur,
    filteredCountryInput = [],
    isCountryChangeSelectBox = false,
    colProps,
    name,
    wrapperId,
  } = props;
  const { setFieldValue, values, errors } = formik;
  let countryLanguages = getSelectedCountryLanguages();

  if (isCountryChangeSelectBox) {
    countryLanguages = filteredCountryInput[0]?.label ? filteredCountryInput?.map(item => item?.label) : filteredCountryInput;
  }

  return (
    <Row
      gutter={[theme.spacing(3)]}
      align="top"
      className="mb-3"
      {...(wrapperId && { id: wrapperId })}
    >
      <Col span={24} className="mb-2">{label}</Col>
      {countryLanguages.map((countryLanguage, countryIndex) => {
        const path = [...fieldPath, countryLanguage];
        const addonAfter = countryLanguage.toUpperCase();
        const errorPath = getYupErrorPath(path);

        return (
          <Col
            span={12}
            key={_.toString(countryIndex)}
            {...(wrapperId && { id: generateComponentId(path) })}
            {...colProps}
          >
            <Form.Item
              help={_.get(errors, errorPath)}
              validateStatus={_.get(errors, errorPath) ? 'error' : 'success'}
              name={_.get(values, [...fieldPath, 'key'])}
              className={_.get(errors, errorPath) ? '' : 'mb-2'}
            >
              <Input
                value={_.get(values, path)}
                onChange={event => {
                  const value = _.get(event, 'target.value', '');
                  setFieldValue(path, value);
                }}
                addonAfter={addonAfter}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete="off"
                data-testid={`${name}-${countryLanguage}`}
              />
            </Form.Item>
          </Col>
        );
      })}
    </Row>
  );
};

MultiLanguageInput.propTypes = {
  label: PropTypes.string,
  fieldPath: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  formik: PropTypes.shape({}),
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  filteredCountryInput: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  isCountryChangeSelectBox: PropTypes.bool,
  wrapperId: PropTypes.string,
};

MultiLanguageInput.defaultProps = {
  label: '',
  fieldPath: [],
  filteredCountryInput: [],
  onFocus: () => {},
  disabled: false,
  isCountryChangeSelectBox: false,
  formik: {},
  onBlur: () => {},
  wrapperId: '',
};
export default MultiLanguageInput;
