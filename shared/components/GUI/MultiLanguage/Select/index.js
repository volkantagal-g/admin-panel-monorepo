import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { get, toString } from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { Select } from '@shared/components/GUI/Select';
import { getSelectFilterOption } from '@shared/utils/common';
import { getYupErrorPath } from '@shared/yup';
import { generateComponentId } from '@shared/utils/generateComponentId';

export const MultiLanguageSelect = ({ label, fieldPath, formik, disabled, wrapperId, colProps, selectProps }) => {
  const { setFieldValue, values, errors } = formik;
  const countryLanguages = getSelectedCountryLanguages();
  return (
    <Row
      gutter={16}
      align="top"
      className="mb-3"
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
            {...colProps}
          >
            <Select
              {...selectProps}
              value={get(values, path)}
              onChange={items => {
                const trimmedItems = items?.map(item => item?.trim()).filter(item => !!item);
                setFieldValue(path, trimmedItems);
              }}
              disabled={disabled}
              autoComplete="off"
              showSearch
              filterOption={getSelectFilterOption}
              getPopupContainer={trigger => trigger?.parentNode}
              label={countryLanguage.toUpperCase()}
              name={errorPath}
              errors={errors}
            />
          </Col>
        );
      })}
    </Row>
  );
};

MultiLanguageSelect.propTypes = {
  label: PropTypes.string,
  fieldPath: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  formik: PropTypes.shape({}),
  disabled: PropTypes.bool,
  wrapperId: PropTypes.string,
  colProps: PropTypes.shape({}),
  selectProps: Select.propTypes,
};

MultiLanguageSelect.defaultProps = {
  label: '',
  fieldPath: [],
  formik: {},
  disabled: false,
  wrapperId: '',
  colProps: { xs: 24, md: 12, lg: 8 },
  selectProps: Select.defaultProps,
};
