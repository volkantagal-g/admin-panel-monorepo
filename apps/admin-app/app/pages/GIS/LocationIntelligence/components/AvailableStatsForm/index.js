import { Col, Form, Row, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { useFormik } from 'formik';
import { get, uniqueId } from 'lodash';

import { useTranslation } from 'react-i18next';

import { GEOBOUNDARY_TYPES } from './constants';

import { validate } from '@shared/yup';

import {
  defaultAvailableStatsForm,
  availableStatsFormValidationSchema,
} from './formHelper';
import { getLangKey } from '@shared/i18n';

const AvailableStatsForm = props => {
  const { onFieldsChange, onFinish } = props;
  const [form] = useForm();
  const { t } = useTranslation('gisLocationIntelligencePage');

  const formik = useFormik({
    initialValues: defaultAvailableStatsForm,
    validate: validate(availableStatsFormValidationSchema),
    onSubmit: () => {
      onFieldsChange(formik.values);
    },
    enableReinitialize: true,
  });

  const {
    values,
    errors,
    touched,
    setFieldValue,
  } = formik;

  const handleSelectChange = fieldName => {
    return selectedItems => {
      setFieldValue(fieldName, selectedItems);
      onFieldsChange({ [fieldName]: selectedItems });
      form.submit();
    };
  };

  return (
    <Form
      id="form"
      form={form}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row gutter={[16]}>
        <Col span={24}>
          <Form.Item
            validateStatus={
              touched.geoBoundaryType && get(errors, 'geoBoundaryType') ?
                'error' : 'success'
            }
            label={t('GEOBOUNDARY_TYPES_TITLE')}
          >
            <Select
              showSearch
              filterOption
              optionFilterProp={`label.${getLangKey()}`}
              value={values.country}
              placeholder={t('SELECT_GEOBOUNDARY_TYPE')}
              onChange={handleSelectChange('geoBoundaryType')}
            >
              {GEOBOUNDARY_TYPES.map(type => (
                <Select.Option
                  key={uniqueId()}
                  value={type.value}
                  disabled={type.value !== 'polygons'}
                >
                  {type.label[getLangKey()]}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AvailableStatsForm;
