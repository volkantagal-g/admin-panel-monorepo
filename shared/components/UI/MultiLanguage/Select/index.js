import PropTypes from 'prop-types';
import { useTheme } from 'react-jss';
import { Form, Row, Col } from 'antd';
import _ from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import AntSelect from '@shared/components/UI/AntSelect';
import { getSelectFilterOption } from '@shared/utils/common';
import { getYupErrorPath } from '@shared/yup';
import { generateComponentId } from '@shared/utils/generateComponentId';

const MultiLanguageSelect = props => {
  const theme = useTheme();
  const { label, fieldPath, formik, disabled, mode, wrapperId, ...rest } = props;
  const { setFieldValue, values, errors } = formik;
  const countryLanguages = getSelectedCountryLanguages();
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
          >
            <Form.Item
              help={_.get(errors, errorPath)}
              validateStatus={_.get(errors, errorPath) ? 'error' : 'success'}
              name={path}
              className={_.get(errors, errorPath) ? '' : 'mb-2'}
            >
              <AntSelect
                mode={mode}
                value={_.get(values, path)}
                onChange={items => {
                  if (Array.isArray(items)) {
                    const trimmedItems = items?.map(item => item?.trim()).filter(item => !!item);
                    setFieldValue(path, trimmedItems);
                  }
                  else {
                    setFieldValue(path, items);
                  }
                }}
                disabled={disabled}
                addonAfter={addonAfter}
                autoComplete="off"
                showSearch
                filterOption={getSelectFilterOption}
                getPopupContainer={trigger => trigger?.parentNode}
                {...rest}
              />
            </Form.Item>
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
  mode: PropTypes.string,
  wrapperId: PropTypes.string,
};

MultiLanguageSelect.defaultProps = {
  label: '',
  fieldPath: [],
  formik: {},
  disabled: false,
  mode: '',
  wrapperId: '',
};

export default MultiLanguageSelect;
