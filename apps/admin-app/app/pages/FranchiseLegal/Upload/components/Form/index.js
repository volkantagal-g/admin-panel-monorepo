import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Space, PageHeader, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '../../redux/actions';
import { uploadFranchiseLegalSelector } from '../../redux/selector';
import useStyles from './styles';
import { PDF_FILE_TYPE } from '../../constants';

const UploadForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { t } = useTranslation('franchiseLegalPage');

  const [data, setData] = useState();
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const isPending = useSelector(uploadFranchiseLegalSelector.getIsPending);
  const isSuccess = useSelector(uploadFranchiseLegalSelector.getIsSuccess);

  const handleRemoveFile = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setFile(null);
      setData(null);
    }
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      handleRemoveFile();
    }
  }, [isPending, isSuccess]);

  const handleUpload = () => {
    const { name, type } = file;
    const splitedFileName = name?.split('.');
    const fileName = `${splitedFileName[0]}_.${splitedFileName[1]}`;

    dispatch(Creators.uploadFranchiseLegalRequest({ data, fileName, contentType: type }));
  };

  const handleOpenDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnError = msg => {
    const message = msg || t('error:PDF_ERROR');
    dispatch(ToastCreators.error({ message }));
  };

  const handleOnFileLoad = (csv, fileTemp) => {
    if (isEmpty(csv)) {
      dispatch(ToastCreators.error({ message: t('UPLOAD.WARNING.NO_FILE') }));
      handleRemoveFile();
      setData(null);
    }
    else {
      setFile(fileTemp);
      setData(csv);
      dispatch(ToastCreators.success({ message: t('UPLOAD.WARNING.READY_TO_IMPORT') }));
    }
  };

  const handleFileChange = e => {
    const fileTemp = e?.target?.files?.[0];
    if (fileTemp.size === 0) {
      handleOnError(t('UPLOAD.WARNING.NO_FILE'));
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const result = event?.target?.result;
      handleOnFileLoad(result, fileTemp);
    };

    reader.onerror = handleOnError;
    reader.readAsDataURL(fileTemp);
  };

  const isDisable = isPending || !file;

  return (
    <Space
      direction="vertical"
      className={classes.container}
    >
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <PageHeader
            className="p-0 page-title"
            title={t('UPLOAD.PAGE_TITLE')}
          />
        </Col>
        <Col span={24}>
          <input
            key="0"
            ref={inputRef}
            type="file"
            data-testid="FRANCHISE_PDF_UPLOAD"
            className={classes.fileInput}
            onChange={handleFileChange}
            accept={PDF_FILE_TYPE}
          />
          <div className={classes.wrapper}>
            <Button
              type="dashed"
              size="large"
              onClick={handleOpenDialog}
            >
              {t('global:SELECT_FILE')}
            </Button>
            <input
              readOnly
              type="text"
              value={file ? file.name : ''}
              className={classes.fileName}
            />
            <Button
              danger
              disabled={!file || isPending}
              onClick={handleRemoveFile}
            >
              {t('global:REMOVE')}
            </Button>
          </div>
        </Col>

        <Col span={24} className={classes.uploadButton}>
          <Button
            size="large"
            type="primary"
            disabled={isDisable || isPending}
            onClick={handleUpload}
          >
            {t('global:IMPORT')}
          </Button>
        </Col>
      </Row>
    </Space>
  );
};

export default UploadForm;
