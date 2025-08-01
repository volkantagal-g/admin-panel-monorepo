import { Button, Col, Row, Upload } from 'antd';
import { DeleteOutlined, PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '../../redux/actions';
import { getUploadDocumentUrlSelector, newPermitRequestSelector } from '../../redux/selectors';
import { MIME_TYPE } from '@shared/shared/constants';

const ALLOWED_TYPES = [MIME_TYPE.JPEG, MIME_TYPE.PNG, MIME_TYPE.PDF, MIME_TYPE.DOC, MIME_TYPE.DOCX];

const UploadDocument = ({ value, onChange, disabled, ...rest }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'employeePage']);
  const uploadedFile = useSelector(getUploadDocumentUrlSelector.getFile);
  const isNewPermitRequestPending = useSelector(newPermitRequestSelector.getIsPending);
  const isUploadDocumentUrlRequestPending = useSelector(getUploadDocumentUrlSelector.getIsPending);
  const fileName = uploadedFile ? value || uploadedFile?.name : null;

  const uploadButton = (
    <Button icon={<UploadOutlined />} loading={isUploadDocumentUrlRequestPending}>
      {t('global:UPLOAD')}
    </Button>
  );

  const handleUploadDocument = file => {
    const reader = new FileReader();
    reader.onload = e => {
      const dataBase64 = e?.target?.result;
      dispatch(Creators.setUploadDocumentFile({
        file: {
          base64: dataBase64,
          name: file.nameWithoutExtension,
          contentType: file.type,
        },
      }));
      if (typeof onChange === 'function') onChange(file?.name);
    };

    reader.onerror = () => {
      const err = 'UPLOAD_ERROR';
      dispatch(ToastCreators.error({ err }));
    };

    reader.readAsDataURL(file);
    return false;
  };

  const isValidDocument = file => {
    const isValidFileType = ALLOWED_TYPES.includes(file.type);
    if (!isValidFileType) {
      dispatch(ToastCreators.error({ message: t('employeePage:DOCUMENT.ERR_UPLOAD_TYPE_MESSAGE') }));
      return false;
    }
    const isValidSize = file.size < 5242880; // less than 5mb
    if (!isValidSize) {
      dispatch(ToastCreators.error({ message: t('employeePage:DOCUMENT.ERR_UPLOAD_SIZE_MESSAGE') }));
      return false;
    }
    return isValidFileType && isValidSize;
  };

  const beforeUpload = file => {
    const tempFile = file;
    const extensionRegExp = /(?:\.([^.]+))?$/;
    const [nameWithoutExtension] = file.name.split(extensionRegExp);
    tempFile.nameWithoutExtension = nameWithoutExtension;
    const isValid = isValidDocument(file);
    if (!isValid) {
      return false;
    }
    handleUploadDocument(tempFile);
    return false;
  };

  const handleDeleteDocument = () => {
    dispatch(Creators.resetUploadDocumentURL());
    onChange(undefined);
  };

  return (
    <>
      {!fileName && (
        <Upload
          {...rest}
          className="w-100 d-block"
          action=""
          accept={ALLOWED_TYPES}
          maxCount={1}
          showUploadList={false}
          beforeUpload={beforeUpload}
          disabled={isUploadDocumentUrlRequestPending || disabled || fileName}
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
            loading={isUploadDocumentUrlRequestPending || isNewPermitRequestPending}
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
