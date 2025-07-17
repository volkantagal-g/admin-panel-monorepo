import { Form, Modal, Row } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { isObjectIdValid } from '@shared/utils/common';
import { Creators } from '@app/pages/PushNotification/Detail/redux/actions';
import { testPushNotificationSelector } from '@app/pages/PushNotification/Detail/redux/selectors';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';

const TestNotificationModal = ({ isModalVisible, onCancel, notificationId }) => {
  const { t } = useTranslation('marketing');
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isTestPushNotificationPending = useSelector(testPushNotificationSelector.getIsPending);

  return (
    <Modal
      bodyStyle={{ paddingBottom: '0px' }}
      title={t('PUSH_NOTIFICATION_TEST_NOTICE')}
      visible={isModalVisible}
      okText={t('SEND')}
      okButtonProps={{ form: 'test-push-form', key: 'submit', htmlType: 'submit', disabled: isTestPushNotificationPending }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        preserve
        initialValues={{ id: notificationId }}
        id="test-push-form"
        onFinish={values => {
          dispatch(Creators.sendTestPushNotificationRequest({ body: { notificationId, ...values } }));
        }}
      >
        <Row gutter={24}>
          <AntSelectWithCsvImport
            selectWrapperProps={{ md: 15, xs: 24 }}
            importWrapperProps={{ md: 9, xs: 24 }}
            maxTagTextLength={20}
            placeholder={t('ADD_CLIENT_ID')}
            maxTagCount={1}
            mode="tags"
            rule={[
              () => ({
                validator(rule, clientIds) {
                  if (!clientIds?.length) {
                    return Promise.reject(t('error:REQUIRED'));
                  }
                  for (let i = 0; i < clientIds.length; i += 1) {
                    if (!isObjectIdValid(clientIds[i])) {
                      return Promise.reject(t('CUSTOM_VALIDATION.INVALID_CLIENT_ID'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            disabled={isTestPushNotificationPending}
            loading={isTestPushNotificationPending}
            name="clients"
            btnLabel={t('CSV_UPLOAD')}
            pairValueOptions={false}
            form={form}
            options={[]}
          />
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(TestNotificationModal);
