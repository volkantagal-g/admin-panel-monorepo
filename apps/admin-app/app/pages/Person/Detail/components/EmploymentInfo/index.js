import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { SelectWrapper } from '@shared/components/UI/Form';
import { validationSchema } from './formHelper';
import { convertedEmploymentOptions } from '../../utils';
import { DEFAULT_COL_SPACING, DEFAULT_ROW_SPACING } from '../../constants';
import Footer from '../Footer';

const EmploymentInfo = ({ data, isPending, isSuccessPersonUpdate, handleUpdate, editPermKey }) => {
  const { t } = useTranslation('personPage');

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: data,
    onSubmit: formValues => {
      return handleUpdate({ onlyPerson: true, updateData: formValues });
    },
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
    };
  };

  return (
    <Form form={form} layout="vertical">
      <AntCard
        footer={(
          <Footer
            initialValues={data}
            values={values}
            setValues={setValues}
            resetForm={resetForm}
            isFormEditable={isFormEditable}
            setIsFormEditable={setIsFormEditable}
            permKey={editPermKey}
            isPending={isPending}
            isSuccessPersonUpdate={isSuccessPersonUpdate}
            handleSubmit={handleSubmit}
            confirmTitle={t('EMPLOYMENT.CONFIRM')}
          />
        )}
        bordered={false}
        title={t('EMPLOYMENT.TITLE')}
      >
        <Row gutter={DEFAULT_ROW_SPACING}>
          <Col {...DEFAULT_COL_SPACING}>
            <SelectWrapper
              selectKey="employmentType"
              label={t('EMPLOYMENT.TITLE')}
              value={values.employmentType}
              optionLabelProp="label"
              optionValueProp="value"
              hasError={get(errors, 'employmentType')}
              isTouched={get(touched, 'employmentType')}
              optionsData={convertedEmploymentOptions}
              disabled={isPending || !isFormEditable}
              onChangeCallback={handleFieldChange('employmentType')}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default EmploymentInfo;
