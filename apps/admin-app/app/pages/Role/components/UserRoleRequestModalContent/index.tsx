import { memo, useEffect } from 'react';
import { Alert, Col, Form, Input, InputNumber, Row, Space, Typography, Radio, DatePicker } from 'antd';
import { get } from 'lodash';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import moment from 'moment';

import {
  defaultValues,
  validationSchema,
} from './formHelper';
import { validate } from '@shared/yup';
import {
  ROLE_REQUEST_DURATION_TYPE,
  ROLE_REQUEST_TIME_LIMIT,
} from '@app/pages/Role/components/UserRoleRequestModalContent/constants';

const { Text } = Typography;

type UserRoleRequestModalContentProps = {
  onRequestUserRoleRequest: (args: { roleId: MongoIDType } & Partial<Omit<RoleRequestType, '_id'>>) => void,
  role: Pick<RoleRequestType, '_id'>
}

const UserRoleRequestModalContent = ({
  onRequestUserRoleRequest,
  role,
}: UserRoleRequestModalContentProps) => {
  const [form] = Form.useForm();
  const { t } = useTranslation('rolePage');
  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: defaultValues,
    validate: validate(validationSchema),
    onSubmit: values => {
      onRequestUserRoleRequest({
        roleId: role._id,
        requestReason: values.requestReason,
        timeLimit: values.timeLimit,
        durationType: values.durationType,
        durationDays: values.durationDays,
        endDate: values.endDate,
      });
    },
  });

  const { handleSubmit, values, errors, setFieldValue } = formik;

  useEffect(() => {
    form.setFieldsValue(values);
  }, [values, form]);

  return (
    <Form
      form={form}
      id="user-role-request"
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Space direction="vertical" className="w-100">
        <Row>
          <Col flex="auto">
            <Text>{t('ROLE_REQUEST.DURATION_TITLE')}</Text>
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <Radio.Group
              options={[
                { label: t('ROLE_REQUEST.PERMANENTLY'), value: ROLE_REQUEST_TIME_LIMIT.PERMANENT },
                { label: t('ROLE_REQUEST.TEMPORARILY'), value: ROLE_REQUEST_TIME_LIMIT.TEMPORARY },
              ]}
              optionType="button"
              defaultValue={ROLE_REQUEST_TIME_LIMIT.PERMANENT}
              onChange={event => {
                const value = get(event, 'target.value', '');
                setFieldValue('timeLimit', value);
              }}
            />
          </Col>
        </Row>
        {values.timeLimit === ROLE_REQUEST_TIME_LIMIT.TEMPORARY && (
          <>
            <Row>
              <Col flex="auto">
                <Radio.Group
                  options={[
                    { label: t('ROLE_REQUEST.DURATION'), value: ROLE_REQUEST_DURATION_TYPE.DURATION },
                    { label: t('ROLE_REQUEST.UNTIL_A_DATE'), value: ROLE_REQUEST_DURATION_TYPE.END_DATE },
                  ]}
                  optionType="button"
                  defaultValue={ROLE_REQUEST_DURATION_TYPE.DURATION}
                  onChange={event => {
                    const value = get(event, 'target.value', '');
                    setFieldValue('durationType', value);
                  }}
                />
              </Col>
            </Row>
            {values.durationType === ROLE_REQUEST_DURATION_TYPE.DURATION && (
              <Row>
                <Col style={{ display: 'flex', alignItems: 'baseline' }}>
                  <Text>{t('ROLE_REQUEST.ROLE_DAYS_PREFIX')}</Text>&nbsp;
                  <Form.Item
                    help={get(errors, 'durationDays')}
                    validateStatus={get(errors, 'durationDays') ? 'error' : 'success'}
                    name={['durationDays']}
                    style={{ marginBottom: 0 }}
                  >
                    <InputNumber
                      min={1}
                      onChange={value => {
                        setFieldValue('durationDays', value);
                      }}
                    />&nbsp;
                  </Form.Item>
                  <Text>{t('ROLE_REQUEST.ROLE_DAYS_SUFFIX')}</Text>
                </Col>
              </Row>
            )}
            {values.durationType === ROLE_REQUEST_DURATION_TYPE.END_DATE && (
              <Row>
                <Col style={{ display: 'flex', alignItems: 'baseline' }}>
                  <Text>{t('ROLE_REQUEST.DESIRED_END_DATE')}</Text>&nbsp;
                  <Form.Item
                    help={get(errors, 'endDate')}
                    validateStatus={get(errors, 'endDate') ? 'error' : 'success'}
                    name={['endDate']}
                    style={{ marginBottom: 0 }}
                  >
                    <DatePicker
                      onChange={date => {
                        setFieldValue('endDate', date);
                      }}
                      disabledDate={current => {
                        return current && current < moment().startOf('day');
                      }}
                    />&nbsp;
                  </Form.Item>
                  <Text>23:59 UTC</Text>
                </Col>
              </Row>
            )}
          </>
        )}
        <Row>
          <Col flex="auto">
            <Text>{t('ROLE_REQUEST.REASON')}</Text>
            <Form.Item
              help={get(errors, 'requestReason')}
              validateStatus={get(errors, 'requestReason') ? 'error' : 'success'}
              name={['requestReason']}
            >
              <Input.TextArea
                value={values.requestReason}
                onChange={event => {
                  const value = get(event, 'target.value', '');
                  setFieldValue('requestReason', value);
                }}
                placeholder={t('ROLE_REQUEST.REASON_PLACEHOLDER')}
                rows={4}
                autoComplete="off"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <Alert
              description={t('ROLE_REQUEST.SECURITY_NOTICE')}
              type="warning"
              showIcon
            />
          </Col>
        </Row>
        <Row>
          <Col flex="auto">
            <Alert
              description={t('ROLE_REQUEST.EXPIRY_NOTICE')}
              type="warning"
              showIcon
            />
          </Col>
        </Row>
      </Space>
    </Form>
  );
};

export default memo(UserRoleRequestModalContent);
