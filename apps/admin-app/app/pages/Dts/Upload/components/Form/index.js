import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Space, PageHeader, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { Creators } from '../../redux/actions';
import { uploadDTSLogsSelector } from '../../redux/selectors';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { CSV_TYPES } from '../../constants';
import useStyles from './styles';

const Form = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { t } = useTranslation('dtsSummaryPage');

  const [data, setData] = useState();
  const [file, setFile] = useState(null);

  const isPending = useSelector(uploadDTSLogsSelector.getIsPending);
  const isDisabled = isPending || !file;

  const handleUploadFile = () => {
    const { name, type } = file;
    dispatch(
      Creators.uploadDTSLogsRequest({
        data,
        contentType: type,
        fileName: name,
      }),
    );
  };

  const handleOnError = msg => {
    const message = msg || t('error:CSV_ERROR');
    dispatch(ToastCreators.error({ message }));
  };

  const handleRemoveFile = () => {
    setFile(null);
    setData(null);
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
      dispatch(
        ToastCreators.success({ message: t('UPLOAD.WARNING.READY_TO_IMPORT') }),
      );
    }
  };

  const handleFileChange = e => {
    const fileTemp = e?.target?.files?.[0];
    if (fileTemp?.type !== CSV_TYPES) {
      handleOnError(t('UPLOAD.WARNING.UNSUPPORTED_FILE_TYPE'));
      return;
    }
    if (fileTemp.size === 0) {
      handleOnError(t('UPLOAD.WARNING.NO_FILE'));
      return;
    }
    const reader = new FileReader();
    reader.onload = event => {
      const readerData = event?.target?.result;
      handleOnFileLoad(readerData, fileTemp);
    };

    reader.onerror = handleOnError;
    reader.readAsDataURL(fileTemp);
  };
  const handleClick = e => {
    e.target.value = null;
  };

  return (
    <Space direction="vertical" className={classes.container}>
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <PageHeader title={t('dtsSummaryPage:UPLOAD_DTS_LOGS_TITLE')} />
        </Col>
        <Col span={24}>
          <div className={classes.wrapper}>
            <label className={classes.label} htmlFor="upload-input">
              <span className={classes.span}>{t('SELECT_FILE')}</span>
              <input
                key="0"
                id="upload-input"
                type="file"
                className={classes.uploadInput}
                placeholder={t('dtsSummaryPage:UPLOAD_PLACEHOLDER')}
                onChange={handleFileChange}
                onClick={handleClick}
                accept={CSV_TYPES}
              />
              <div className={classes.value}>{file ? file.name : ''}</div>
            </label>

            <Button danger disabled={isDisabled} onClick={handleRemoveFile}>
              {t('REMOVE')}
            </Button>
          </div>
        </Col>
        <Col span={24} className={classes.uploadButton}>
          <Button
            size="large"
            type="primary"
            disabled={isDisabled}
            onClick={handleUploadFile}
          >
            {t('IMPORT')}
          </Button>
        </Col>
      </Row>
    </Space>
  );
};

export default Form;
