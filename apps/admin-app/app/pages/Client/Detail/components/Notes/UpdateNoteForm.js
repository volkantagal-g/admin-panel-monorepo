import { memo } from 'react';
import { Input, Form, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Creators } from '@app/pages/Client/Detail/redux/actions';

const { TextArea } = Input;

const UpdateNoteForm = ({
  form,
  note,
  currentUser,
  isModalVisible,
  setIsModalVisible,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('clientDetail');

  const handleOk = () => {
    onFinish();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = () => {
    const values = form.getFieldsValue();
    const data = {
      ...values,
      noteId: note._id,
      updatedBy: {
        _id: currentUser._id,
        name: currentUser.name,
      },
      message: values.message,
    };
    dispatch(Creators.updateClientNoteRequest({ data }));
  };

  return (
    <Modal
      title={t("CLIENT_META.NOTE.EDIT")}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        okText={t("BUTTON.SAVE")}
        cancelText={t("BUTTON.CANCEL")}
      >
        <div>
          <Form.Item
            name="message"
            label={t("CLIENT_META.NOTE.MESSAGE")}
            rules={[
              { required: true },
              { type: 'string', max: 1000 },
            ]}
          >
            <TextArea placeholder={`${t("CLIENT_META.NOTE.UPDATE")}...`} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default memo(UpdateNoteForm);