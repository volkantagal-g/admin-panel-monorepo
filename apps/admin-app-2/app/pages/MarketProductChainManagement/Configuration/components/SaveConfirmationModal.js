import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import useStyles from '../styles';

const SaveConfirmationModal = ({ isOpen, onCancel, onConfirm, isLoading = false }) => {
  const { t } = useTranslation('marketProductChainManagement');
  const classes = useStyles();

  return (
    <Modal
      title={t('SAVE_CONFIRMATION_TITLE')}
      visible={isOpen}
      open={isOpen}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={t('BUTTONS.SAVE')}
      cancelText={t('BUTTONS.CANCEL')}
      centered
      destroyOnClose
      maskClosable={!isLoading}
      keyboard={!isLoading}
      width={480}
      className={classes.saveConfirmationModal}
      confirmLoading={isLoading}
      cancelButtonProps={{ disabled: isLoading }}
      maskStyle={{
        background: 'rgba(103, 81, 164, 0.50)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <p>{isLoading ? t('SAVING_CHANGES_MESSAGE') : t('ARE_YOU_SURE_YOU_WANT_TO_SAVE_CHANGES')}</p>
    </Modal>
  );
};

SaveConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

SaveConfirmationModal.defaultProps = { isLoading: false };

export default SaveConfirmationModal;
