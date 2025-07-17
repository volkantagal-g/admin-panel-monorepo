import { useState } from 'react';
import { Button, Checkbox, Col, Modal, Row, Upload } from 'antd';
import { LoadingOutlined, PaperClipOutlined, PlusOutlined } from '@ant-design/icons';

import useStyles from './styles';
import { t } from '@shared/i18n';
import Image from '@shared/components/UI/Image';
import { getBase64 } from '@shared/utils/common';
import { validateImage } from '@shared/components/UI/ImageUploader/utils';

export const getImageDimensions = file => {
  return new Promise(resolved => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', event => {
      const loadedImageUrl = event.target.result;
      const image = document.createElement('img');
      image.src = loadedImageUrl;
      image.addEventListener('load', () => {
        const { width, height } = image;
        resolved({ width, height });
      });
    });
  });
};

const ImageUploader = props => {
  const {
    onOkayClick,
    okText,
    modalTitle,
    buttonText,
    buttonProps,
    validImageRatios = [],
    maxImageSizeInMB = 4,
    maxWidth,
    minWidth,
    minHeight,
    maxHeight,
    supportedFileTypes = ['image/jpeg', 'image/png', 'image/webp'],
    shouldUseSupportedFileTypesAsAcceptedTypes = false,
    disabled = false,
    isAppliedToOtherLanguagesCheckboxVisible,
    isAppliedToOtherLanguangesProp = true,
  } = props;
  const classes = useStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAppliedToOtherLanguanges, setIsAppliedToOtherLanguanges] = useState(isAppliedToOtherLanguangesProp);
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

  const handleApplyToOtherLanguagesChange = () => setIsAppliedToOtherLanguanges(!isAppliedToOtherLanguanges);

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
    onOkayClick(loadedImageUrl, loadedFile, isAppliedToOtherLanguanges);
    closeModal();
    setIsAppliedToOtherLanguanges(true);
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
      <Button {...buttonProps} className="w-100" type="primary" size="small" onClick={showModal} disabled={disabled}>
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
          name="imageUploader"
          listType="picture-card"
          className={classes.uploaderCard}
          showUploadList={false}
          customRequest={handleCustomRequest}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          {...(shouldUseSupportedFileTypesAsAcceptedTypes && { accept: supportedFileTypes.join(',') })}
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
          // eslint-disable-next-line react/no-array-index-key
          <div className="mt-2 text-danger" key={index}>
            {
              errorMessage
            }
          </div>
        ))}
        <br />
        {!isAppliedToOtherLanguagesCheckboxVisible && (
          <Checkbox checked={isAppliedToOtherLanguanges} onChange={handleApplyToOtherLanguagesChange}>
            {t('imageUploadComponent:APPLY_TO_OTHER_LANGUAGES')}
          </Checkbox>
        )}
      </Modal>
    </>
  );
};

export default ImageUploader;
