import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Space, PageHeader, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { warehouseSegmentMatchingSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { CSV_TYPES } from '../../../constants';
import useStyles from './styles';

const Form = ({ formType }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  
  const { t } = useTranslation(['warehouseSegmentPage', 'global']);

  const [data, setData] = useState();
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const uploadWarehouseSegmentMatching = { isPending: useSelector(warehouseSegmentMatchingSelector.getIsPending) };

  const handleUploadFile = () => {
    const { name ,type } = file;
    dispatch(Creators.uploadWarehouseSegmentMatchingRequest({
      data,
      contentType: type,
      fileName: name,
      segmentType: formType,
    }));
  };

  const handleOpenDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = e => {
    const fileTemp = e?.target?.files?.[0];
    if(fileTemp.type !== CSV_TYPES) {
      handleOnError(t('UPLOAD.WARNINGS.UNSUPPORTED_FILE_TYPE'));
      return;     
    }
    if (fileTemp.size === 0) {
      handleOnError(t('UPLOAD.WARNINGS.NO_FILE'));
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const data = e?.target?.result;
      handleOnFileLoad(data, fileTemp);
    };

    reader.onerror = handleOnError;
    reader.readAsDataURL(fileTemp);
  };

  const handleOnFileLoad = (csv, fileTemp) => {
    if (isEmpty(csv)) {
      dispatch(ToastCreators.error({ message: t('UPLOAD.WARNINGS.NO_FILE') }));
      handleRemoveFile();
      setData(null);
    }
    else {
      setFile(fileTemp);
      setData(csv);
      dispatch(ToastCreators.success({ message: t('UPLOAD.WARNINGS.READY_TO_IMPORT') }));
    }
  };

  const handleOnError = msg => {
    const message = msg || t('error:CSV_ERROR');
    dispatch(ToastCreators.error({ message }));
  };

  const handleRemoveFile = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setFile(null);
      setData(null);
    }
  };

  const isDisable = uploadWarehouseSegmentMatching.isPending || !file;

  return (
    <Space
      direction="vertical"
      className={classes.container}
    >
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <PageHeader
            className="p-0 page-title"
            title={t(`UPLOAD.${formType}.TITLE`)}
          />
        </Col>
        <Col span={24}>
          <input
            key="0"
            ref={inputRef}
            type="file"
            className={classes.fileInput}
            onChange={handleFileChange}
            accept={CSV_TYPES}
          />
          <div className={classes.wrapper}>
            <Button
              type="dashed"
              size="large"
              onClick={handleOpenDialog}
              disabled={uploadWarehouseSegmentMatching.isPending}
            >
              {t('SELECT_FILE')}
            </Button>
            <input
              readOnly
              type="text"
              value={file ? file.name : ''}
              className={classes.fileName}
            />
            <Button 
              danger 
              disabled={isDisable}
              onClick={handleRemoveFile}
            >
              {t('REMOVE')}
            </Button>
          </div>
        </Col>
        <Col span={24} className={classes.uploadButton}>
          <Button
            size="large"
            type="primary"
            disabled={isDisable}
            onClick={handleUploadFile}
          >
            {t('IMPORT')}
          </Button>
        </Col>
      </Row>
    </Space>
  );
};

Form.propTypes = { formType: PropTypes.string };

export default Form;
