import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { get, toString } from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { TextEditor } from '@shared/components/GUI/TextEditor';
import { getYupErrorPath } from '@shared/yup';
import { generateComponentId } from '@shared/utils/generateComponentId';
import { getAutoColProps } from '@shared/components/GUI/utils';

export const MultiLanguageTextEditor = ({
  label,
  fieldPath,
  formik,
  disabled,
  originalValue,
  toolbarItems,
  formats,
  colProps,
  wrapperId,
  autoGrid,
}) => {
  const { setFieldValue, values, errors } = formik;
  const countryLanguages = getSelectedCountryLanguages();
  let autoColProps;
  if (autoGrid) {
    autoColProps = getAutoColProps(countryLanguages);
  }

  return (
    <div>
      {label && <div className="mb-2">{label}</div>}
      <Row
        gutter={16}
        align="top"
        className="mb-3"
        {...(wrapperId && { id: wrapperId })}
      >
        {countryLanguages.map((countryLanguage, countryIndex) => {
          const path = [...fieldPath, countryLanguage];
          const addonAfter = countryLanguage.toUpperCase();
          const errorPath = getYupErrorPath(path);
          const originalValueByCountry = get(originalValue, [countryLanguage]);
          return (
            <Col
              key={toString(countryIndex)}
              {...(wrapperId && { id: generateComponentId(path) })}
              {...(autoGrid ? autoColProps : colProps)}
            >
              <TextEditor
                originalValue={originalValueByCountry}
                value={get(values, path)}
                onChange={htmlValue => {
                  setFieldValue(path, htmlValue);
                }}
                addonAfter={addonAfter}
                disabled={disabled}
                autoComplete="off"
                toolbarItems={toolbarItems}
                formats={formats}
                label={countryLanguage.toUpperCase()}
                name={errorPath}
                errors={errors}
              />
            </Col>
          );
        })}
      </Row>

    </div>
  );
};

MultiLanguageTextEditor.propTypes = {
  label: PropTypes.string,
  fieldPath: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  formik: PropTypes.shape({}),
  disabled: PropTypes.bool,
  originalValue: PropTypes.shape({}),
  colProps: PropTypes.shape({}),
};

MultiLanguageTextEditor.defaultProps = {
  label: '',
  fieldPath: [],
  formik: {},
  disabled: false,
  originalValue: {},
  colProps: { xs: 24, md: 12, lg: 8 },
};
