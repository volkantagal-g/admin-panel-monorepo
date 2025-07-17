import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Input, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import moment from 'moment';

import { get } from 'lodash';

import {
  Card,
  FormItem,
  TextInput,
  Select,
  Button,
  Modal,
  TextEditor,
} from '@shared/components/GUI';

import TemplateSearch from '../TemplateSearch';

import { validate } from '@shared/yup';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { getDisabledDateByTestType } from '@app/pages/ABTestV2/utils';

import { Creators } from '../../redux/actions';
import { createABTestSelector, getTestTypeListSelector } from '../../redux/selectors';
import {
  getInitialValues,
  mapVariationsBeforeSubmit,
  validationSchema,
} from './formHelper';
import useStyles from './styles';

const { Option } = Select;
const { RangePicker } = DatePicker;

const NEW_ITEM = 'NEW_ITEM';

const NewForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('abTestingV2Page');
  const [form] = Form.useForm();
  const theme = useTheme();
  const classes = useStyles();
  const formId = 'abtest-new';

  const getIsPending = useSelector(createABTestSelector.getIsPending);
  const testTypeListPending = useSelector(getTestTypeListSelector.getIsPending);
  const testTypeList = useSelector(getTestTypeListSelector.getData);

  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState(null);
  const [currentTestTypeList, setCurrentTestTypeList] = useState([]);

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: getInitialValues(),
    validate: validate(validationSchema),
    onSubmit: data => {
      const requestData = {
        testName: data?.testName,
        testCode: data?.testCode,
        testDomain: data?.testDomain,
        testStartDate: data?.testStartDate.format(DEFAULT_DATE_FORMAT),
        testEndDate: data?.testEndDate.format(DEFAULT_DATE_FORMAT),
        description: data?.description,
        templateId: data?.templateId,
        templateName: data?.templateName,
        experimentMotivation: data?.experimentMotivation,
        variations: mapVariationsBeforeSubmit(data.variations),
        variationsCount: data?.variationsCount,
        domainType: 1,
      };
      dispatch(Creators.createABTestRequest({ requestData }));
    },
  });
  const { handleSubmit, values, setFieldValue, errors } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  useEffect(() => {
    setCurrentTestTypeList(testTypeList);
  }, [testTypeList]);

  const handleFormValueChange = (field, value) => {
    form.setFieldsValue({ ...form.getFieldsValue(), [field]: value });
    setFieldValue(field, value, true);
  };

  const handleFieldChange = fieldName => {
    return value => {
      setFieldValue(fieldName, value);
    };
  };

  const handleDateFieldsChange = selectedDates => {
    const testStartDate = (selectedDates && selectedDates[0]) || moment();
    const testEndDate = (selectedDates && selectedDates[1]) || moment();

    handleFormValueChange('testStartDate', testStartDate);
    handleFormValueChange('testEndDate', testEndDate);
  };

  const list1SelectOptions = currentTestTypeList.map(o => (
    <Option key={o}>{o}</Option>
  ));

  return (
    <>
      <Modal
        title={t('ADD_NEW_TEST_DOMAIN')}
        visible={openAddItemModal}
        onOk={() => {
          if (newItem !== '' && newItem && newItem !== '-') {
            if (!currentTestTypeList.includes(newItem)) {
              currentTestTypeList.push(newItem);
            }
            handleFormValueChange('testDomain', newItem);
          }
          else handleFormValueChange('testDomain', null);
          setCurrentTestTypeList(currentTestTypeList);
          setOpenAddItemModal(false);
        }}
        onCancel={() => {
          handleFormValueChange('testDomain', null);
          setOpenAddItemModal(false);
        }}
        closable
        centered={false}
      >
        <Input
          placeholder={t('PLEASE_ENTER_NEW_TEST_DOMAIN')}
          onChange={event => setNewItem(event.target.value)}
        />
      </Modal>
      <Card bordered={false}>
        <Form form={form} id={formId} onFinish={handleSubmit} layout="vertical">
          <Row
            gutter={[theme.spacing(3)]}
            align="bottom"
            className={classes.row}
          >
            <Col span={12}>
              <TextInput
                errors={errors}
                name="testName"
                disabled={getIsPending}
                value={values.testName}
                label={<span className={classes.label}>{t('TEST_NAME')}</span>}
                onChange={event => {
                  handleFormValueChange('testName', event.target.value);
                }}
                autoComplete="off"
              />
            </Col>
            <Col span={12}>
              <RangePicker
                errors={errors}
                disabled={[true, getIsPending]}
                value={[values.testStartDate, values.testEndDate]}
                allowClear={false}
                showTime={{ format: DEFAULT_DATE_FORMAT }}
                onChange={handleDateFieldsChange}
                onCalendarChange={handleDateFieldsChange}
                format={DEFAULT_DATE_FORMAT}
                disabledDate={getDisabledDateByTestType(values.testDomain)}
                className={classes.rangepicker}
              />
            </Col>
          </Row>
          <Row gutter={[theme.spacing(3)]} className={classes.row}>
            <Col span={12}>
              <TextInput
                errors={errors}
                name="testCode"
                disabled={getIsPending}
                value={values.testCode}
                label={
                  <span className={classes.label}>{t('ATTRIBUTE_NAME')}</span>
                }
                onChange={event => {
                  handleFormValueChange('testCode', event.target.value);
                }}
                autoComplete="off"
              />
            </Col>
            <Col span={12}>
              <Select
                errors={errors}
                name="testDomain"
                selectKey="testDomain"
                label={<span className={classes.label}>{t('TEST_DOMAIN')}</span>}
                value={values.testDomain}
                style={{ paddingTop: '12px !important' }}
                disabled={getIsPending || testTypeListPending}
                onChange={value => {
                  if (value === NEW_ITEM) {
                    setOpenAddItemModal(true);
                  }
                  handleFormValueChange('testDomain', value);
                }}
              >
                {list1SelectOptions}
                <Option value={NEW_ITEM} className={classes.addNewTestDomain}>{t('PLUS_NEW_TEST_DOMAIN')}</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[theme.spacing(3)]} className={classes.row}>
            <Col span={12}>
              <TextInput
                errors={errors}
                name="description"
                disabled={getIsPending}
                value={values.description}
                label={
                  <span className={classes.label}>{t('DESCRIPTION')}</span>
                }
                onChange={event => {
                  handleFormValueChange('description', event.target.value);
                }}
                autoComplete="off"
              />
            </Col>
          </Row>
          <Row gutter={[theme.spacing(3)]} className={classes.row}>
            <Col span={24}>
              <FormItem
                help={get(errors, 'experimentMotivation')}
                validateStatus={
                  get(errors, 'experimentMotivation') ? 'error' : 'success'
                }
                name="experimentMotivation"
              >
                <TextEditor
                  value={values.experimentMotivation}
                  disabled={getIsPending}
                  className={classes.experimentMotivation}
                  style={{ height: 120, marginBottom: 24 }}
                  onChange={htmlValue => handleFormValueChange('experimentMotivation', htmlValue)}
                  label={(
                    <span className={classes.label}>
                      {t('EXPERIMENT_MOTIVATION')}
                    </span>
                  )}
                />
              </FormItem>
            </Col>
          </Row>
          <TemplateSearch
            values={values}
            isPending={getIsPending}
            handleFieldChange={handleFieldChange}
            handleFormValueChange={handleFormValueChange}
            errors={errors}
          />
          <Row justify="end">
            <FormItem className="m-0">
              <Button form={formId} htmlType="submit" loading={getIsPending}>
                {t('button:SAVE')}
              </Button>
            </FormItem>
          </Row>
        </Form>
      </Card>
    </>
  );
};

export default NewForm;
