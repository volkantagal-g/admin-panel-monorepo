import { CloudUploadOutlined, DeleteOutlined, PaperClipOutlined, UploadOutlined } from '@ant-design/icons';
import { Alert, Button, Col, Modal, Row, Table, Tooltip, Typography } from 'antd';
import _ from 'lodash';
import { createRef, useState } from 'react';
import { CSVReader } from 'react-papaparse';
import { toast } from 'react-toastify';

import { t } from '@shared/i18n';
import { getBase64 } from '@shared/utils/common';
import useStyles from './styles';
import { MIME_TYPE } from '@shared/shared/constants';

const { Paragraph } = Typography;

const CsvImporter = props => {
  const {
    withoutHeader,
    onOkayClick,
    exampleCsv,
    hasNestedHeaderKeys,
    importButtonText,
    importIconButtonTooltipText,
    isVisible,
    disabled,
    warningText,
    modalProps = {},
    handleShowModal = () => {},
    exampleTableProps = {},
    isButton = false,
    loading = false,
    accept = `${MIME_TYPE.CSV}, ${MIME_TYPE.XLS}`,
    isExcel = false,
    modalTitleForCSV,
    incrementalParsing = false,
    buttonType = 'default',
    tableLayout = 'fixed',
  } = props;
  const classes = useStyles();
  const importButtonRef = createRef();
  const [isModalVisible, setIsModalVisible] = useState(isVisible);
  const [loadedCsvData, setLoadedCsvData] = useState();
  const [csvError, setCsvError] = useState();
  const [loadedFile, setLoadedFile] = useState();

  const handleRemoveFile = () => {
    setLoadedCsvData();
    setLoadedFile();
  };

  const showModal = () => {
    // reason is handling error messages or actions even if button disabled
    handleShowModal();

    if (disabled) return;
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    handleRemoveFile();
  };

  const openFileUploadDialog = event => {
    if (importButtonRef.current) {
      importButtonRef.current.open(event);
    }
  };

  const handleError = error => {
    setCsvError(error);
  };

  const convertToNestedData = csvData => {
    const newData = [];
    csvData.forEach(item => {
      const newItem = {};
      const keys = Object.keys(item);
      keys.forEach(key => {
        const value = _.get(item, [key], '');
        _.set(newItem, key.split('-'), value);
      });
      newData.push(newItem);
    });
    return newData;
  };

  const getModifiedData = (data = []) => {
    const result = { data: [] };
    result.data = data.map(item => {
      return item.data;
    });
    if (hasNestedHeaderKeys) {
      result.data = convertToNestedData(result.data);
    }

    const headersInUploadedData = data?.[0]?.meta?.fields;

    result.duplicateColumnsExistAndOverwritten = headersInUploadedData
      ? headersInUploadedData.length !== _.uniq(headersInUploadedData)?.length
      : false;

    return result;
  };

  const handleFileLoad = (data, file) => {
    const csvData = getModifiedData(data);
    setLoadedCsvData(csvData);
    setLoadedFile(file);
  };

  const handleOk = () => {
    if (csvError) {
      // TODO: open task when you get this csvError
      // and write down the error to task
      toast.error(t('error:CSV_ERROR'));
    }
    else {
      getBase64(loadedFile, loadedBase64File => {
        onOkayClick(loadedCsvData, loadedFile, loadedBase64File);
        closeModal();
      });
    }
  };

  const getFormattedExampleCsvTable = _exampleCsv => {
    const keysString = Object.keys(_exampleCsv || []);
    const columns = keysString.map(key => {
      return {
        title: key,
        dataIndex: key,
        key,
      };
    });

    Object.entries(_exampleCsv).forEach(([key, value]) => {
      if (_.isBoolean(value)) {
        _.set(_exampleCsv, key, JSON.stringify(value));
      }
    });

    return (
      <div className={classes.container}>
        <Table
          dataSource={[_exampleCsv]}
          columns={columns}
          scroll={{ x: 520 }}
          size="small"
          className={classes.table}
          pagination={false}
          showHeader
          footer={null}
          tableLayout={tableLayout}
          {...exampleTableProps}
        />
      </div>
    );
  };
  const incrementalParseConfig = {
    // papaparse will not chunk by default unless you specify a callback
    chunk: () => {},
    chunkSize: 1024 * 1024,
  };

  const papaparseConfig = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    ...(incrementalParsing ? incrementalParseConfig : {}),
  };

  const papaparseConfigWithoutHeader = {
    header: false,
    dynamicTyping: true,
    skipEmptyLines: true,
    ...(incrementalParsing ? incrementalParseConfig : {}),
  };

  const csvTitle = modalTitleForCSV || t('global:UPLOAD_CSV');

  return (
    <>
      <Modal
        title={isExcel ? t('global:UPLOAD_EXCEL') : csvTitle}
        centered
        visible={isModalVisible}
        okText={t('global:UPLOAD')}
        onOk={handleOk}
        okButtonProps={{ disabled: !loadedFile }}
        onCancel={closeModal}
        {...modalProps}
      >
        {
          warningText && (
            <Paragraph>
              <Alert message={warningText} type="warning" />
            </Paragraph>
          )
        }
        {
          exampleCsv && (
            <>
              <Paragraph strong>
                {isExcel ? t('global:EXAMPLE_EXCEL') : t('global:EXAMPLE_CSV')}
              </Paragraph>
              {getFormattedExampleCsvTable(exampleCsv)}
            </>
          )
        }
        <Button
          icon={<UploadOutlined />}
          onClick={openFileUploadDialog}
          disabled={disabled}
        >
          {t('global:CHOOSE_FILE')}
        </Button>
        {loadedFile && loadedFile.name && (
          <Row className="mt-3" align="middle" gutter={[8]}>
            <Col>
              <PaperClipOutlined />
            </Col>
            <Col>
              {loadedFile && loadedFile.name}
            </Col>
            <Col>
              <Button
                shape="circle"
                danger
                type="text"
                icon={<DeleteOutlined />}
                onClick={handleRemoveFile}
              />
            </Col>
          </Row>
        )}
      </Modal>
      <CSVReader
        ref={importButtonRef}
        onFileLoad={handleFileLoad}
        config={withoutHeader ? papaparseConfigWithoutHeader : papaparseConfig}
        onError={handleError}
        onRemoveFile={handleRemoveFile}
        noClick
        noDrag
        noProgressBar
        accept={accept}
      >
        {() => {
          return (
            <>
              {importButtonText && (
                isButton ? (
                  <Button
                    type={buttonType}
                    icon={<UploadOutlined />}
                    onClick={showModal}
                    loading={loading}
                    disabled={disabled}
                  >
                    {importButtonText}
                  </Button>
                )
                  : (
                    <Row
                      key="1"
                      onClick={event => {
                        event.preventDefault();
                        showModal();
                      }}
                    >
                      {importButtonText}
                    </Row>
                  )
              )}
              {!importButtonText && (
                <Tooltip
                  key="2"
                  placement="bottomRight"
                  title={importIconButtonTooltipText || t('global:IMPORT_CSV')}
                >
                  <CloudUploadOutlined disabled={disabled} className={classes.iconButton} onClick={showModal} />
                </Tooltip>
              )}
            </>
          );
        }}
      </CSVReader>
    </>
  );
};

export default CsvImporter;
