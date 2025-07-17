import { memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { get, toString } from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { getYupErrorPath } from '@shared/yup';
import { generateComponentId } from '@shared/utils/generateComponentId';
import { TextInput } from '@shared/components/GUI/TextInput';
import { getAutoColProps } from '../../utils';

export const MultiLanguageInput = memo(({
  label,
  fieldPath,
  formik,
  disabled,
  onFocus,
  onBlur,
  filteredCountryInput = [],
  isCountryChangeSelectBox = false,
  colProps,
  wrapperId,
  className,
  hasForm,
}) => {
  const { setFieldValue, values, errors } = formik;
  let countryLanguages = getSelectedCountryLanguages();

  if (isCountryChangeSelectBox) {
    countryLanguages = filteredCountryInput[0]?.label ? filteredCountryInput?.map(item => item?.label) : filteredCountryInput;
  }

  return (
    <Row
      gutter={16}
      align="top"
      className={className}
      {...(wrapperId && { id: wrapperId })}
    >
      <Col span={24} className="mb-2">{label}</Col>
      {countryLanguages.map((countryLanguage, countryIndex) => {
        const path = [...fieldPath, countryLanguage];
        const errorPath = getYupErrorPath(path);
        return (
          <Col
            key={toString(countryIndex)}
            {...(wrapperId && { id: generateComponentId(path) })}
            {...colProps ?? getAutoColProps(countryLanguages)}
          >
            <TextInput
              disabled={disabled}
              value={get(values, path)}
              label={countryLanguage.toUpperCase()}
              onChange={event => {
                const value = get(event, 'target.value', '');
                setFieldValue(path, value);
              }}
              onFocus={onFocus}
              onBlur={onBlur}
              errors={errors}
              // Assigning errorPath to name makes no sense, but this
              // is the way to display TextInput's error message. It
              // looks for the name key in the errors map to display
              // the correlated error. Maybe we should rework it.
              name={errorPath}
              autoComplete="off"
              hasForm={hasForm}
            />
          </Col>
        );
      })}
    </Row>
  );
});

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
  colProps: PropTypes.shape({}),
  hasForm: PropTypes.bool,
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
  colProps: null,
  hasForm: false,
};
