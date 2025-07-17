import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Select, Input } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';

import Card from '@shared/components/UI/AntCard';
import { InputWrapper } from '@shared/components/UI/Form';
import { marketVehicleTypes } from '@shared/shared/constantValues';
import { validate } from '@shared/yup';
import { getLangKey } from '@shared/i18n';
import { Creators } from '../../redux/actions';
import { createVehicleConstraintSelector, getVehicleConstraintsSelector } from '../../redux/selectors';
import { defaultValues, validationSchema } from './formHelper';
import Footer from '../Footer';
import { formLayout } from '../../../constants';
import useStyles from './styles';
import { createVehicleConstraintRequestParams, getVehicleConstraintTagSelectOptions } from '../../../utils';
import AntSelect from '@shared/components/UI/AntSelect';

const { Item, useForm } = Form;

const VehicleConstraintForm = () => {
  const { t } = useTranslation('vehicleConstraintPage');
  const [form] = useForm();
  const classes = useStyles();

  const dispatch = useDispatch();
  const isPendingCreateConstraint = useSelector(createVehicleConstraintSelector.getIsPending);
  const constraintsData = useSelector(getVehicleConstraintsSelector.getData);
  const isPendingGetConstraints = useSelector(getVehicleConstraintsSelector.getIsPending);

  const isPending = isPendingCreateConstraint || isPendingGetConstraints;

  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validate: validate(validationSchema),
    onSubmit: formValues => {
      const requestParams = createVehicleConstraintRequestParams(formValues);
      dispatch(Creators.createVehicleConstraintRequest(requestParams));
    },
  });
  const { handleSubmit, handleChange, setValues, setFieldValue, values, touched, errors } = formik;

  const handleInputChange = (key, value) => {
    setFieldValue(key, value);
  };

  const handleReferenceChange = (_, { label, value, type, constraints }) => {
    setValues({ ...values, ...constraints });
    handleInputChange('reference', { label, value, type });
  };

  useEffect(() => {
    dispatch(Creators.getVehicleConstraintsRequest());
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue({ ...values });
  }, [values, form]);

  return (
    <Form form={form} {...formLayout}>
      <Card
        footer={<Footer isPending={isPending} handleSubmit={handleSubmit} />}
        bordered={false}
      >
        <Row gutter={[8]}>
          <Col lg={12} xs={24}>
            <Item
              name="reference"
              label={t('REFERENCE')}
              help={get(touched, 'reference') && get(errors, 'reference')}
              validateStatus={get(touched, 'reference') && get(errors, 'reference') ? 'error' : 'success'}
            >
              <Select
                labelInValue
                value={values?.reference}
                options={constraintsData}
                onChange={handleReferenceChange}
                disabled={isPending}
              />
            </Item>
          </Col>
          <Col lg={12} xs={24}>
            <Item label={t('TYPE')}>
              <Input
                disabled
                value={marketVehicleTypes?.[values?.reference?.type]?.[getLangKey()]}
              />
            </Item>
          </Col>
          <Col lg={12} xs={24}>
            <InputWrapper
              inputKey="name"
              value={values?.name}
              label={t('NAME')}
              isTouched={get(touched, 'name')}
              hasError={get(errors, 'name')}
              handleChange={handleChange}
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
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
                disabled={isPending}
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
