import { Row, Col, Form, Typography, Divider } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useFormik } from 'formik';
import { get } from 'lodash';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Alert, Button, Checkbox, Space, TextArea } from '@shared/components/GUI';
import UploadPicture from '@app/pages/Mentorship/components/UploadPicture';
import SelectLanguage from '@app/pages/Mentorship/components/Select/Language';
import SelectTopic from '@app/pages/Mentorship/components/Select/Topic';
import { validationSchema } from './formHelper';

const { Item } = Form;

const FormUtil = ({ initialValues, isPending, onSubmit, employee, userNotExists }) => {
  const [form] = useForm();
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const employeeId = employee?._id;

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema(t),
    enableReinitialize: true,
    onSubmit: values => {
      onSubmit(values);
    },
  });

  const { handleSubmit, values, setFieldValue, setFieldTouched, errors } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  // in order to link antd form and formik form
  const getHandleChange = (fieldName, inputType = 'text') => {
    return param => {
      if (inputType === 'select' || fieldName === 'picURL') {
        setFieldValue(fieldName, param);
      }
      else if (inputType === 'checkbox') {
        setFieldValue(fieldName, param.target.checked);
      }
      else {
        setFieldValue(fieldName, param.target.value);
      }
    };
  };

  // in order to link antd form and formik form
  const getHandleBlur = fieldName => {
    return () => setFieldTouched(fieldName);
  };

  return (
    <Space title={t('USER_INFORMATION')}>
      <Form
        initialValues={initialValues}
        form={form}
        id="mentorshipProfileForm"
        onFinish={handleSubmit}
        layout="vertical"
      >
        {!employeeId && !isPending && (
        <div className="pb-4">
          <Alert message={t('MENTORSHIP_NON_EMPLOYEE_WARN_MESSAGE')} type="error" />
        </div>
        )}

        {employeeId && userNotExists && !isPending && (
        <div className="pb-4">
          <Alert message={t('MENTORSHIP_NON_USER_WARN_MESSAGE')} type="warning" />
        </div>
        )}

        <Row gutter={[8, 8]}>
          <Col lg={{ span: 12 }} xs={{ span: 24 }}>
            <div className="d-flex w-100 h-100 align-items-center">
              <Item name={['picURL']} className="m-0">
                <UploadPicture
                  disabled={isPending}
                  className="flex-grow-1"
                  value={get(values, 'picURL')}
                  onChange={getHandleChange('picURL')}
                />
              </Item>
              <div>
                <Typography.Title level={5} className="m-0">{employee?.fullName}</Typography.Title>
                <Typography.Text>{employee?.workEmail}</Typography.Text>
              </div>
            </div>
          </Col>
          <Col lg={{ span: 12 }} xs={{ span: 24 }}>
            <TextArea
              disabled={isPending}
              name="bio"
              label={t('BIO')}
              value={get(values, 'bio')}
              onChange={getHandleChange('bio')}
              onBlur={getHandleBlur('bio')}
              errors={errors}
            />
          </Col>
        </Row>
        <Divider orientation="left" />
        <Row gutter={[8, 8]} className="d-flex">
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <SelectTopic
              disabled={isPending}
              name="topicsInterested"
              mode="multiple"
              label={t('TOPICS_INTERESTED')}
              value={get(values, 'topicsInterested')}
              onChange={getHandleChange('topicsInterested', 'select')}
              onBlur={getHandleBlur('topicsInterested')}
              errors={errors}
            />
          </Col>
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <SelectLanguage
              disabled={isPending}
              name="languages"
              label={t('LANGUAGES_SPOKEN')}
              value={get(values, 'languages')}
              onChange={getHandleChange('languages', 'select')}
              onBlur={getHandleBlur('languages')}
              errors={errors}
            />
          </Col>
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <SelectTopic
              disabled={isPending || !values?.isMentor}
              name="topicsToTeach"
              mode="multiple"
              label={t('TOPICS_CAN_TEACH')}
              value={get(values, 'topicsToTeach')}
              onChange={getHandleChange('topicsToTeach', 'select')}
              onBlur={getHandleBlur('topicsToTeach')}
              errors={errors}
            />
          </Col>
          <Col lg={{ span: 6 }} xs={{ span: 24 }}>
            <Checkbox
              name="isMentor"
              disabled={isPending}
              checked={get(values, 'isMentor', false)}
              onChange={getHandleChange('isMentor', 'checkbox')}
              onBlur={getHandleBlur('isMentor')}
              errors={errors}
            >{t('IS_MENTOR')}
            </Checkbox>
          </Col>
        </Row>
        <Row gutter={[8, 8]} justify="end">
          <Button
            className="mt-4"
            data-testid="save-profile"
            type="primary"
            htmlType="submit"
            loading={isPending}
            disabled={!employeeId}
          >{t('SAVE')}
          </Button>
        </Row>
      </Form>
    </Space>
  );
};

export default FormUtil;
