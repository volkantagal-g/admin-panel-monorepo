import { Form, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { useTheme } from 'react-jss';
import _ from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import TextEditor from '@shared/components/UI/TextEditor';
import { getYupErrorPath } from '@shared/yup';

const MultiLanguageTextEditor = props => {
  const theme = useTheme();
  const { label, fieldPath, formik, disabled, originalValue, toolbarItems, formats } = props;
  const { setFieldValue, values, errors } = formik;
  const countryLanguages = getSelectedCountryLanguages();
  return (
    <Row gutter={[theme.spacing(3)]} align="top" className="mb-3">
      <Col span={24} className="mb-2">{label}</Col>
      {countryLanguages.map((countryLanguage, countryIndex) => {
        const path = [...fieldPath, countryLanguage];
        const addonAfter = countryLanguage.toUpperCase();
        const errorPath = getYupErrorPath(path);
        const originalValueByCountry = _.get(originalValue, [countryLanguage]);
        return (
          <Col span={12} key={_.toString(countryIndex)}>
            <Form.Item
              help={_.get(errors, errorPath)}
              validateStatus={_.get(errors, errorPath) ? 'error' : 'success'}
              name={path}
              className={_.get(errors, errorPath) ? '' : 'mb-2'}
            >
              <TextEditor
                originalValue={originalValueByCountry}
                value={_.get(values, path)}
                onChange={htmlValue => {
                  setFieldValue(path, htmlValue);
                }}
                addonAfter={addonAfter}
                disabled={disabled}
                autoComplete="off"
                toolbarItems={toolbarItems}
                formats={formats}
              />
            </Form.Item>
          </Col>
        );
      })}
    </Row>
  );
};

MultiLanguageTextEditor.propTypes = {
  label: PropTypes.string,
  fieldPath: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  formik: PropTypes.shape({}),
  disabled: PropTypes.bool,
  originalValue: PropTypes.shape({}),
};

MultiLanguageTextEditor.defaultProps = {
  label: '',
  fieldPath: [],
  formik: {},
  disabled: false,
  originalValue: {},
};

export default MultiLanguageTextEditor;
