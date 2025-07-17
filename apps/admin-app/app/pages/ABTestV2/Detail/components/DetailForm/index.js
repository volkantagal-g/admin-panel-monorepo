import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spin, Form, DatePicker } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { get, isEqual } from 'lodash';
import moment from 'moment';

import {
  Card,
  TextInput,
  FormItem,
  EditSaveCancelButtons,
  Button,
  TextEditor,
  Select,
  Tag,
} from '@shared/components/GUI';
import { validate } from '@shared/yup';
import {
  getLocalDateFormat,
  getLocalDateTimeFormat,
} from '@shared/utils/localization';
import {
  disabledDate,
  getInitialValues,
  validateExcludeDate,
} from '@app/pages/ABTestV2/utils';
import UserSelect from '@shared/containers/Select/User';
import { Creators } from '../../redux/actions';
import {
  completeTestSelector,
  getStatusSelector,
  getTestSelector,
  startTestSelector,
  stopTestSelector,
  updateABTestSelector,
} from '../../redux/selectors';
import { destructTestData, validationSchema } from './formHelper';
import { TEST_STATUSES } from '@app/pages/ABTestV2/constants';
import { usePermission } from '@shared/hooks';
import { getUser } from '@shared/redux/selectors/auth';

import TemplateSearch from '../TemplateSearch';
import CompleteModal from '../CompleteModal';
import ExcludeDateContent from '../ExcludeDateContent';

import useStyles from './styles';
import permKey from '@shared/shared/permKey.json';

const { RangePicker } = DatePicker;

