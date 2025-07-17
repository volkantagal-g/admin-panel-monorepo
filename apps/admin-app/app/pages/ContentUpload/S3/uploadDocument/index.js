import { Button, Col, Row, Upload } from 'antd';
import { DeleteOutlined, PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { MIME_TYPE } from '@shared/shared/constants';

const ALLOWED_TYPES = [MIME_TYPE.JPEG, MIME_TYPE.PNG, MIME_TYPE.PDF, MIME_TYPE.DOC, MIME_TYPE.DOCX, MIME_TYPE.HTML, MIME_TYPE.ALL_VIDEOS];

const UploadDocument = ({ fileName, onDocumentUpload, resetUpload, disabled, ...rest }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'contentUploadPage']);

  const uploadButton = (
    <Button icon={<UploadOutlined />}>
      {t('global:UPLOAD')}
    </Button>
  );

  const handleUploadDocument = file => {
    const reader = new FileReader();
    reader.onload = e => {
      const dataBase64 = e?.target?.result;
      onDocumentUpload({
        base64: dataBase64,
        contentType: file.type,
        name: file.nameWithoutExtension,
      });
    };

    reader.onerror = () => {
      const err = 'UPLOAD_ERROR';
      dispatch(ToastCreators.error({ err }));
    };

    reader.readAsDataURL(file);
    return false;
  };

  // eslint-disable-next-line no-unused-vars
  const isValidDocument = file => {
    const isValidFileType = ALLOWED_TYPES.includes(file.type);
    if (!isValidFileType) {
      dispatch(ToastCreators.error({ message: t('contentUploadPage:DOCUMENT.ERR_UPLOAD_TYPE_MESSAGE') }));
      return false;
    }
    const isValidSize = file.size < 5242880; // less than 5mb
    if (!isValidSize) {
      dispatch(ToastCreators.error({ message: t('contentUploadPage:DOCUMENT.ERR_UPLOAD_SIZE_MESSAGE') }));
      return false;
    }
    return isValidFileType && isValidSize;
  };

  const beforeUpload = file => {
    const tempFile = file;
    const extensionRegExp = /(?:\.([^.]+))?$/;
    const [nameWithoutExtension] = file.name.split(extensionRegExp);
    tempFile.nameWithoutExtension = nameWithoutExtension;
    // const isValid = isValidDocument(file);
    // if (!isValid) {
    //   return false;
    // }
    handleUploadDocument(tempFile);
    return tempFile;
  };

  const handleDeleteDocument = () => {
    resetUpload();
  };

  return (
    <>
      {!fileName && (
        <Upload
          {...rest}
          className="w-100 d-block"
          action={false}
          accept={ALLOWED_TYPES}
          maxCount={1}
          showUploadList={false}
          disabled={disabled}
          beforeUpload={beforeUpload}
        >
          {uploadButton}
        </Upload>
      )}

      {fileName && (
      <Row align="middle" gutter={[2]} wrap={false}>
        <Col>
          <PaperClipOutlined />
        </Col>
        <Col>
          {fileName}
        </Col>
        <Col className="ml-auto">
          <Button
            type="link"
            danger
            loading={disabled}
            icon={<DeleteOutlined />}
            onClick={handleDeleteDocument}
          />
        </Col>
      </Row>
      )}
    </>
  );
};

export default UploadDocument;
