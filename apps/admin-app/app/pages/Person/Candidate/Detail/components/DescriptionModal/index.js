import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input, Popconfirm } from 'antd';

const { TextArea } = Input;

const DescriptionModal = ({
  descriptionModalVisibility,
  handleCloseDescriptionModal,
  handleConfirmDescriptionModal,
}) => {
  const { t } = useTranslation('personCandidatePage');

  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(true);

  const closeDescriptionModalClick = () => {
    handleCloseDescriptionModal();
  };

  const handleConfirm = () => {
    handleConfirmDescriptionModal(description);
  };

  const handleChangeDescription = e => {
    const { value } = e.target;
    setDescription(value);
    if (value.trim().length > 0) {
      setDisabled(false);
    }
    else {
      setDisabled(true);
    }
  };

  const handleAfterCloseDescriptionModal = () => {
    setDescription('');
    setDisabled(true);
  };

  return (
    <Modal
      visible={descriptionModalVisibility}
      footer={[
        <Button key="back" onClick={closeDescriptionModalClick}>
          {t('PERSON_FORM.ACTIONS.CANCEL')}
        </Button>,
        <Popconfirm
          disabled={disabled}
          placement="topRight"
          title={t('PERSON_FORM.ACTIONS.CONFIRM.UPDATE')}
          okText={t('PERSON_FORM.ACTIONS.OK')}
          cancelText={t('PERSON_FORM.ACTIONS.CANCEL')}
          onConfirm={handleConfirm}
          key="submit"
        >
          <Button type="success" disabled={disabled}>
            {t('PERSON_FORM.ACTIONS.CONTINUE')}
          </Button>
        </Popconfirm>,
      ]}
      onCancel={closeDescriptionModalClick}
      afterClose={handleAfterCloseDescriptionModal}
      destroyOnClose
    >
      <span>{t('PERSON_FORM.DESCRIPTION')}</span>
      <TextArea
        value={description}
        onChange={handleChangeDescription}
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
    </Modal>
  );
};

export default DescriptionModal;