const DetailForm = ({ testId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('abTestingV2Page');
  const { canAccess } = usePermission();
  const [form] = Form.useForm();
  const formId = 'abtest-detail';

  const theme = useTheme();
  const classes = useStyles();
  const testData = useSelector(getTestSelector.getData);
  const testStatus = useSelector(getStatusSelector.getStatus);

  const error = useSelector(getTestSelector.getError);
  const updateError = useSelector(updateABTestSelector.getError);

  const isStartPending = useSelector(startTestSelector.getIsPending);
  const isStopPending = useSelector(stopTestSelector.getIsPending);
  const isCompletePending = useSelector(completeTestSelector.getIsPending);
  const isTestPending = useSelector(getTestSelector.getIsPending);
  const isTestPendingUpdate = useSelector(updateABTestSelector.getIsPending);

  const [isFormEditable, setIsFormEditable] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const [completeForm, setCompleteForm] = useState({
    observations: '',
    conclusion: '',
    insights: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const initialProps = destructTestData(testData, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (testStatus === TEST_STATUSES.CREATING) {
        dispatch(Creators.getTestStatusRequest({ testId }));
      }
      else {
        clearInterval(interval);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch, testId, testStatus]);

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: getInitialValues(testData),
    validate: validate(validationSchema),
    onSubmit: data => {
      setIsFormEditable(false);
      const submitData = destructTestData(data);

      if (isEqual(submitData, initialProps)) {
        setErrorMessage(t('EXCLUDE_DATE_ERROR'));
        return;
      }
      if (canAccess(permKey.PAGE_AB_TEST_V2_NEW)) {
        dispatch(
          Creators.updateABTestRequest({
            requestData: {
              testId,
              domainType: 1,
              ...submitData,
            },
          }),
        );
      }
    },
  });

  const { handleSubmit, values, errors, setFieldValue, setValues } = formik;

  useEffect(() => {
    const mergedValues = getInitialValues(testData);
    setValues(mergedValues);
    form.setFieldsValue(mergedValues);
  }, [form, setValues, testData, error, updateError]);

  useEffect(() => {
    setErrorMessage(null);
    const { excludeDate, testEndDate } = values;
    setErrorMessage(
      validateExcludeDate(testEndDate, testData.testStartDate, excludeDate, t),
    );
  }, [t, testData.testStartDate, values]);

  const handleFormResetButton = () => {
    setIsFormEditable(false);

    const formValues = destructTestData(values);
    if (isEqual(formValues, initialProps)) {
      return false;
    }
    const mergedValues = getInitialValues(testData);
    setValues(mergedValues);
    form.setFieldsValue(mergedValues);
    return true;
  };

  const handleEditButton = () => {
    setIsFormEditable(!isFormEditable);
  };

  const handleFormValueChange = (field, value) => {
    form.setFieldsValue({ ...form.getFieldsValue(), [field]: value });
    setFieldValue(field, value, true);
  };

  const handleDateFieldsChange = ([testStartDate, testEndDate]) => {
    handleFormValueChange('testStartDate', testStartDate);
    handleFormValueChange('testEndDate', testEndDate);
  };

  const cardHeader = (
    <Row gutter={[theme.spacing(2)]} className={classes.cardHeader}>
      <Col>
        <FormItem className="mb-0 mt-0">
          <Button
            className={classes.button}
            form="user-new"
            size="small"
            htmlType="button"
            color="active"
            onClick={() => dispatch(Creators.startABTestRequest({ testId }))}
            loading={
              isTestPending ||
              isTestPendingUpdate ||
              isStopPending ||
              isStartPending ||
              isCompletePending
            }
            disabled={
              testStatus !== TEST_STATUSES.READY ||
              !canAccess(permKey.PAGE_AB_TEST_V2_NEW) ||
              testData?.owners?.every(own => own.id !== getUser()?._id)
            }
          >
            {t('button:START')}
          </Button>
        </FormItem>
      </Col>
      <Col>
        <Form.Item className="mb-0 mt-0">
          <Button
            className={classes.button}
            form="user-new"
            size="small"
            htmlType="button"
            color="danger"
            onClick={() => dispatch(Creators.stopABTestRequest({ testId }))}
            loading={
              isTestPending ||
              isTestPendingUpdate ||
              isStopPending ||
              isStartPending ||
              isCompletePending
            }
            disabled={
              testStatus !== TEST_STATUSES.IN_PROG ||
              !canAccess(permKey.PAGE_AB_TEST_V2_NEW) ||
              testData?.owners?.every(own => own.id !== getUser()?._id)
            }
          >
            {t('button:STOP')}
          </Button>
        </Form.Item>
      </Col>
      <Col>
        <Form.Item className="mb-0 mt-0">
          <Button
            className={classes.button}
            form="user-new"
            size="small"
            htmlType="button"
            color="secondary"
            onClick={() => setShowCompleteModal(true)}
            loading={
              isTestPending ||
              isTestPendingUpdate ||
              isStopPending ||
              isStartPending ||
              isCompletePending
            }
            disabled={
              (testStatus !== TEST_STATUSES.IN_PROG &&
                testStatus !== TEST_STATUSES.OUTDATED) ||
              !canAccess(permKey.PAGE_AB_TEST_V2_NEW) ||
              testData?.owners?.every(own => own.id !== getUser()?._id)
            }
          >
            {t('button:COMPLETE')}
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );

  const getTestTypeInput = () => {
    return (
      <TemplateSearch
        values={values}
        isPending={isTestPending || isTestPendingUpdate}
        disabled={
          !isFormEditable ||
          testStatus === TEST_STATUSES.COMPLETED ||
          testStatus === TEST_STATUSES.OUTDATED
        }
        handleFormValueChange={handleFormValueChange}
        errors={errors}
        testData={testData}
      />
    );
  };

  const getExcludeDateList = () => {
    return (
      <ExcludeDateContent
        theme={theme}
        classes={classes}
        values={values}
        disabled={!isFormEditable || testStatus === TEST_STATUSES.COMPLETED || testStatus === TEST_STATUSES.OUTDATED}
        setFieldValue={setFieldValue}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        testData={testData}
      />
    );
  };

  const tagRender = () => {
    return (
      <Tag color="inactive" style={{ marginRight: 3 }}>
        {t(`TEST_STATUSES.${testStatus}`)}
      </Tag>
    );
  };

  return (
    <>
      <CompleteModal
        showCompleteModal={showCompleteModal}
        setShowCompleteModal={setShowCompleteModal}
        completeForm={completeForm}
        setCompleteForm={setCompleteForm}
        classes={classes}
        testId={testId}
        setIsFormEditable={setIsFormEditable}
      />
      <Card bordered={false} title={cardHeader}>
        <Form form={form} id={formId} onFinish={handleSubmit} layout="vertical">
          {isTestPending ||
          isTestPendingUpdate ||
          isStartPending ||
          isStopPending ||
          isCompletePending ? (
            <div className={classes.spin}>
              <Spin />
            </div>
            ) : (
              <>
                <Row
                  gutter={[theme.spacing(3)]}
                  align="bottom"
                  className={classes.row}
                >
                  <Col span={12}>
                    <FormItem label={t('TEST_NAME')}>
                      <TextInput
                        defaultValue={values.testName}
                        value={values.testName}
                        onChange={event => {
                          handleFormValueChange('testName', event.target.value);
                        }}
                        disabled={
                          !isFormEditable ||
                        testStatus === TEST_STATUSES.COMPLETED ||
                        testStatus === TEST_STATUSES.OUTDATED
                        }
                        autoComplete="off"
                        name="testName"
                        errors={errors}
                      />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label={t('EXPERIMENT_ID')}>
                      <TextInput
                        errors={errors}
                        value={values._id}
                        disabled
                        autoComplete="off"
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row
                  gutter={[theme.spacing(3)]}
                  align="bottom"
                  className={classes.row}
                >
                  <Col span={12}>
                    {isTestPending || isTestPendingUpdate ? null : (
                      <FormItem label={t('global:DATE_RANGE')}>
                        <RangePicker
                          errors={errors}
                          className={classes.rangepicker}
                          value={[
                            moment(values.testStartDate),
                            moment(values.testEndDate),
                          ]}
                          onChange={handleDateFieldsChange}
                          onCalendarChange={handleDateFieldsChange}
                          format={getLocalDateFormat()}
                          allowClear={false}
                          disabled={[
                            true,
                            !isFormEditable ||
                            testStatus === TEST_STATUSES.COMPLETED ||
                            testStatus === TEST_STATUSES.OUTDATED,
                          ]}
                          disabledDate={disabledDate(
                            values.testStartDate,
                            values.testEndDate,
                          )}
                        />
                      </FormItem>
                    )}
                  </Col>
                  <Col span={12}>
                    {isTestPending || isTestPendingUpdate ? null : (
                      <FormItem label={t('global:STATUS')}>
                        <Select
                          errors={errors}
                          defaultValue={t(`TEST_STATUSES.${testStatus}`)}
                          mode="multiple"
                          tagRender={tagRender}
                          disabled
                        />
                      </FormItem>
                    )}
                  </Col>
                </Row>
                <Row
                  gutter={[theme.spacing(3)]}
                  align="bottom"
                  className={classes.row}
                >
                  <Col span={12}>
                    <FormItem label={t('ATTRIBUTE_NAME')}>
                      <TextInput
                        defaultValue={values.testCode}
                        value={values.testCode}
                        disabled
                        name="testCode"
                      />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label={t('TEST_DOMAIN')}>
                      <TextInput
                        errors={errors}
                        name="testDomain"
                        value={values.testDomain}
                        style={{ paddingTop: '12px !important' }}
                        disabled
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row
                  gutter={[theme.spacing(3)]}
                  align="bottom"
                  className={classes.row}
                >
                  <Col span={12}>
                    <FormItem label={t('global:DESCRIPTION')}>
                      <TextInput
                        defaultValue={values.description}
                        value={values.description}
                        onChange={event => {
                          handleFormValueChange(
                            'description',
                            event.target.value,
                          );
                        }}
                        errors={errors}
                        name="description"
                        disabled={
                          !isFormEditable ||
                        testStatus === TEST_STATUSES.COMPLETED ||
                        testStatus === TEST_STATUSES.OUTDATED
                        }
                        autoComplete="off"
                      />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label={t('CREATED_BY')}>
                      <TextInput
                        defaultValue={
                          values.createdBy?.name || values.createdBy?.email
                        }
                        value={values.createdBy?.name || values.createdBy?.email}
                        disabled
                        errors={errors}
                        autoComplete="off"
                      />
                    </FormItem>
                  </Col>

                </Row>
                <Row
                  gutter={[theme.spacing(3)]}
                  align="bottom"
                  className={classes.row}
                >
                  <Col span={12}>
                    <FormItem label={t('global:CREATED_AT')}>
                      {isTestPending || isTestPendingUpdate ? null : (
                        <DatePicker
                          className={classes.rangepicker}
                          defaultValue={moment(testData.createdAt)}
                          format={getLocalDateTimeFormat()}
                          errors={errors}
                          disabled
                        />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label={t('LAST_UPDATED_AT')}>
                      {isTestPending || isTestPendingUpdate ? null : (
                        <DatePicker
                          className={classes.rangepicker}
                          defaultValue={moment(testData.updatedAt)}
                          format={getLocalDateTimeFormat()}
                          errors={errors}
                          disabled
                        />
                      )}
                    </FormItem>
                  </Col>
                </Row>
                <Row gutter={[theme.spacing(3)]} className={classes.row}>
                  <Col span={24}>
                    <FormItem
                      label={t('EXPERIMENT_MOTIVATION')}
                      help={get(errors, 'experimentMotivation')}
                      validateStatus={
                        get(errors, 'experimentMotivation') ? 'error' : 'success'
                      }
                      className={
                        isFormEditable
                          ? classes.experimentMotivation
                          : classes.disabledTextEditor
                      }
                    >
                      <TextEditor
                        originalValue={testData.experimentMotivation}
                        value={values.experimentMotivation}
                        disabled={
                          !isFormEditable ||
                        testStatus === TEST_STATUSES.COMPLETED ||
                        testStatus === TEST_STATUSES.OUTDATED
                        }
                        className={classes.experimentMotivation}
                        style={{ height: 120, marginBottom: 24 }}
                        onChange={htmlValue => handleFormValueChange('experimentMotivation', htmlValue)}
                        placeholder={t('EXPERIMENT_MOTIVATION')}
                      />
                    </FormItem>
                  </Col>
                </Row>
                {getExcludeDateList()}
                {getTestTypeInput()}
                <Row
                  gutter={[theme.spacing(3)]}
                  align="bottom"
                  className={classes.row}
                >
                  <Col span={24}>
                    <FormItem
                      label={t('OWNERS')}
                      help={get(errors, 'owners')}
                      validateStatus={get(errors, 'owners') ? 'error' : 'success'}
                    >
                      <UserSelect
                        mode="multiple"
                        value={values.owners}
                        onChange={_owner => {
                          handleFormValueChange('owners', _owner);
                        }}
                        disabled={
                          !isFormEditable ||
                        testStatus === TEST_STATUSES.COMPLETED ||
                        testStatus === TEST_STATUSES.OUTDATED
                        }
                        labelInValue
                        className={classes.userSelect}
                      />
                    </FormItem>
                  </Col>
                </Row>
                {testStatus === TEST_STATUSES.COMPLETED && (
                <Row gutter={[theme.spacing(3)]} className={classes.row}>
                  <Col span={8}>
                    <FormItem
                      label={t('OBSERVATIONS')}
                      className={classes.disabledTextEditor}
                    >
                      <TextEditor
                        value={testData.observations}
                        originalValue={values.observations}
                        style={{ height: 120, marginBottom: 24 }}
                        disabled={!isFormEditable}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label={t('CONCLUSION')}
                      className={classes.disabledTextEditor}
                    >
                      <TextEditor
                        value={testData.conclusion}
                        originalValue={values.conclusion}
                        style={{ height: 120, marginBottom: 24 }}
                        disabled={!isFormEditable}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label={t('INSIGHTS')}
                      className={classes.disabledTextEditor}
                    >
                      <TextEditor
                        originalValue={testData.insights}
                        value={values.insights}
                        style={{ height: 120, marginBottom: 24 }}
                        disabled={!isFormEditable}
                      />
                    </FormItem>
                  </Col>
                </Row>
                )}
                <Row
                  gutter={[theme.spacing(3)]}
                  align="bottom"
                  className={[classes.row, classes.editSaveCancelButtonsRow]}
                >
                  {canAccess(permKey.PAGE_AB_TEST_V2_NEW) &&
                  testData?.owners?.some(own => own.id === getUser()?._id) && (
                    <EditSaveCancelButtons
                      disabled={errorMessage}
                      form={formId}
                      size="small"
                      htmlType="submit"
                      isFormEditable={isFormEditable}
                      loading={
                        isTestPending ||
                        isTestPendingUpdate ||
                        isStartPending ||
                        isStopPending ||
                        isCompletePending
                      }
                      onCancelClick={handleFormResetButton}
                      onEditClick={handleEditButton}
                      onSaveClick={handleSubmit}
                    />
                  )}
                </Row>
              </>
            )}
        </Form>
      </Card>
    </>
  );
};

export default DetailForm;
