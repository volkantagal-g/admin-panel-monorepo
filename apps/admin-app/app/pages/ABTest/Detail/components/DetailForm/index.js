import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col, DatePicker, Typography, Space } from 'antd';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'react-jss';
import { get, isEqual } from 'lodash';
import moment from 'moment';

import AntCard from '@shared/components/UI/AntCard';
import { validate } from '@shared/yup';
import { getLocalDateFormat, getLocalDateTimeFormat } from '@shared/utils/localization';
import { SelectWrapper } from '@shared/components/UI/Form';
import { TEST_TYPES } from '@app/pages/ABTest/constants';
import { checkUserEditPermission, disabledDate, getInitialValues, testTypeConstraints } from '@app/pages/ABTest/utils';
import UserSelect from '@shared/containers/Select/User';
import { getUser } from '@shared/redux/selectors/auth';

import { Creators } from '../../redux/actions';
import { getTestSelector } from '../../redux/selectors';
import { destructTestData, validationSchema } from './formHelper';
import useStyles from './styles';
import TemplateSearch from '../TemplateSearch';
import CSVUpload from '../CSVUpload';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const DetailForm = ({ testId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('abTestingPage');
  const [form] = Form.useForm();
  const theme = useTheme();
  const classes = useStyles();
  const testData = useSelector(getTestSelector.getData);
  const isTestPending = useSelector(getTestSelector.getIsPending);
  const user = getUser();
  const [canUserEdit, setCanUserEdit] = useState(false);
  const [isFormEditable, setIsFormEditable] = useState(false);

  const initialProps = destructTestData(testData);

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: getInitialValues(testData),
    validate: validate(validationSchema),
    onSubmit: data => {
      setIsFormEditable(false);
      const submitData = destructTestData(data);

      if (isEqual(submitData, initialProps)) {
        return;
      }

      // for preventing on any kind of submit event
      if (canUserEdit) {
        dispatch(Creators.updateABTestRequest({
          requestData: {
            testId,
            ...submitData,
          },
        }));
      }
    },
  });

  const { handleSubmit, values, errors, touched, setFieldValue, setValues } = formik;

  useEffect(() => {
    const mergedValues = getInitialValues(testData);
    setValues(mergedValues);
    form.setFieldsValue(mergedValues);
  }, [form, testData, setValues]);

  useEffect(() => {
    const mappedOwners = (testData.owners || []).map(owner => owner._id);
    const userEditPermission = checkUserEditPermission({ owners: mappedOwners, createdBy: testData.createdBy?._id, userId: user._id });
    setCanUserEdit(userEditPermission);
  }, [testData.owners, testData.createdBy, user, testData]);

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

  const cardFooter = (
    <Row justify="end" gutter={[theme.spacing(2)]}>
      {
        isFormEditable ? (
          <>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button
                  className={classes.cancelButton}
                  htmlType="reset"
                  onClick={handleFormResetButton}
                >
                  {t('CANCEL')}
                </Button>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item className="mb-0 mt-0">
                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                  {t('SAVE')}
                </Button>
              </Form.Item>
            </Col>
          </>
        ) : (
          <Col>
            <Form.Item className="mb-0 mt-0">
              <Button
                form="user-new"
                type="primary"
                htmlType="button"
                onClick={handleEditButton}
                loading={isTestPending}
                disabled={!canUserEdit}
              >
                {t('button:EDIT')}
              </Button>
            </Form.Item>
          </Col>
        )
      }
    </Row>
  );

  const handleDateFieldsChange = ([testStartDate, testEndDate]) => {
    setFieldValue('testStartDate', testStartDate);
    setFieldValue('testEndDate', testEndDate);
  };

  const getTestTypeInput = () => {
    if (testData.testType === TEST_TYPES.CSV_UPLOAD) {
      return (
        <CSVUpload
          values={values}
          errors={{}}
          touched={{}}
          isPending={isTestPending}
        />
      );
    }
    return (
      <TemplateSearch
        values={values}
        errors={{}}
        touched={{}}
        isPending={isTestPending}
      />
    );
  };

  return (
    <AntCard footer={cardFooter} bordered={false} title={t('TITLE')}>
      <Form form={form} id="abtest-new" onFinish={handleSubmit} layout="vertical">
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <Form.Item
              help={(get(touched, 'testName') && get(errors, 'testName'))}
              validateStatus={(get(touched, 'testName') && get(errors, 'testName')) ? 'error' : 'success'}
              name={['testName']}
              label={t('TEST_NAME')}
            >
              <Input
                defaultValue={values.testName}
                value={values.testName}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('testName', value);
                }}
                disabled={!isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              help={(get(touched, 'testDescription') && get(errors, 'testDescription'))}
              validateStatus={(get(touched, 'testDescription') && get(errors, 'testDescription')) ? 'error' : 'success'}
              name={['testDescription']}
              label={t('global:DESCRIPTION')}
            >
              <Input
                defaultValue={values.testDescription}
                value={values.testDescription}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('testDescription', value);
                }}
                disabled={!isFormEditable}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <Space direction="vertical" className={[classes.marginBottom, classes.fullWidth]}>
              {
                isTestPending ? null : (
                  <>
                    <Text>{t('global:DATE_RANGE')}</Text>
                    <RangePicker
                      className={classes.fullWidth}
                      defaultValue={[moment(testData.testStartDate), moment(testData.testEndDate)]}
                      onChange={handleDateFieldsChange}
                      format={getLocalDateFormat()}
                      allowClear
                      disabled={!isFormEditable}
                      disabledDate={disabledDate(testData.testStartDate, testData.testEndDate)}
                    />
                  </>
                )
              }
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" className={[classes.marginBottom, classes.fullWidth]}>
              {
                isTestPending ? null : (
                  <>
                    <Text>{t('global:STATUS')}</Text>
                    <Input
                      defaultValue={t(`abTestingPage:TEST_STATUSES.${values.testStatus}`)}
                      value={t(`abTestingPage:TEST_STATUSES.${values.testStatus}`)}
                      disabled
                    />
                  </>
                )
              }
            </Space>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <Form.Item
              name={['createdBy', 'name']}
              label={t('CREATED_BY')}
            >
              <Input
                defaultValue={values.createdBy?.name || values.createdBy?.email}
                value={values.createdBy?.name || values.createdBy?.email}
                disabled
                autoComplete="off"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Space direction="vertical" className={[classes.marginBottom, classes.fullWidth]}>
              <Text>{t('global:CREATED_AT')}</Text>
              {
                isTestPending ? null : (
                  <DatePicker
                    className={classes.fullWidth}
                    defaultValue={moment(testData.createdAt)}
                    format={getLocalDateTimeFormat()}
                    disabled
                  />
                )
              }
            </Space>
          </Col>
        </Row>
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={12}>
            <SelectWrapper
              selectKey="testType"
              label={t('TEST_TYPE')}
              value={values.testType}
              defaultValue={values.testType}
              optionLabelProp="label"
              optionValueProp="value"
              optionsData={testTypeConstraints(t)}
              disabled
            />
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
                  disabled
                  autoComplete="off"
                />
              </Form.Item>
            </Space>
          </Col>
        </Row>
        {getTestTypeInput()}
        <Row gutter={[theme.spacing(3)]} align="bottom">
          <Col span={24}>
            <Form.Item
              help={get(errors, 'owners')}
              validateStatus={get(errors, 'owners') ? 'error' : 'success'}
              name="owners"
              label={t('OWNERS')}
            >
              <UserSelect
                mode="multiple"
                onChange={_owners => {
                  setFieldValue('owners', _owners);
                }}
                disabled={!isFormEditable}
                labelInValue
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </AntCard>
  );
};

export default DetailForm;
