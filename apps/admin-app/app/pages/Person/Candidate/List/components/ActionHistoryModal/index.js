import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';

import ActionHistoryTable from '../ActionHistoryTable';

const ActionHistoryModal = ({ candidate, isModalVisible, setIsModalVisible }) => {
  const { t } = useTranslation('personCandidatePage');

  const closeModal = () => setIsModalVisible(false);

  return (
    <Modal
      title={t('ACTION_HISTORY_BUTTON')}
      visible={isModalVisible}
      onOk={closeModal}
      onCancel={closeModal}
      width={800}
      footer={[
        <Button onClick={closeModal} key="ok">
          {t('global:OK')}
        </Button>,
      ]}
    >
      <ActionHistoryTable candidate={candidate} />
    </Modal>
  );
};

ActionHistoryModal.propTypes = {
  candidate: PropTypes.shape({}),
  isModalVisible: PropTypes.bool,
  setIsModalVisible: PropTypes.func,
};
ActionHistoryModal.defaultProps = {
  candidate: {},
  isModalVisible: false,
  setIsModalVisible: () => {},
};

export default ActionHistoryModal;
