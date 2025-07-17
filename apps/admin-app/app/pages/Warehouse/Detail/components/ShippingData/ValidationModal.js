import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';

export default function ValidationModal({ isModalVisible, closeModal, onValidate }) {
  const { t } = useTranslation();
  return (
    <Modal
      centered
      visible={isModalVisible}
      onOk={onValidate}
      onCancel={closeModal}
    >
      {t('warehousePage:SHIPPING_DATA_VALIDATION_MODAL')}
    </Modal>
  );
}
