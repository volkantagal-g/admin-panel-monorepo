import { useEffect, useState } from 'react';
import { Form, Row, Col, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useTheme } from 'react-jss';
import PropTypes from 'prop-types';

import { validate } from '@shared/yup';
import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import { validationSchema, getInitialValues } from './formHelper';
import { Creators } from '../../redux/actions';
import Footer from '../Footer';

const { useForm } = Form;

const UpdateWarehouseSegmentForm = ({ segmentData, segmentIsPending }) => {
  const { t } = useTranslation('warehouseSegmentPage');
  const dispatch = useDispatch();

  const [form] = useForm();
  const theme = useTheme();
  const { id: pageId } = useParams();

  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialValues = getInitialValues(segmentData);

  const formik = useFormik({
    initialValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      dispatch(Creators.updateWarehouseSegmentRequest({
        segmentId: pageId,
        name: values.name?.trim(),
        isDefault: values.isDefault,
      }));
      setIsFormEditable(false);
    },
    enableReinitialize: true,
  });

  const { handleSubmit, values, errors, touched, handleChange, setValues } = formik;

  const handleEditClick = () => {
    setIsFormEditable(true);
  };

  const handleCancelClick = () => {
    setValues(initialValues);
    setIsFormEditable(false);
  };

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues.name, initialValues.isDefault]);

  return (
    <>
      <Card
        title={t('DETAIL.FORM.TITLE')}
        footer={
          <Footer
            handleSubmit={handleSubmit}
            handleCancelClick={handleCancelClick}
            handleEditClick={handleEditClick}
            isDefault={values?.isDefault}
            isFormEditable={isFormEditable}
          />
        } 
        bordered={false}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Row gutter={[theme.spacing(3)]}>
            <Col md={12} xs={24}>
              <InputWrapper
                inputKey="name"
                name="name"
                value={values.name}
                label={t("DETAIL.FORM.NAME")}
                isTouched={get(touched, 'name')}
                hasError={get(errors, 'name')}
                disabled={!isFormEditable || segmentIsPending}
                handleChange={handleChange}
              />
            </Col>
            <Col md={12} xs={24}>
              <InputWrapper
                name="type"
                inputKey="type"
                label={t("DETAIL.FORM.TYPE")}
                disabled
              />
            </Col>
            <Col>
              <Checkbox
                name="isDefault"
                checked={values.isDefault}
                onChange={handleChange}
                disabled={!isFormEditable || segmentIsPending}
              >
                {t("DETAIL.FORM.IS_DEFAULT")}
              </Checkbox>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
};

UpdateWarehouseSegmentForm.propTypes = { 
  segmentData: PropTypes.object,
  segmentIsPending: PropTypes.bool,
};

export default UpdateWarehouseSegmentForm;
