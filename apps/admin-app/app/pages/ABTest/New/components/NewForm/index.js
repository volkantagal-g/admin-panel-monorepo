import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col, DatePicker, Typography, Space } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { get } from 'lodash';
import moment from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { getLocalDateFormat } from '@shared/utils/localization';
import { SelectWrapper } from '@shared/components/UI/Form';
import { TEST_TYPES } from '@app/pages/ABTest/constants';
import { getDisabledDateByTestType, testTypeConstraints } from '@app/pages/ABTest/utils';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import { Creators } from '../../redux/actions';
import { getImportVariationsCSVFileSelector } from '../../redux/selectors';
import { getInitialValues, mapVariationsBeforeSubmit, validationSchema } from './formHelper';
import useStyles from './styles';
import CSVUpload from '../CSVUpload';
import TemplateSearch from '../TemplateSearch';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const NewForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('abTestingPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const classes = useStyles();
  const isImportVariationCSVFilePending = useSelector(getImportVariationsCSVFileSelector.getIsPending);

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: getInitialValues(),
    validate: validate(validationSchema),
    onSubmit: data => {
      const requestData = {
        ...data,
        variations: mapVariationsBeforeSubmit(data.variations),
      };

      if (data.testType === TEST_TYPES.CSV_UPLOAD) {
        delete requestData.templateId;
      }

      dispatch(Creators.createABTestRequest({ requestData }));
    },
  });

  const { handleSubmit, values, errors, setFieldValue, touched, setFieldError, setFieldTouched } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  const validateVariationsFileUrl = () => Object.keys(errors).some(errorKey => {
    return errorKey.indexOf('variationFileURL') > 0;
  });

  const handleSaveButtonClick = clickEvent => {
    if (validateVariationsFileUrl()) {
      dispatch(ToastCreators.error({ message: t('error:REQUIRED_WITH_FIELD', { fieldName: t('global:CSV_FILE') }) }));
    }
    handleSubmit(clickEvent);
  };

  const cardFooter = (
    <Row justify="end">
      <Form.Item className="m-0">
        <Button form="user-new" type="primary" htmlType="submit" onClick={handleSaveButtonClick} loading={isImportVariationCSVFilePending}>
          {t('button:SAVE')}
        </Button>
      </Form.Item>
    </Row>
  );

  const handleDateFieldsChange = selectedDates => {
    const testStartDate = (selectedDates && selectedDates[0]) || moment();
    const testEndDate = (selectedDates && selectedDates[1]) || moment();

    setFieldValue('testStartDate', testStartDate);
    setFieldValue('testEndDate', testEndDate);
  };

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
    };
  };

  const handlePercentageFieldsChange = value => {
    setFieldValue('controlGroupPercentage', value);
    setFieldValue('testGroupPercentage', (100 - value));
  };

  const handleTestTypeChange = value => {
    setFieldValue('testType', value);
    setFieldValue('variationsCount', null);
    setFieldValue('variations', []);
    handleDateFieldsChange();
  };

  const getTestTypeInput = () => {
    if (values.testType === null) return null;
    if (values.testType === TEST_TYPES.CSV_UPLOAD) {
      return (
        <CSVUpload
          values={values}
          errors={errors}
          touched={touched}
          isPending={isImportVariationCSVFilePending}
          handleFieldChange={handleFieldChange}
          setFieldValue={setFieldValue}
          setFieldError={setFieldError}
          setFieldTouched={setFieldTouched}
        />
      );
    }
    return (
      <TemplateSearch
        values={values}
        errors={errors}
        touched={touched}
        isPending={isImportVariationCSVFilePending}
        handleFieldChange={handleFieldChange}
        handlePercentageFieldsChange={handlePercentageFieldsChange}
        setFieldValue={setFieldValue}
      />
    );
  };

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('TITLE')}>
      <Form form={form} id="abtest-new" onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <Form.Item
              help={get(errors, 'testName')}
              validateStatus={get(errors, 'testName') ? 'error' : 'success'}
              name={['testName']}
              label={t('TEST_NAME')}
            >
              <Input
                value={values.testName}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('testName', value);
                }}
                disabled={isImportVariationCSVFilePending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={get(errors, 'testDescription')}
              validateStatus={get(errors, 'testDescription') ? 'error' : 'success'}
              name={['testDescription']}
              label={t('global:DESCRIPTION')}
            >
              <Input
                value={values.testDescription}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('testDescription', value);
                }}
                disabled={isImportVariationCSVFilePending}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <Space direction="vertical" className={[classes.marginBottom, classes.fullWidth]}>
              <Text>{t('global:DATE_RANGE')}</Text>
              <RangePicker
                className={classes.fullWidth}
                value={[values.testStartDate, values.testEndDate]}
                onChange={handleDateFieldsChange}
                format={getLocalDateFormat()}
                allowClear
                disabled={isImportVariationCSVFilePending}
                disabledDate={getDisabledDateByTestType(values.testType)}
              />
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" className={classes.fullWidth}>
              <Form.Item
                help={get(errors, 'testCode')}
                validateStatus={get(errors, 'testCode') ? 'error' : 'success'}
                name={['testCode']}
                label={t('TEST_CODE')}
              >
                <Input
                  value={values.testCode}
                  onChange={event => {
                    const value = get(event, 'target.value', '');
                    setFieldValue('testCode', value);
                  }}
                  disabled={isImportVariationCSVFilePending}
                  autoComplete="off"
                />
              </Form.Item>
            </Space>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="testType"
              label={t('TEST_TYPE')}
              value={values.testType}
              optionLabelProp="label"
              optionValueProp="value"
              hasError={get(errors, 'testType')}
              isTouched={get(touched, 'testType')}
              optionsData={testTypeConstraints(t)}
              onChangeCallback={handleTestTypeChange}
              disabled={isImportVariationCSVFilePending}
              shouldMapOptionsData
            />
          </Col>
        </Row>
        {getTestTypeInput(values)}
      </Form>
    </AntCard>
  );
};

export default NewForm;
