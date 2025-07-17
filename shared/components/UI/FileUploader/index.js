import { useState } from 'react';
import { Button, Col, Modal, Row, Upload, Typography, Alert } from 'antd';
import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons';

import { t } from '@shared/i18n';
import { getBase64 } from '@shared/utils/common';

const { Paragraph } = Typography;

const FileUploader = props => {
  const {
    onOkayClick,
    okText,
    modalTitle,
    buttonText,
    supportedFileTypes = [],
    warningText,
    customValidate = () => {},
  } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadedFile, setLoadedFile] = useState();
  const [errorBag, setErrorbag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedBase64File, setLoadedBase64File] = useState('');

  const validateFileType = file => (supportedFileTypes?.length ? supportedFileTypes.includes(file.type) : true);

  const validate = async file => {
    const tempErrBag = [];

    if (!validateFileType(file)) {
      tempErrBag.push(t('error:VALID_FILE_TYPE', { types: supportedFileTypes.join(', ') }));
    }
    const customValidateMessage = await customValidate(file);
    if (customValidateMessage) {
      tempErrBag.push(customValidateMessage);
    }
    setErrorbag(tempErrBag);
  };

  const beforeUpload = async file => {
    setErrorbag([]);
    await validate(file);
  };

  const handleCustomRequest = ({ onSuccess }) => {
    setTimeout(() => onSuccess('ok'), 0);
  };

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, loadedBase64FileCallback => {
        setLoadedFile(info.file);
        setLoading(false);
        setLoadedBase64File(loadedBase64FileCallback);
      });
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setErrorbag([]);
    setLoadedFile();
    setLoading(false);
    setLoadedBase64File();
  };

  const handleOk = () => {
    onOkayClick(loadedBase64File, loadedFile);
    closeModal();
  };

  return (
    <>
      <Row
        onClick={event => {
          event.preventDefault();
          showModal();
        }}
      >
        {buttonText}
      </Row>
      <Modal
        title={modalTitle || t('global:UPLOAD_FILE')}
        centered
        visible={isModalVisible}
        okText={okText || t('global:UPLOAD')}
        onOk={handleOk}
        okButtonProps={{ disabled: !loadedFile || errorBag.length }}
        onCancel={closeModal}
      >
        {warningText && (
          <Paragraph>
            <Alert message={warningText} type="warning" />
          </Paragraph>
        )}
        <Upload
          name="file"
          listType="text"
          showUploadList={false}
          customRequest={handleCustomRequest}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <Button
            icon={<UploadOutlined />}
            loading={loading}
          >
            {t('global:CHOOSE_FILE')}
          </Button>
        </Upload>
        {loadedFile?.name && (
          <Row className="mt-3" align="middle" gutter={[8]}>
            <Col>
              <PaperClipOutlined />
            </Col>
            <Col>{loadedFile?.name}</Col>
          </Row>
        )}
        {errorBag.map((errorMessage, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className="mt-2 text-danger" key={index}>
            {
              errorMessage
            }
          </div>
        ))}
      </Modal>
    </>
  );
};

export default FileUploader;
