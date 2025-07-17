import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Modal, Row, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { isEmpty } from 'lodash';

import { Creators as ToastCreators } from '@shared/redux/actions/toast';

import {
  BULK_CREATION_CSV_CONTENT, BULK_CREATION_CSV_HEADER, BULK_UPLOAD_CSV_HEADER,
  BULK_UPLOAD_CSV_CONTENT, BULK_OPERATION_TYPES,
} from '@app/pages/Fleet/Vehicle/List/constant';

import { newVehicleListTableColumns, activeListTableColumns } from './config';
import { Creators } from '../../redux/action';
import useStyles from './styles';

import AntTableV2 from '@shared/components/UI/AntTableV2';

import { t } from '@shared/i18n';
import { vehicleListSelector } from '../../redux/selector';
import { removeEmptyFields } from './utils';

const VehicleCsvFileUploader = props => {
  const {
    okText,
    modalTitle,
    buttonText,
  } = props;
  const dispatch = useDispatch();
  const isPending = useSelector(vehicleListSelector.getBulkUploadIsPending);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(BULK_OPERATION_TYPES.CREATION);
  const [csvData, setCsvData] = useState([]);
  const [file, setFile] = useState(null);
  const classes = useStyles();
  const reader = new FileReader();
  const fileInputRef = useRef(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setCsvData([]);
    setFile();
  };

  const handleOk = () => {
    dispatch(Creators.bulkVehicleUpdateCreateRequest({ callType: +activeTab, vehicles: removeEmptyFields(csvData) }));
    setCsvData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    closeModal();
  };

  const handleOnError = msg => {
    const message = msg || t('error:CSV_ERROR');
    dispatch(ToastCreators.error({ message }));
  };

  const handleRemoveFile = () => {
    setFile(null);
    setCsvData(null);
  };

  const handleOnFileLoad = (csv, fileTemp) => {
    if (isEmpty(csv)) {
      dispatch(ToastCreators.error({ message: t('marketVehicle:UPLOAD.WARNING.NO_FILE') }));
      handleRemoveFile();
      setCsvData(null);
    }
    else {
      setFile(fileTemp);
      setCsvData(csv);
      dispatch(
        ToastCreators.success({ message: t('marketVehicle:UPLOAD.WARNING.READY_TO_IMPORT') }),
      );
    }
  };

  const handleFileUpload = event => {
    const fileTemp = event.target.files[0];

    if (fileTemp?.type !== 'text/csv') {
      handleOnError(t('marketVehicle:UPLOAD.WARNING.UNSUPPORTED_FILE_TYPE'));
      return;
    }
    if (fileTemp.size === 0) {
      handleOnError(t('marketVehicle:UPLOAD.WARNING.NO_FILE'));
      return;
    }

    reader.onload = e => {
      const text = e.target.result.trim();
      const rows = text.split('\n');
      const pattern = /\r$/;
      const regex = new RegExp(pattern);
      const allRows = rows.map(row => row.split(','));
      const headerRow = allRows.shift();
      const csvHeaders = headerRow.map(item => item.toString().replace(/\r$/, ''));
      const data = allRows.map(row => {
        return row.reduce((obj, value, index) => {
          const csvRowItem = obj;
          if (regex.test(value)) {
            csvRowItem[csvHeaders[index]] = value.toString().replace(/\r$/, '');
          }
          else {
            csvRowItem[csvHeaders[index]] = value;
          }
          return csvRowItem;
        }, {});
      });
      handleOnFileLoad(data, fileTemp);
    };

    reader.onerror = handleOnError;
    reader.readAsText(fileTemp);
  };

  const handleClick = e => {
    e.target.value = null;
  };

  const generateCsvFile = (header, exampleData, fileName) => {
    const csvHeaders = header.join(',');
    const csvExamples = exampleData.join(',');
    const csvContent = `${csvHeaders}\n${csvExamples}\n`;
    const encodedUri = encodeURI(csvContent);

    const link = document.createElement('a');
    link.setAttribute('href', `data:text/csv;charset=utf-8,${encodedUri}`);
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadActiveInactiveTemplate = () => {
    generateCsvFile(BULK_UPLOAD_CSV_HEADER, BULK_UPLOAD_CSV_CONTENT, 'activeInactiveVehicleList');
  };

  const handleVehicleListTemplate = () => {
    generateCsvFile(BULK_CREATION_CSV_HEADER, BULK_CREATION_CSV_CONTENT, 'newVehicleList');
  };

  const handleChangeTab = e => {
    setCsvData([]);
    setFile();
    setActiveTab(e);
  };

  const tabItems = [
    {
      tabName: t('marketVehicle:VEHICLE_LIST_TEMPLATE'),
      key: BULK_OPERATION_TYPES.CREATION,
    },
    {
      tabName: t('marketVehicle:ACTIVE_INACTIVE_TEMPLATE'),
      key: BULK_OPERATION_TYPES.STATUS_UPDATE,
    },
  ];

  return (
    <>
      <Button
        onClick={showModal}
        disabled={isPending}
        type="primary"
        icon={<PlusOutlined />}
      >
        {buttonText}
      </Button>
      <Modal
        title={modalTitle || t('global:UPLOAD_FILE')}
        centered
        className={classes.modal}
        visible={isModalVisible}
        okText={okText || t('global:UPLOAD')}
        onOk={handleOk}
        okButtonProps={csvData?.length > 0}
        onCancel={closeModal}
        width="70vw"
      >
        <Row gutter={[0, 16]}>
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
                  onChange={handleFileUpload}
                  onClick={handleClick}
                  accept=".csv"
                />
                <div className={classes.value}>{file ? file.name : ''}</div>
              </label>

              <Button danger disabled={!file} onClick={handleRemoveFile}>
                {t('REMOVE')}
              </Button>
            </div>
          </Col>
        </Row>

        <Tabs defaultActiveKey={activeTab} onChange={e => handleChangeTab(e)}>
          {tabItems.map(tabItem => (
            <Tabs.TabPane tab={tabItem.tabName} key={tabItem.key}>
              <Row className={classes.tabItemContainer} gutter={[8, 8]}>
                <Col span={24}>
                  {tabItem.key === 2 ? <Button onClick={handleDownloadActiveInactiveTemplate}>{t('marketVehicle:DOWNLOAD_LIST_TEMPLATE')}</Button>
                    : <Button onClick={handleVehicleListTemplate}>{t('marketVehicle:DOWNLOAD_VEHICLE_TEMPLATE')}</Button>}
                </Col>
                <Col span={24}>
                  <AntTableV2
                    data={csvData || []}
                    columns={tabItem.key === 2 ? activeListTableColumns({ t }) : newVehicleListTableColumns({ t })}
                    loading={false}
                  />
                </Col>
              </Row>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Modal>
    </>
  );
};

export default VehicleCsvFileUploader;
