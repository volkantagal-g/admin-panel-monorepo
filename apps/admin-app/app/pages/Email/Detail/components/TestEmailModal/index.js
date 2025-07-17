import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Modal, Row } from 'antd';
import PropTypes from 'prop-types';

import { rules } from '@app/pages/Email/Detail/formHelpers';
import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { Creators } from '@app/pages/Email/Detail/redux/actions';
import { testEmailSelector } from '@app/pages/Email/Detail/redux/selectors';
import { GETIR_DOMAIN_URL } from '@shared/shared/constants';

const TestEmailModal = ({ isModalVisible, onCancel, emailId, mainForm }) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isTestEmailPending = useSelector(testEmailSelector.getIsPending);

  return (
    <Modal
      centered
      bodyStyle={{ paddingBottom: '10px' }}
      title={t('TEST_EMAIL')}
      visible={isModalVisible}
      okText={t('SEND')}
      okButtonProps={{ form: 'test-email-form', key: 'submit', htmlType: 'submit', disabled: isTestEmailPending }}
      onCancel={onCancel}
    >
      <Form
        form={form}
        preserve
        initialValues={{ id: emailId }}
        id="test-email-form"
        onFinish={values => {
          try {
            values.testMails.forEach(mail => {
              if (!mail.endsWith(`@${GETIR_DOMAIN_URL}`)) {
                throw new Error();
              }
              dispatch(Creators.sendTestEmailRequest({
                body: {
                  emailCampaignId: emailId,
                  domainType: mainForm.getFieldValue('domainType'),
                  ...values,
                },
              }));
              onCancel();
            });
          }
          catch {
            form.setFields([{ name: 'testMails', errors: [t('TEST_EMAIL_DOMAIN_ALERT')] }]);
          }
        }}
      >
        <Row gutter={24}>
          <AntSelectWithCsvImport
            selectWrapperProps={{ md: 15, xs: 24 }}
            importWrapperProps={{ md: 9, xs: 24 }}
            maxTagTextLength={20}
            placeholder={t('ADD_EMAIL_ADDRESS')}
            maxTagCount={1}
            mode="tags"
            rule={rules.onlyRequired}
            disabled={isTestEmailPending}
            loading={isTestEmailPending}
            name="testMails"
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

TestEmailModal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  emailId: PropTypes.string.isRequired,
};

export default memo(TestEmailModal);
