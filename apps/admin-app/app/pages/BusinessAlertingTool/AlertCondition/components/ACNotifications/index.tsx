import { useTranslation } from 'react-i18next';
import { Col, Form, Row, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import { NOTIFICATION_RECEIVER_LIMIT } from '../../../constants';
import NotificationHeader from './components/NotificationHeader';
import { getSlackWorkspacesOptions } from './constantValues';

function ACNotifications({ formik, antdForm, isFormEditable = true }: { formik: any, antdForm: any, isFormEditable: boolean | undefined }) {
  const { t } = useTranslation(['batAlertConditionCommon', 'batAlertConditionCommon']);
  const slackWorkspaces = getSlackWorkspacesOptions();

  const { setFieldValue, values } = formik;

  const customSetFieldValue = (fieldPath: string | string[], value: any) => {
    const notificationChannel = fieldPath[1];

    if (notificationChannel === 'email') {
      antdForm.validateFields([['notificationPreferences', notificationChannel, 'recipients']]);
    }
    else if (notificationChannel === 'slack') {
      antdForm.validateFields([['notificationPreferences', notificationChannel, 'workspace']]);
      antdForm.validateFields([['notificationPreferences', notificationChannel, 'channels']]);
    }

    setFieldValue(fieldPath, value);
  };

  return (
    <>
      <Row>
        <Col xs={24}>
          <NotificationHeader
            title={t('batAlertConditionCommon:EMAIL_NOFITICATIONS')}
            antdForm={antdForm}
            notificationChannel="email"
            setFieldValue={customSetFieldValue}
            isFormEditable={isFormEditable}
          />
          <Row>
            <Col xs={24}>
              <Form.Item
                name={['notificationPreferences', 'email', 'recipients']}
                rules={[
                  { required: values?.notificationPreferences?.email?.isActive, message: t('error:REQUIRED') },
                  () => ({
                    validator(_, value) {
                      if (!(values?.notificationPreferences?.email?.isActive)) {
                        return Promise.resolve();
                      }
                      if (!isValidEmails(value)) {
                        return Promise.reject(new Error(t('batAlertConditionCommon:EMAIL_ERROR_MESSAGE')));
                      }
                      if (value?.length > NOTIFICATION_RECEIVER_LIMIT) {
                        return Promise.reject(new Error(t('batAlertConditionCommon:MAX_RECIPIENTS_ERROR_MESSAGE')));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Select
                  mode="tags"
                  placeholder="email@getir.com"
                  dropdownStyle={{ display: 'none' }}
                  maxTagCount={NOTIFICATION_RECEIVER_LIMIT}
                  disabled={!values?.notificationPreferences?.email?.isActive || !isFormEditable}
                  onChange={handleEmailOnChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={24}>
          <NotificationHeader
            title={t('batAlertConditionCommon:SLACK_NOTIFICATIONS')}
            antdForm={antdForm}
            notificationChannel="slack"
            setFieldValue={customSetFieldValue}
            isFormEditable={isFormEditable}
          />
          <Row>
            <Col xs={24}>
              <Row gutter={[8, 8]}>
                <Col xs={24} md={4}>
                  <Form.Item
                    name={['notificationPreferences', 'slack', 'workspace']}
                    rules={[
                      { required: values?.notificationPreferences?.slack?.isActive, message: t('error:REQUIRED') },
                    ]}
                  >
                    <Select
                      className="w-100"
                      placeholder={t('WORKSPACE')}
                      options={slackWorkspaces}
                      allowClear
                      disabled={!values?.notificationPreferences?.slack?.isActive || !isFormEditable}
                      onChange={workspace => setFieldValue(['notificationPreferences', 'slack', 'workspace'], workspace)}
                      onClear={() => {
                        setFieldValue(['notificationPreferences', 'slack', 'channels'], []);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={20}>
                  <Form.Item
                    name={['notificationPreferences', 'slack', 'channels']}
                    rules={[
                      { required: values?.notificationPreferences?.slack?.isActive, message: t('error:REQUIRED') },
                      () => ({
                        validator(_, value) {
                          if (!(values?.notificationPreferences?.slack?.isActive)) {
                            return Promise.resolve();
                          }
                          if (!isValidSlackChannels(value)) {
                            return Promise.reject(new Error(t('batAlertConditionCommon:SLACK_CHANNEL_ERROR_MESSAGE')));
                          }
                          if (value?.length > NOTIFICATION_RECEIVER_LIMIT) {
                            return Promise.reject(new Error(t('batAlertConditionCommon:MAX_RECIPIENTS_ERROR_MESSAGE')));
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Select
                      mode="tags"
                      placeholder="#bat-slack-channel-to-send-notif"
                      dropdownStyle={{ display: 'none' }}
                      maxTagCount={NOTIFICATION_RECEIVER_LIMIT}
                      disabled={
                        !values?.notificationPreferences?.slack?.workspace ||
                        !values?.notificationPreferences?.slack?.isActive ||
                        !isFormEditable
                      }
                      onChange={handleSlackChannelOnChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24}>
              <span>
                <InfoCircleOutlined />
                &nbsp;
                {t('batAlertConditionCommon:SLACK_FOOTNOTE')}
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );

  function handleSlackChannelOnChange(channels: string[]) {
    if (channels?.length > NOTIFICATION_RECEIVER_LIMIT) return;

    if (!isValidSlackChannels(channels)) return;

    setFieldValue(['notificationPreferences', 'slack', 'channels'], channels);
  }

  function handleEmailOnChange(emails: string[]) {
    const validEmails = emails.filter(email => email.trim() !== '');
    if (validEmails?.length > NOTIFICATION_RECEIVER_LIMIT) return;

    const invalidEmails = validEmails.filter(email => !email.trim().endsWith('@getir.com'));
    if (invalidEmails?.length > 0) return;

    setFieldValue(['notificationPreferences', 'email', 'recipients'], emails);
  }

  function isValidSlackChannels(channels: string[] = []): boolean {
    const regex = /^#bat-[a-zA-Z0-9-_]+$/;

    return channels.every(channel => regex.test(channel));
  }

  function isValidEmails(emails: string[] = []): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@getir\.com$/;

    return emails.every(email => regex.test(email));
  }
}

export default ACNotifications;
