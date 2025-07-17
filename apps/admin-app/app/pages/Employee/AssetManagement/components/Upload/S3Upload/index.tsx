import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Upload, Button } from 'antd';
import type { UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { S3UploadProps } from './types';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from './redux/actions';
import { ALLOWED_TYPES } from '@app/pages/Employee/AssetManagement/constants';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from './redux/saga';
import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.ASSET_MANAGEMENT.UPLOAD;

const S3Upload: React.FC<S3UploadProps> = (props: S3UploadProps) => {
  const { t } = useTranslation(['assetManagement']);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Creators.initContainer());
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);
  useInjectSaga({ key: reduxKey, saga });

  const { value, className, onChange, disabled, form, folderPath } = props || {};
  const [fileList, setFileList] = useState<UploadFile[] | undefined>(undefined);

  const [isDocumentPending, setIsDocumentPending] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setFileList(() => [
        {
          uid: '1',
          name: value,
          status: 'done',
          url: value,
        },
      ]);
    }
    else {
      setFileList(() => undefined);
    }
  }, [form, value]);

  const handleUploadDocument = (file: any) => {
    const reader = new FileReader();
    reader.onload = e => {
      const dataBase64 = e?.target?.result;

      setIsDocumentPending(true);
      dispatch(Creators.uploadDocumentRequest({
        file,
        base64: dataBase64,
        folderPath,
        onSuccess: (data: any) => {
          form.setFieldsValue({ documentFileKey: data });
          setIsDocumentPending(false);
        },
      }));
      if (typeof onChange === 'function') {
        // @ts-ignore
        onChange(file?.name);
      }
    };

    reader.onerror = () => {
      const err = 'UPLOAD_ERROR';
      dispatch(ToastCreators.error({ err }));
      setIsDocumentPending(false);
    };

    reader.readAsDataURL(file);
    return false;
  };

  const isValidDocument = (file: any) => {
    const isValidFileType = ALLOWED_TYPES.includes(file.type);
    if (!isValidFileType) {
      dispatch(ToastCreators.error({ message: t('assetManagement:DOCUMENT.ERR_UPLOAD_TYPE_MESSAGE') }));
      return false;
    }
    const isValidSize = file.size < 5242880; // less than 5mb
    if (!isValidSize) {
      dispatch(ToastCreators.error({ message: t('assetManagement:DOCUMENT.ERR_UPLOAD_SIZE_MESSAGE') }));
      return false;
    }
    return isValidFileType && isValidSize;
  };

  const beforeUpload = (file: any) => {
    const tempFile = file;
    const extensionRegExp = /(?:\.([^.]+))?$/;
    const [nameWithoutExtension] = file.name.split(extensionRegExp);
    tempFile.nameWithoutExtension = nameWithoutExtension;
    const isValid = isValidDocument(file);
    if (!isValid) {
      return Upload.LIST_IGNORE;
    }
    if (isValid) {
      handleUploadDocument(tempFile);
    }
    return false;
  };

  const handleDeleteDocument = () => {
    dispatch(Creators.resetUploadDocumentURL());
    setFileList(() => undefined);
    // @ts-ignore
    onChange(undefined);
  };

  const handleOnPreview = (file: UploadFile) => {
    dispatch(Creators.getSignedUrlForDocumentRequest({
      fileKey: file.url,
      onSuccess: (data: any) => {
        window.open(data?.url, '_blank');
      },
    }));
  };

  return (
    <Upload
      action=""
      disabled={disabled}
      maxCount={1}
      accept={ALLOWED_TYPES}
      beforeUpload={beforeUpload}
      fileList={fileList}
      onRemove={handleDeleteDocument}
      onPreview={handleOnPreview}
    >
      <Button
        type={fileList ? 'default' : 'primary'}
        className={className}
        disabled={disabled}
        icon={<UploadOutlined />}
        loading={isDocumentPending}
      >
        {t('assetManagement:DOCUMENT.CLICK_TO_UPLOAD')}
      </Button>
    </Upload>
  );
};

export default S3Upload;
