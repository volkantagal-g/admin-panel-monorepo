import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Button, Space, DatePicker, PageHeader, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { Creators } from '../../redux/actions';
import { uploadFranchiseEarningsSelector } from '../../redux/selectors';
import { CSV_TYPES, DATE_FORMAT, EXCEL_PARSE_TYPE } from '../../constants';
import useStyles from './styles';

const { Text } = Typography;

const Form = ({ earningType }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { t } = useTranslation('franchiseEarningsPage');

  const [date, setDate] = useState();
  const [data, setData] = useState();
  const [file, setFile] = useState(null);
  const [selectedEarningType, setSelectedEarningType] = useState();
  const inputRef = useRef();

  const isPending = useSelector(uploadFranchiseEarningsSelector.getIsPending);
  const isSuccess = useSelector(uploadFranchiseEarningsSelector.getIsSuccess);

  const handleRemoveFile = () => {
    setDate(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
      setFile(null);
      setData(null);
      setSelectedEarningType(null);
    }
  };

  useEffect(() => {
    if (!isPending && isSuccess && earningType === selectedEarningType) {
      handleRemoveFile();
    }
  }, [isPending, isSuccess, earningType, selectedEarningType]);

  const handleUpload = () => {
    const { name, type } = file;
    const formattedDate = date?.format(DATE_FORMAT);
    const splitedFileName = name?.split('.');
    const fileName = earningType === EXCEL_PARSE_TYPE.GETIR_FINANCE ?
      `${splitedFileName[0]}.${splitedFileName[1]}` : `${splitedFileName[0]}_${formattedDate}.${splitedFileName[1]}`;
    setSelectedEarningType(earningType);
    dispatch(Creators.uploadFranchiseEarningsRequest({ data, fileName, contentType: type, earningType }));
  };

  const handleOpenDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOnError = msg => {
    const message = msg || t('error:CSV_ERROR');
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

  const isDisable = isPending || !date || !file;

  const isDisabledGetirFinance = isPending || !file;

  return (
    <Space
      direction="vertical"
      className={classes.container}
    >
      <Row gutter={[0, 16]}>
        <Col span={24}>
          <PageHeader
            className="p-0 page-title"
            title={t(`UPLOAD.PAGE_TITLE.${earningType?.toUpperCase()}`)}
          />
        </Col>
        <Col span={24}>
          <input
            key="0"
            ref={inputRef}
            type="file"
            data-testid={earningType}
            className={classes.fileInput}
            onChange={handleFileChange}
            accept={CSV_TYPES}
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
              disabled={!file}
              onClick={handleRemoveFile}
            >
              {t('global:REMOVE')}
            </Button>
          </div>
        </Col>
        {!(earningType === EXCEL_PARSE_TYPE.GETIR_FINANCE) && (
          <Col span={24}>
            <Text size="small">{t('UPLOAD.DATE')}:*</Text>
            <DatePicker
              size="large"
              format={DATE_FORMAT}
              picker="month"
              value={date}
              allowClear={false}
              onChange={setDate}
              className={classes.datePicker}
            />
          </Col>
        )}
        <Col span={24} className={classes.uploadButton}>
          <Button
            size="large"
            type="primary"
            disabled={earningType === EXCEL_PARSE_TYPE.GETIR_FINANCE ? (isDisabledGetirFinance || isPending) : (isDisable || isPending)}
            onClick={handleUpload}
          >
            {t('global:IMPORT')}
          </Button>
        </Col>
      </Row>
    </Space>
  );
};

export default Form;
