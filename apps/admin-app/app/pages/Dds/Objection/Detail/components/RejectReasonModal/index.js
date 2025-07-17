import { useState } from 'react';
import { Modal, Button, Input, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';

import useStyles from './styles';

const RejectReasonModal = ({
  rejectReasonModalVisibility,
  handleCloseRejectReasonModal,
  handleConfirmRejectReasonModal,
}) => {
  const classes = useStyles();
  const { t } = useTranslation('ddsObjectionDetailPage');

  const [reason, setReason] = useState('');
  const [disabled, setDisabled] = useState(true);

  const closeRejectReasonModalClick = () => {
    handleCloseRejectReasonModal();
  };

  const handleConfirm = () => {
    handleConfirmRejectReasonModal(reason);
  };

  const handleChangeReason = e => {
    const { value } = e.target;
    setReason(value);
    if (value.trim().length > 0) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  };

  const handleAfterCloseRejectReasonModal = () => {
    setReason('');
    setDisabled(true);
  };

  return (
    <Modal
      visible={rejectReasonModalVisibility}
      footer={[
        <Button key="back" onClick={closeRejectReasonModalClick}>
          {t('CANCEL')}
        </Button>,
        <Popconfirm
          className={classes.popConfirmButton}
          disabled={disabled}
          placement="topRight"
          title={t('REJECT.CONFIRM.UPDATE')}
          okText={t('OK')}
          cancelText={t('CANCEL')}
          onConfirm={handleConfirm}
          key="submit"
        >
          <Button type="success" disabled={disabled}>
            {t('CONTINUE')}
          </Button>
        </Popconfirm>,
      ]}
      onCancel={closeRejectReasonModalClick}
      afterClose={handleAfterCloseRejectReasonModal}
      destroyOnClose
    >
      <span>{t('REASON.TITLE.DENIED')}</span>
      <Input.TextArea
        data-testid="deniedReason"
        autoSize={{ minRows: 3, maxRows: 8 }}
        value={reason}
        onChange={handleChangeReason}
      />
    </Modal>
  );
};

export default RejectReasonModal;
