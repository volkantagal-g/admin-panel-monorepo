import { Alert, Modal } from 'antd';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

import { validateConfigValueSelector } from '@app/pages/Algorithm/Config/Detail/redux/selectors';

const ConfigSchemaWarningModal = ({ visible, setVisible, setIsEditing, updateConfig }) => {
  const { t } = useTranslation(['algorithmConfigPage']);
  const validationData = useSelector(validateConfigValueSelector.getData);

  const handleCancel = () => {
    setVisible(false);
    setIsEditing(false);
  };

  const handleForceSave = () => {
    setVisible(false);
    updateConfig();
  };

  return (
    <Modal
      title={t('algorithmConfigPage:VALIDATION_WARNING')}
      visible={visible}
      onCancel={handleCancel}
      centered
      okType="warning"
      okText={t('algorithmConfigPage:FORCE_SAVE')}
      onOk={handleForceSave}
    >
      {validationData?.errors?.map(error => {
        return (
          <Alert
            message={error?.path}
            description={error?.message}
            type="error"
            style={{ marginBottom: 10 }}
          />
        );
      })}
    </Modal>
  );
};

export default ConfigSchemaWarningModal;
