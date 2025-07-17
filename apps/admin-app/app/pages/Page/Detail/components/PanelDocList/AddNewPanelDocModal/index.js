import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';

import AddNewPanelDocForm from '../AddNewPanelDocForm';
import { createPanelDocSelector } from '../../../redux/selectors';

const AddNewPanelDocModal = ({ pageId, t }) => {
  const isPendingCreatePanelDoc = useSelector(createPanelDocSelector.getIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        visible={isModalVisible}
        title={t('COMPONENTS.PAGE_DETAIL.ADD_DOCUMENTATION')}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <AddNewPanelDocForm t={t} afterSubmit={handleOk} afterCancel={handleCancel} loading={isPendingCreatePanelDoc} pageId={pageId} />
      </Modal>
      <Button type="primary" onClick={showModal}>
        {t('COMPONENTS.PAGE_DETAIL.ADD_DOCUMENTATION')}
      </Button>
    </>
  );
};

export default memo(AddNewPanelDocModal);
