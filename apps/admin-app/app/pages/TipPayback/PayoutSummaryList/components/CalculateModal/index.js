import { Button, DatePicker, Form, Modal, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { useState } from 'react';

import { calculateSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

export default function CalculateModal() {
  const dispatch = useDispatch();
  const { t } = useTranslation(['payoutSummaryPage', 'global']);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const calculateSelectorIsPending = useSelector(calculateSelector.getIsPending);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmitForm = () => {
    const formValues = form.getFieldsValue();
    const { startDate, finishDate } = formValues;
    dispatch(
      Creators.calculateRequest({
        startDate,
        finishDate,
      }),
    );
    setIsModalVisible(false);
  };

  const handleStartDate = values => {
    form.setFieldsValue('startDate', values);
  };

  const handleFinishDate = values => {
    form.setFieldsValue('finishDate', values);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div>
      <Button loading={calculateSelectorIsPending} onClick={showModal} type="primary"> {t('payoutSummaryPage:CALCULATE')} </Button>
      <Form
        initialValues={{
          startDate: null,
          finishDate: moment(new Date()),
        }}
        form={form}
      >
        <Modal
          title={t('payoutSummaryPage:CALCULATE_PROCESS')}
          confirmLoading={calculateSelectorIsPending}
          visible={isModalVisible}
          onCancel={handleCancel}
          onOk={handleSubmitForm}
          okButtonProps={{ htmlType: 'submit' }}
        >
          <p> {t('payoutSummaryPage:CALCULATE_DESC')} </p>
          <Space>
            <Form.Item name="startDate">
              <DatePicker placeholder={t('payoutSummaryPage:START_DATE')} onOk={handleStartDate} />
            </Form.Item>
            <Form.Item
              name="finishDate"
              rules={[{ required: true, message: t('error:REQUIRED') }]}
            >
              <DatePicker
                allowClear={false}
                placeholder={t('payoutSummaryPage:FINISH_DATE')}
                onOk={handleFinishDate}
              />
            </Form.Item>
          </Space>
        </Modal>
      </Form>
    </div>
  );
}
