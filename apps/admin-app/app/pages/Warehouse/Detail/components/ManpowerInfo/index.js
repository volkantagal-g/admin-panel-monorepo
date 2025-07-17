import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import _ from 'lodash';

import { usePermission } from '@shared/hooks';
import { InputWrapper } from '@shared/components/UI/Form';
import Card from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import permKey from '@shared/shared/permKey.json';
import Footer from '../Footer';
import { defaultValues, validationSchema } from './formHelper';

const { useForm } = Form;

function ManpowerInfo({ manHourFeeGroup, submitRequest }) {
  const { Can } = usePermission();
  const { t } = useTranslation();
  const [form] = useForm();
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = { manHourFeeGroup };

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      if (_.isEqual(values, initialProps)) {
        return false;
      }
      submitRequest({ budgetItem: values });
      setIsFormEditable(false);
      return true;
    },
    enableReinitialize: true,
  });

  const handleResetForm = () => {
    const formData = form.getFieldValue();
    if (_.isEqual(formData, initialProps)) {
      return false;
    }

    setValues({ ...initialProps });
    form.setFieldsValue({ ...initialProps });
    return true;
  };

  const { handleSubmit, setFieldValue, values, errors, touched, setValues } = formik;

  useEffect(() => {
    form.setFieldsValue({ manHourFeeGroup });
    setValues({ manHourFeeGroup });
  }, [form, setValues, manHourFeeGroup]);

  return (
    <>
      <Card title={t('warehousePage:MANPOWER_INFO')}>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Row gutter={[16]} align="bottom">
            <Col span={12}>
              <InputWrapper
                inputKey="manHourFeeGroup"
                label={t('warehousePage:MANPOWER_GROUP')}
                value={values.manHourFeeGroup}
                isTouched={_.get(touched, 'manHourFeeGroup')}
                hasError={_.get(errors, 'manHourFeeGroup')}
                setFieldValue={setFieldValue}
                disabled={!isFormEditable}
                mode="number"
              />
            </Col>
          </Row>
          <Can permKey={permKey.PAGE_WAREHOUSE_DETAIL_EDIT_MANPOWER_INFO}>
            <Row>
              <Col span={24}>
                <Footer formButtonVisibilty={isFormEditable} setFormButtonVisibilty={setIsFormEditable} handleReset={handleResetForm} />
              </Col>
            </Row>
          </Can>
        </Form>
      </Card>
    </>
  );
}

ManpowerInfo.propTypes = { manHourFeeGroup: PropTypes.number };

export default ManpowerInfo;
