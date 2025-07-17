import React from 'react';
import { Form, Row, Col } from 'antd';
import { useTheme } from 'react-jss';
import { toString as ltoString, get as lget } from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import AntTextArea from '@shared/components/UI/AntTextArea';
import { getYupErrorPath } from '@shared/yup';

type Language = { label: string, value: string } | string

type MultiLanguageTextAreaProps = {
  label: string[],
  fieldPath: string[],
  formik: any,
  disabled: boolean,
  // eslint-disable-next-line react/require-default-props
  filteredLanguages?: Language[],
};

const MultiLanguageTextArea = (props: MultiLanguageTextAreaProps) => {
  const theme = useTheme() as any;
  const { label, fieldPath, formik, disabled, filteredLanguages } = props;
  const { setFieldValue, values, errors } = formik;
  let countryLanguages: string[] = getSelectedCountryLanguages();
  if (filteredLanguages) {
    countryLanguages = filteredLanguages?.map((item: Language | string) => (typeof item === 'object' ? item?.label : item));
  }
  return (
    <Row gutter={[theme.spacing(3), theme.spacing(3)]} align="top" className="mb-3">
      <Col span={24} className="mb-2">{label}</Col>
      {countryLanguages.map((countryLanguage, countryIndex) => {
        const path = [...fieldPath, countryLanguage];
        const addonAfter = countryLanguage.toUpperCase();
        const errorPath = getYupErrorPath(path);
        return (
          <Col span={12} key={ltoString(countryIndex)}>
            <Form.Item
              help={lget(errors, errorPath)}
              validateStatus={lget(errors, errorPath) ? 'error' : 'success'}
              name={path}
              className={lget(errors, errorPath) ? '' : 'mb-2'}
            >
              <AntTextArea
                value={lget(values, path)}
                onChange={(event: React.ChangeEvent) => {
                  const value = lget(event, 'target.value', '');
                  setFieldValue(path, value);
                }}
                addonAfter={addonAfter}
                disabled={disabled}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        );
      })}
    </Row>
  );
};

export default MultiLanguageTextArea;
