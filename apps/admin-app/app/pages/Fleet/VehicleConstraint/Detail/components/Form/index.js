import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Input } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { get } from 'lodash';

import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import { marketVehicleTypes } from '@shared/shared/constantValues';
import { validate } from '@shared/yup';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../redux/actions';
import {
  updateVehicleConstraintSelector,
  getVehicleConstraintSelector,
} from '../../redux/selectors';
import { validationSchema } from './formHelper';
import useStyles from './styles';
import Footer from '../Footer';
import { formLayout } from '../../../constants';
import { updateVehicleConstraintRequestParams, getVehicleConstraintTagSelectOptions, vehicleConstraintFormatter } from '../../../utils';
import AntSelect from '@shared/components/UI/AntSelect';

const VehicleConstraintForm = () => {
  const { t } = useTranslation('vehicleConstraintPage');
  const { id: vehicleConstraintId } = useParams();
  const classes = useStyles();
  const [form] = Form.useForm();

  const [isEditable, setIsEditable] = useState(false);

  const dispatch = useDispatch();
  const isPendingConstraintUpdate = useSelector(updateVehicleConstraintSelector.getIsPending);
  const isPendingGetConstraint = useSelector(getVehicleConstraintSelector.getIsPending);
  const constraintData = useSelector(getVehicleConstraintSelector.getData);

  const isPending = isPendingConstraintUpdate || isPendingGetConstraint;
  const isDisabled = isPending || !isEditable;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: vehicleConstraintFormatter(constraintData),
    validate: validate(validationSchema),
    onSubmit: formValues => {
      const requestParams = updateVehicleConstraintRequestParams(formValues);
      dispatch(
        Creators.updateVehicleConstraintRequest({
          ...requestParams,
          vehicleConstraintId,
        }),
      );
    },
  });

  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
    values,
    touched,
    errors,
  } = formik;

  useEffect(() => {
    if (vehicleConstraintId) {
      dispatch(Creators.getVehicleConstraintRequest({ vehicleConstraintId }));
    }
  }, [dispatch, vehicleConstraintId]);

  useEffect(() => {
    form.setFieldsValue({ ...values });
  }, [values, form]);

  useEffect(() => {
    if (!isEditable) {
      resetForm();
      form.resetFields();
    }
  }, [form, resetForm, isEditable]);

  return (
    <Form form={form} {...formLayout}>
      <Card
        footer={
          (
            <Footer
              isPending={isPending}
              isEditable={isEditable}
              setIsEditable={setIsEditable}
              handleSubmit={handleSubmit}
            />
          )
        }
        bordered={false}
      >
        <Row gutter={[8]}>
          <Col lg={12} xs={24}>
            <Form.Item label={t('TYPE')}>
              <Input
                disabled
                value={marketVehicleTypes?.[values?.type]?.[getLangKey()]}
              />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="name"
              value={values?.name}
              label={t('NAME')}
              isTouched={get(touched, 'name')}
              hasError={get(errors, 'name')}
              handleChange={handleChange}
              disabled={isDisabled}
            />
          </Col>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="weight"
              value={values?.weight}
              label={t('FORM.WEIGHT')}
              isTouched={get(touched, 'weight')}
              hasError={get(errors, 'weight')}
              setFieldValue={setFieldValue}
              disabled={isDisabled}
              mode="number"
            />
          </Col>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="volume"
              value={values?.volume}
              label={t('FORM.VOLUME')}
              isTouched={get(touched, 'volume')}
              hasError={get(errors, 'volume')}
              setFieldValue={setFieldValue}
              disabled={isDisabled}
              mode="number"
            />
          </Col>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="longestEdge"
              value={values?.longestEdge}
              label={t('FORM.LONGEST_EDGE')}
              isTouched={get(touched, 'longestEdge')}
              hasError={get(errors, 'longestEdge')}
              setFieldValue={setFieldValue}
              disabled={isDisabled}
              mode="number"
            />
          </Col>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="duration"
              value={values?.duration}
              label={t('FORM.DURATION')}
              isTouched={get(touched, 'duration')}
              hasError={get(errors, 'duration')}
              setFieldValue={setFieldValue}
              disabled={isDisabled}
              mode="number"
            />
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label={t('FORM.TAGS')}>
              <AntSelect
                className={classes.tagSelect}
                showArrow
                mode="multiple"
                value={values?.tags}
                onChange={newValues => setFieldValue('tags', newValues)}
                options={getVehicleConstraintTagSelectOptions(t)}
                disabled={isDisabled}
                label={t('FORM.TAGS')}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default VehicleConstraintForm;
