import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { isEqual, get } from 'lodash';

import { defaultValues, validationSchema } from './formHelper';
import Card from '@shared/components/UI/AntCard';
import Footer from '../Footer';
import { validate } from '@shared/yup';
import AntSelect from '@shared/components/UI/AntSelect';
import { PICKER_EMPLOYMENT_TYPES } from '@shared/shared/constantValues';
import { convertConstantValuesToSelectOptions } from '@shared/utils/common';

const { useForm } = Form;

function EmploymentType({ submitRequest, employmentType, personEmploymentType }) {
  const { t } = useTranslation('pickerDetailPage');
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);
  const initialProps = { employmentType };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (personEmploymentType) {
        notification.error({ message: t('UPDATE_EMPLOYMENT_TYPE_ON_PERSON_PAGE') });
      }
      if (isEqual(values, initialProps)) {
        return false;
      }
      submitRequest({ employmentType: values.employmentType });
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const {
    handleSubmit,
    values,
    setFieldValue,
    setValues,
    touched,
    errors,
  } = formik;
  const handleResetForm = () => {
    if (isEqual(values, initialProps)) {
      return false;
    }

    setValues(initialProps);
    form.setFieldsValue(initialProps);
    return true;
  };

  useEffect(() => {
    form.setFieldsValue({ employmentType });
    setValues({ employmentType });
  }, [form, employmentType, setValues]);

  return (
    <Col span={24}>
      <Card title={t('EMPLOYMENT_TYPE')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={24}>
              <Form.Item
                name="employmentType"
                hasError={get(errors, 'employmentType')}
                isTouched={get(touched, 'employmentType')}
                label={t('EMPLOYMENT_TYPE')}
              >

                <AntSelect
                  disabled={!isFormEditable}
                  value={values.employmentType}
                  selectKey="employmentType"
                  options={convertConstantValuesToSelectOptions(PICKER_EMPLOYMENT_TYPES)}
                  onChange={selectedEmploymentType => {
                    setFieldValue('employmentType', selectedEmploymentType);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row align="bottom">
            <Col span={24}>
              <Footer
                formButtonVisibilty={isFormEditable}
                setFormButtonVisibilty={setIsFormEditable}
                handleReset={handleResetForm}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </Col>
  );
}

EmploymentType.propTypes = { submitRequest: PropTypes.func.isRequired };

export default EmploymentType;
