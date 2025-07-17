import { Modal, Button, Input, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import { useInput } from '@shared/hooks';

const SetWebhelpIdModal = ({
  isVisible,
  onClose,
  onConfirm,
  user,
}) => {
  const { t } = useTranslation('userPage');
  const webhelpIdInput = useInput(user?.webhelpAgentId);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    if (webhelpIdInput.value.trim().length > 0) {
      onConfirm({ webhelpId: webhelpIdInput.value });
    }
  };

  return (
    <Modal
      visible={isVisible}
      footer={[
        <Button key="back" onClick={handleClose}>
          {t('CANCEL')}
        </Button>,
        <Popconfirm
          title={t('global:COMMON_CONFIRM_TEXT')}
          okText={t('OK')}
          cancelText={t('CANCEL')}
          onConfirm={handleConfirm}
          disabled={!webhelpIdInput.value}
          key="submit"
        >
          <Button type="success" disabled={!webhelpIdInput.value}>
            {t('OK')}
          </Button>
        </Popconfirm>,
      ]}
      onCancel={handleClose}
      destroyOnClose
    >
      <span>{t('userPage:WEBHELP_ID')}</span>
      <Input
        value={webhelpIdInput.value}
        onChange={webhelpIdInput.onChange}
      />
    </Modal>
  );
};

export default SetWebhelpIdModal;
