import { useState } from 'react';
import { Col, Row, Upload } from 'antd';
import { LoadingOutlined, PaperClipOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { toString } from 'lodash';

import useStyles from './styles';
import { t } from '@shared/i18n';
import Image from '@shared/components/UI/Image';
import { getBase64 } from '@shared/utils/common';
import { Button, Modal } from '@shared/components/GUI';
import { MIME_TYPE } from '@shared/shared/constants';
import { getImageDimensions, validateImage } from '@shared/components/GUI/ImageUploader/utils';

const ImageUploader = ({
  onOkayClick,
  okText,
  modalTitle,
  buttonText,
  buttonProps,
  validImageRatios = [],
  maxImageSizeInMB = 4,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  supportedFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
  disabled,
}) => {
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loadedFile, setLoadedFile] = useState();
  const [errorBag, setErrorbag] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadedImageUrl, setLoadedImageUrl] = useState('');

  const beforeUpload = async file => {
    const {
      width,
      height,
    } = await getImageDimensions(file);
    // Image validator
    setErrorbag([]);
    const tempErrBag = validateImage({
      file,
      dimensions: { width, height },
      validImageRatios,
      maxImageSizeInMB,
      maxWidth,
      minWidth,
      maxHeight,
      minHeight,
      supportedFileTypes,
    });
    setErrorbag(tempErrBag);
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
      getBase64(info.file.originFileObj, _loadedImageUrl => {
        setLoadedFile(info.file);
        setLoading(false);
        setLoadedImageUrl(_loadedImageUrl);
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
    setLoadedImageUrl();
  };

  const handleOk = () => {
    onOkayClick(loadedImageUrl, loadedFile);
    closeModal();
  };

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <>
          <PlusOutlined />
          <div className="mt-2">{t('button:UPLOAD')}</div>
        </>
      )}
    </div>
  );
  return (
    <>
      <Button
        {...buttonProps}
        type="primary"
        size="small"
        onClick={showModal}
        disabled={disabled}
      >
        {buttonText || t('button:CHANGE_IMAGE')}
      </Button>
      <Modal
        title={modalTitle || t('global:CHANGE_IMAGE')}
        centered
        visible={isModalVisible}
        okText={okText || t('global:UPLOAD')}
        onOk={handleOk}
        okButtonProps={{ disabled: !loadedFile || errorBag.length }}
        onCancel={closeModal}
      >
        <Upload
          data-testid="image-uploader"
          name="imageUploader"
          listType="picture-card"
          className={classes.uploaderCard}
          showUploadList={false}
          customRequest={handleCustomRequest}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {loadedImageUrl ? <Image src={loadedImageUrl} alt="image" width="auto" height={300} /> : uploadButton}
        </Upload>
        {loadedFile && loadedFile.name && (
          <Row className="mt-3" align="middle" gutter={[8]}>
            <Col>
              <PaperClipOutlined />
            </Col>
            <Col>{loadedFile && loadedFile.name}</Col>
          </Row>
        )}
        {errorBag.map((errorMessage, index) => (
          <div className="mt-2 text-danger" key={toString(index)}>
            {errorMessage}
          </div>
        ))}
      </Modal>
    </>
  );
};

ImageUploader.propTypes = {
  onOkayClick: PropTypes.func,
  okText: PropTypes.string,
  modalTitle: PropTypes.string,
  buttonText: PropTypes.string,
  buttonProps: PropTypes.shape({}),
  validImageRatios: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  maxImageSizeInMB: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  minHeight: PropTypes.number,
  maxHeight: PropTypes.number,
  supportedFileTypes: PropTypes.array,
  // TODO: use arrayOf and provide more information instead. Props.shape([]) is not the correct usage to get rid of eslint rules.
  disabled: PropTypes.bool,
};

ImageUploader.defaultProps = {
  onOkayClick: () => {},
  okText: t('global:UPLOAD'),
  modalTitle: t('global:CHANGE_IMAGE'),
  buttonText: t('button:CHANGE_IMAGE'),
  buttonProps: {},
  validImageRatios: ['1:1'],
  maxImageSizeInMB: 4,
  minWidth: undefined,
  maxWidth: undefined,
  minHeight: undefined,
  maxHeight: undefined,
  supportedFileTypes: [MIME_TYPE.JPEG, MIME_TYPE.PNG, MIME_TYPE.WEBP],
  disabled: false,
};

export default ImageUploader;
