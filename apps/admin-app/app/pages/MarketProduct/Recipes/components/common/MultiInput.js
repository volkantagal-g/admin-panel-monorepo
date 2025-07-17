import * as Yup from 'yup';
import { get } from 'lodash';
import { Col } from 'antd';

import { TextInput } from '@shared/components/GUI/TextInput';

export const MultiInputValidation = ({ languages, isRequired }) => {
  const entries = languages.map(language => [
    language,
    isRequired ? Yup.string().required() : Yup.string(),
  ]);

  const languageValidations = Object.fromEntries(entries);
  const schema = Yup.object().shape(languageValidations);

  return isRequired ? schema.required() : schema;
};

export const MultiInput = ({ formik, name, disabled, label, languages = [], colProps }) => {
  const { values, errors, setFieldValue } = formik;

  return (
    languages.map(language => {
      const fieldPath = [name, language];

      return (
        <Col {...colProps}>
          <TextInput
            value={get(values, fieldPath)}
            onChange={event => {
              setFieldValue(fieldPath, event.target.value);
            }}
            disabled={disabled}
            name={`${name}.${language}`}
            label={`${label} (${language.toUpperCase()})`}
            errors={errors}
          />
        </Col>
      );
    }));
};
