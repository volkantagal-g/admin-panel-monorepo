import { Modal } from 'antd';
import { TFunction } from 'react-i18next';

import UserExportForm from './UsersExportForm';

type UsersExportModalProps = {
  t: TFunction;
  isModalOpen: boolean;
  handleCancel: () => void;
}

const UsersExportModal = ({ t, isModalOpen, handleCancel }: UsersExportModalProps) => {
  return (
    <Modal
      width={320}
      title={t('SELECT_THE_EXPORT_FILTERS')}
      visible={isModalOpen}
      onCancel={handleCancel}
      footer={false}
      destroyOnClose
    >
      <UserExportForm handleCancel={handleCancel} />
    </Modal>
  );
};

export default UsersExportModal;
