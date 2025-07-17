import { useEffect, useMemo } from 'react';
import { Form, Row, Col, DatePicker, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useDispatch } from 'react-redux';

import { getLocalDateFormat } from '@shared/utils/localization';
import {
  getUpdatedExcludedDays,
  mapWarehouseDomainTypeOptions,
  warehouseDomainConstraints,
} from '@app/pages/CourierPlan/utils';
import useStyles from './styles';
import Card from '@shared/components/UI/AntCard';
import {
  defaultValues,
  validationSchema,
  validationFns,
  calculateRate2ByRate1,
} from './formHelper';
import Footer from '../Footer';
import {
  MultipleDatePickerWrapper,
  InputWrapper,
  SelectWrapper,
} from '@shared/components/UI/Form';
import { Creators } from '../../redux/actions';
import { validate } from '@shared/yup';
import { useEffectSkipInitialRender } from '@shared/hooks';

const { useForm } = Form;
const { Text } = Typography;
const { RangePicker } = DatePicker;

function FormWrapper(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation(['courierPlanPage']);
  const [form] = useForm();
  const classes = useStyles();
  const { isPending } = props;

  const formik = useFormik({
    initialValues: defaultValues,
    validate: validate(() => validationSchema(t)),
    onSubmit: values => {
      dispatch(Creators.createCourierPlanRequest({ requestBody: values }));
    },
    enableReinitialize: true,
  });

  const { handleSubmit, handleChange, values, errors, touched, setFieldValue } =
    formik;

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
    };
  };

  const handleNumberChange = (inputKey, inputValue) => {
    if (inputKey === 'properties.rate1') {
      setFieldValue('properties.rate2', calculateRate2ByRate1(inputValue));
    }
    setFieldValue(inputKey, inputValue);
  };

  const {
    isWarehouseDomainTypeSelectable,
    isGetirFoodDisabled,
    isGetirLocalsDisabled,
  } = useMemo(() => {
    const warehouseDomainTypes = mapWarehouseDomainTypeOptions(
      values.properties.warehouseDomainType,
    );
    return {
      isWarehouseDomainTypeSelectable:
        validationFns.isWarehouseDomainTypeSelectable(warehouseDomainTypes),
      isGetirFoodDisabled:
        validationFns.isGetirFoodDisabled(warehouseDomainTypes),
      isGetirLocalsDisabled:
        validationFns.isGetirLocalsDisabled(warehouseDomainTypes),
    };
  }, [values.properties.warehouseDomainType]);

  useEffect(() => {
    form.setFieldsValue({
      ...values,
      ...Object.keys(values.properties).reduce((p, c) => {
        // eslint-disable-next-line no-param-reassign
        p[`properties.${c}`] = values.properties[c];
        return p;
      }, {}),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.properties]);

  useEffect(() => {
    if (isGetirFoodDisabled) {
      setFieldValue('properties.getirFoodRate', '');
    }
    if (isGetirLocalsDisabled) {
      setFieldValue('properties.getirLocalsRate', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.properties.warehouseDomainType]);

  useEffectSkipInitialRender(() => {
    if (values.properties.excludedDays.length) {
      const updatedDays = getUpdatedExcludedDays(values.properties);
      setFieldValue('properties.excludedDays', updatedDays);
    }
  }, [values.properties.referenceDay1, values.properties.referenceDay2]);

  return (
    <Card
      title={t('GENERAL_INFO')}
      bordered={false}
      footer={<Footer isPending={isPending} />}
    >
      <Form
        id="new-courier-plan"
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Row gutter={[16]} align="bottom">
          <Col sm={12} xs={24}>
            <SelectWrapper
              selectKey="properties.warehouseDomainType"
              label={t('DOMAIN_TYPE')}
              placeholder={t('DOMAIN_TYPE')}
              value={values.properties.warehouseDomainType}
              optionLabelProp="label"
              optionValueProp="value"
              hasError={get(errors, 'properties.warehouseDomainType')}
              isTouched={get(touched, 'properties.warehouseDomainType')}
              optionsData={warehouseDomainConstraints(t)}
              onChangeCallback={handleFieldChange(
                'properties.warehouseDomainType',
              )}
              optionsSelectable={isWarehouseDomainTypeSelectable}
              mode="multiple"
              disabled={isPending}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col sm={12} xs={24}>
            <InputWrapper
              setDefaultValue={false}
              inputKey="name"
              label={t('PLAN_NAME')}
              value={values.name}
              isTouched={get(touched, 'name')}
              hasError={get(errors, 'name')}
              handleChange={handleChange}
              disabled={isPending}
              additionalProps={{ placeholder: t('PLAN_NAME') }}
            />
          </Col>
          <Col sm={12} xs={24}>
            <Space
              direction="vertical"
              className={`${classes.fullWidth} ${classes.marginBottom}`}
            >
              <Text>{t('PLAN_DATE')}</Text>
              <RangePicker
                className={classes.fullWidth}
                value={values.planDate}
                onChange={handleFieldChange('planDate')}
                format={getLocalDateFormat()}
                allowClear={false}
                disabledDate={validationFns.isPlanDateDisabledFor}
                disabled={isPending}
              />
            </Space>
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col sm={8} xs={16}>
            <Space direction="vertical" className={classes.fullWidth}>
              <Text>{t('REFERENCE_DAY_1')}</Text>
              <RangePicker
                className={classes.fullWidth}
                value={values.properties.referenceDay1}
                onChange={handleFieldChange('properties.referenceDay1')}
                format={getLocalDateFormat()}
                allowClear={false}
                disabledDate={validationFns.isReferenceDayDisabledFor}
                disabled={isPending}
              />
            </Space>
          </Col>
          <Col sm={4} xs={8}>
            <InputWrapper
              inputKey="properties.rate1"
              label={t('RATE_1')}
              value={values.properties.rate1}
              isTouched={get(touched, 'properties.rate1')}
              hasError={get(errors, 'properties.rate1')}
              setFieldValue={handleNumberChange}
              mode="number"
              additionalProps={{ min: 0, max: 1, step: 0.1 }}
              disabled={isPending}
            />
          </Col>
          <Col sm={8} xs={16}>
            <Space direction="vertical" className={classes.fullWidth}>
              <Text>{t('REFERENCE_DAY_2')}</Text>
              <RangePicker
                className={classes.fullWidth}
                value={values.properties.referenceDay2}
                onChange={handleFieldChange('properties.referenceDay2')}
                format={getLocalDateFormat()}
                allowClear
                disabledDate={validationFns.isReferenceDayDisabledFor}
                disabled={isPending}
              />
            </Space>
          </Col>
          <Col sm={4} xs={8}>
            <InputWrapper
              inputKey="properties.rate2"
              label={t('RATE_2')}
              value={values.properties.rate2}
              isTouched={get(touched, 'properties.rate2')}
              hasError={get(errors, 'properties.rate2')}
              setFieldValue={handleNumberChange}
              mode="number"
              additionalProps={{ min: 0, max: 1, step: 0.1 }}
              disabled
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col xs={24}>
            <MultipleDatePickerWrapper
              selectKey="properties.excludedDays"
              label={t('EXCLUDED_DAYS')}
              value={values.properties.excludedDays}
              hasError={get(errors, 'properties.excludedDays')}
              isTouched={get(touched, 'properties.excludedDays')}
              onChangeCallback={handleFieldChange('properties.excludedDays')}
              allowClear
              disabled={isPending}
              disabledDate={current => validationFns.isExcludedDaysDisabledFor(
                current,
                values.properties,
              )}
            />
          </Col>
        </Row>
        <Row gutter={[16]} align="top">
          <Col sm={12} xs={24}>
            <InputWrapper
              inputKey="properties.getirFoodRate"
              label={t('GETIR_FOOD_RATE')}
              value={values.properties.getirFoodRate}
              isTouched={get(touched, 'properties.getirFoodRate')}
              hasError={get(errors, 'properties.getirFoodRate')}
              setFieldValue={handleNumberChange}
              mode="number"
              disabled={isGetirFoodDisabled || isPending}
            />
          </Col>
          <Col sm={12} xs={24}>
            <InputWrapper
              inputKey="properties.getirLocalsRate"
              label={t('GETIR_LOCALS_RATE')}
              value={values.properties.getirLocalsRate}
              isTouched={get(touched, 'properties.getirLocalsRate')}
              hasError={get(errors, 'properties.getirLocalsRate')}
              setFieldValue={handleNumberChange}
              mode="number"
              disabled={isGetirLocalsDisabled || isPending}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default FormWrapper;
