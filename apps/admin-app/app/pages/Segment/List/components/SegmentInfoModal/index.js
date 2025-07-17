import { Form, Modal, Row, Input, Col } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntSelectWithCsvImport from '@shared/components/AntSelectWithCsvImport';
import { getUser } from '@shared/redux/selectors/auth';
import { Creators } from '@app/pages/Segment/List/redux/actions';
import { GETIR_DOMAIN_URL } from '@shared/shared/constants';
import { sendSegmentListAudienceInfoMailSelector } from '@app/pages/Segment/List/redux/selectors';

const SegmentInfoModal = ({ isModalVisible, setModalVisible }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = getUser();
  const { t } = useTranslation('segment');
  const isSegmentAudienceListInfoSending = useSelector(sendSegmentListAudienceInfoMailSelector.getIsPending);

  return (
    <Modal
      centered
      bodyStyle={{ paddingBottom: '10px' }}
      title={t('SEND_SEGMENT_INFO_EMAIL')}
      visible={isModalVisible}
      okText={t('SEND')}
      confirmLoading={isSegmentAudienceListInfoSending}
      okButtonProps={{ form: 'send-segment-list-form', key: 'submit', htmlType: 'submit', disabled: false }}
      onCancel={() => {
        setModalVisible(false);
        form.resetFields();
      }}
    >
      <Form
        form={form}
        preserve
        initialValues={{
          email: user?.email,
          segmentIds: [],
        }}
        id="send-segment-list-form"
        onFinish={values => {
          try {
            if (!values.email.endsWith(`@${GETIR_DOMAIN_URL}`)) {
              throw new Error();
            }
            dispatch(Creators.sendSegmentListAudienceInfoMailRequest({
              segmentNumbers: values.segmentIds,
              email: values.email,
              onSuccess: () => {
                setModalVisible(false);
                form.resetFields();
              },
            }));
          }
          catch {
            form.setFields([{ name: 'email', errors: [t('TEST_EMAIL_DOMAIN_ALERT')] }]);
          }
        }}
      >
        <Row gutter={24}>
          <Col lg={24}>
            <Form.Item name="email" className="">
              <Input placeholder="E-Mail" />
            </Form.Item>

          </Col>
          <AntSelectWithCsvImport
            selectWrapperProps={{ md: 15, xs: 24 }}
            importWrapperProps={{ md: 9, xs: 24 }}
            maxTagTextLength={15}
            checkIsValidObjectId={false}
            placeholder={t('ADD_SEGMENT_ID')}
            maxTagCount={25}
            tokenSeparators={[',']}
            mode="tags"
            rule={[{ required: true, message: t('error:REQUIRED') }]}
            disabled={false}
            loading={false}
            name="segmentIds"
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

export default SegmentInfoModal;
