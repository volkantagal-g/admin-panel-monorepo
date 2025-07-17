import { Col, Form, Modal, Row } from 'antd';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useDispatch } from 'react-redux';

import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { Creators } from '@app/pages/Sms/Detail/redux/actions';

const TestSmsModal = ({ isModalVisible, onCancel, smsId }) => {
  const { t } = useTranslation('marketing');
  const [form] = Form.useForm();
  const isTestSmsPending = false;
  const dispatch = useDispatch();
  return (
    <Modal
      centered
      bodyStyle={{ paddingBottom: '10px' }}
      title={t('TEST_SMS')}
      visible={isModalVisible}
      okText={t('SEND')}
      okButtonProps={{ form: 'test-sms-form', key: 'submit', htmlType: 'submit', disabled: isTestSmsPending }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        preserve
        id="test-sms-form"
        onFinish={values => {
          dispatch(Creators.sendTestSmsRequest({ id: smsId, ...values }));
        }}
      >
        <Row gutter={24}>
          <AntSelectWithCsvImport
            selectWrapperProps={{ md: 15, xs: 24 }}
            importWrapperProps={{ md: 9, xs: 24 }}
            maxTagTextLength={20}
            placeholder={t('ADD_PHONE_NUMBER')}
            maxTagCount={1}
            mode="tags"
            rule={[
              () => ({
                validator(rule, clientIds) {
                  if (!clientIds?.length) {
                    return Promise.reject(t('error:REQUIRED'));
                  }
                  for (let i = 0; i < clientIds.length; i += 1) {
                    if (!isValidPhoneNumber(clientIds[i])) {
                      return Promise.reject(t('CUSTOM_VALIDATION.INVALID_PHONE_NUMBER'));
                    }
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            disabled={isTestSmsPending}
            loading={isTestSmsPending}
            name="phoneNumbers"
            btnLabel={t('CSV_UPLOAD')}
            pairValueOptions={false}
            form={form}
            options={[]}
          />
        </Row>
        <Row>
          <Col>
            <p>{t('VALID_PHONE_NUMBER_FORMAT')} : <b>+905551112233</b>  </p>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default memo(TestSmsModal);
