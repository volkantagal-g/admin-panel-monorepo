import { Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';

const PreviewHTMLContentModal = props => {
  const { 
    content,
    isModalVisible,
    getModalVisible,
    modalWidth = 600,
    height = '320px',
    modalTitle,
  } = props;
  const { t } = useTranslation();

  const handleOk = () => {
    getModalVisible(false);
  };

  const handleCancel = () => {
    getModalVisible(false);
  };

  return (
    <Modal
      title={modalTitle}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width={modalWidth}
      footer={[
        <Button onClick={handleOk} key="ok">
          {t('global:OK')}
        </Button>,
      ]}
    >
      <iframe title="htmlFrame" srcDoc={content} width="100%" height={height} frameBorder="0"></iframe>
    </Modal>
  );
};

export default PreviewHTMLContentModal;
