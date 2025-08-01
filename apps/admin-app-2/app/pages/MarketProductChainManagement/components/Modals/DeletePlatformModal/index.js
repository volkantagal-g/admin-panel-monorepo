import { Input } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@shared/components/GUI';

import useStyles from '../styles';

const DeletePlatformModal = ({
  deletePlatformRecord,
  setDeletePlatformRecord,
  openDeletePlatformModal,
  setOpenDeletePlatformModal,
}) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();

  const requiredText = 'DELETE';
  const [deleteText, setDeleteText] = useState();

  const onDeletePlatform = () => {
    setOpenDeletePlatformModal(false);
  };

  const onCancel = () => {
    setOpenDeletePlatformModal(false);
    setDeletePlatformRecord();
  };

  return (
    <Modal
      visible={openDeletePlatformModal}
      centered
      title={t('DELETE_PLATFORM', { platformName: deletePlatformRecord?.name })}
      onCancel={onCancel}
      okText={t('BUTTONS.DELETE')}
      className={classes.modal}
      closable={false}
      onOk={onDeletePlatform}
      okButtonProps={{
        disabled: deleteText !== requiredText,
        style: deleteText === requiredText ? {
          backgroundColor: '#D13333',
          borderColor: '#D13333',
          color: '#fff',
        } : null,
      }}
    >
      <Input
        placeholder={t('TYPE_DELETE')}
        onChange={({ target }) => setDeleteText(target.value)}
        className={classes.input}
        allowClear
      />
    </Modal>
  );
};

export default DeletePlatformModal;
