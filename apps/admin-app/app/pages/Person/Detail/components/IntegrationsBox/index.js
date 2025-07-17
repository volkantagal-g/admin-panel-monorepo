import { useEffect, useState } from 'react';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { InputWrapper } from '@shared/components/UI/Form';
import { validationSchema } from './formHelper';
import { DEFAULT_COL_SPACING, DEFAULT_ROW_SPACING } from '../../constants';
import Footer from '../Footer';

const IntegrationsBox = ({ data, isPending, isSuccessPersonUpdate, handleUpdate, editPermKey }) => {
  const { t } = useTranslation('personPage');

  const [isFormEditable, setIsFormEditable] = useState(false);

  const [form] = Form.useForm();
  const formik = useFormik({
    enableReinitialize: true,
    validate: validate(validationSchema),
    initialValues: data,
    onSubmit: formData => {
      const updateData = { payrollId: formData.payrollId || null };
      return handleUpdate({ updateData, onlyPerson: true });
    },
  });

  const { handleSubmit, handleChange, values, errors, touched, setValues, resetForm } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

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
          />
        )}
        bordered={false}
        title={t('INTEGRATIONS.TITLE')}
      >
        <Row gutter={DEFAULT_ROW_SPACING}>
          <Col {...DEFAULT_COL_SPACING}>
            <InputWrapper
              inputKey="payrollId"
              label={t('INTEGRATIONS.PAYROLL_ID')}
              value={get(values, 'payrollId')}
              isTouched={get(touched, 'payrollId')}
              hasError={get(errors, 'payrollId')}
              handleChange={handleChange}
              disabled={isPending || !isFormEditable}
              setDefaultValue={false}
            />
          </Col>
        </Row>
      </AntCard>
    </Form>
  );
};

export default IntegrationsBox;
