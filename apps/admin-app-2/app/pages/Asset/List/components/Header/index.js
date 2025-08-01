import { PageHeader, Col, Row, Button, Modal, Typography, Alert, Dropdown, Menu } from 'antd';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';

import * as Yup from 'yup';

import { useState } from 'react';

import PageTitleHeader from '@shared/components/UI/PageTitleHeader';
import { ROUTE } from '@app/routes';
import useStyles from './styles';
import { Creators } from '../../redux/actions';

import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { employeeAssetListSelector, bulkInsertAssetsSelector, bulkUpdateAssetsSelector } from '../../redux/selectors';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { toFakeLocalDate } from '@shared/utils/dateHelper';
import {
  ASSET_TYPES,
  ASSET_ASSIGNMENT_STATUSES,
  ASSET_CATEGORIES,
  ASSET_VERSIONS,
  DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES,
  ASSET_TYPES_BY_CATEGORY,
  ASSET_COUNTRIES,
  ASSET_CITIES,
  BRANDS_BY_ASSET_TYPES,
  ASSET_DEVICE_STATUSES,
  ASSET_RAM_OPTIONS,
  ASSET_RESOLUTION_OPTIONS,
  ASSET_CHIP_TYPE_OPTIONS,
  ASSET_DEVICE_STATUS_AND_ASSIGNMENT_STATUS_RELATIONSHIP,
  BULK_UPLOAD_IT_ASSETS_WARNING_MESSAGE_DOC_LINK,
  ASSET_DISPLAY_SIZE_OPTIONS,
} from '@app/pages/Asset/constants';
import { isNullOrEmpty } from '@shared/utils/common';

const { Paragraph } = Typography;

const Header = ({ filters }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(['assetPage', 'global']);
  const title = t('global:PAGE_TITLE.ASSET.LIST');
  const { Can } = usePermission();
  const isPending = useSelector(employeeAssetListSelector.getExcelDownloadIsPending);
  const isBulkInsertAssetsPending = useSelector(bulkInsertAssetsSelector.isPending);
  const isBulkUpdateAssetsPending = useSelector(bulkUpdateAssetsSelector.isPending);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [uploadErrorMessages, setUploadErrorMessages] = useState([]);
  const [isBulkUpdateErrorModalVisible, setIsBulkUpdateErrorModalVisible] = useState(false);
  const [bulkUpdateErrorMessages, setBulkUpdateErrorMessages] = useState([]);

  const handleExcelDownLoad = () => {
    dispatch(Creators.getEmployeeAssetListExcelDownloadRequest({ filters }));
  };

  const handleCurrentEmployeeAssetReportDownLoad = () => {
    dispatch(Creators.getCurrentEmployeeAssetReportDownloadRequest({ country: filters.country }));
  };

  const handleFormerEmployeeAssetReportDownLoad = () => {
    dispatch(Creators.getFormerEmployeeAssetReportDownloadRequest({ country: filters.country }));
  };

  const handleErrorModalClose = () => {
    setIsErrorModalVisible(false);
    setIsBulkUpdateErrorModalVisible(false);
  };

  const isValidCellData = data => !isNullOrEmpty(data) && data !== '#N/A' && data !== '#REF!';

  const getAssetSchema = (isForBulkUpdate = false) => Yup.object()
    .shape({
      ...{ assetId: isForBulkUpdate ? Yup.string().required() : undefined },
      assetCategory: Yup.number().required().equals([ASSET_CATEGORIES.IT]),
      name: Yup.string().required(),
      deviceType: Yup.number().required().oneOf(Object.values(ASSET_TYPES_BY_CATEGORY[ASSET_CATEGORIES.IT] || {})),
      brand: Yup.string().when('deviceType', (deviceType, schema) => {
        return schema.required().oneOf(Object.values(BRANDS_BY_ASSET_TYPES[deviceType] || {}));
      }),
      country: Yup.string().required().oneOf(Object.values(ASSET_COUNTRIES)),
      city: Yup.string().when('country', (country, schema) => {
        if (ASSET_CITIES[country]) {
          return schema.required().oneOf(Object.values(ASSET_CITIES[country] || {}));
        }
        return schema;
      }),
      deviceSerialNumber: Yup.string().required(),
      invoiceNumber: Yup.string().required(),
      invoiceDate: Yup.date().required(),
      warrantyEndDate: Yup.date().required(),
      supplier: Yup.string().required(),
      assignmentStatus: Yup.number().oneOf(Object.values(ASSET_ASSIGNMENT_STATUSES)),
      deviceStatus: Yup.number().required().oneOf(Object.values(ASSET_DEVICE_STATUSES)),
      deviceModel: Yup.string().required(),
      storage: Yup.string().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.storage.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      year: Yup.string(),
      mdmInstalled: Yup.boolean(),
      isRental: Yup.boolean(),
      isBrandNew: Yup.boolean(),
      rentalStartDate: Yup.date().nullable().when('isRental', (isRental, schema) => {
        if (isRental) {
          return schema.required();
        }
        return schema;
      }),
      rentalEndDate: Yup.date().nullable().when('isRental', (isRental, schema) => {
        if (isRental) {
          return schema.required();
        }
        return schema;
      }),
      displaySize: Yup.number().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.displaySize.has(+deviceType)) {
          return schema.required().oneOf(ASSET_DISPLAY_SIZE_OPTIONS.map(o => o.value));
        }
        return schema;
      }),
      imei1: Yup.string().optional().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.imei1.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      imei2: Yup.string().optional().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.imei2.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      refreshRate: Yup.string().optional().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.refreshRate.has(+deviceType)) {
          return schema.required();
        }
        return schema;
      }),
      chipType: Yup.string().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.chipType.has(+deviceType)) {
          return schema.required().oneOf(ASSET_CHIP_TYPE_OPTIONS.map(chipTypeOption => chipTypeOption.value));
        }
        return schema;
      }),
      ram: Yup.number().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.ram.has(+deviceType)) {
          return schema.required().oneOf(ASSET_RAM_OPTIONS.map(ramOption => ramOption.value));
        }
        return schema;
      }),
      resolution: Yup.string().when('deviceType', (deviceType, schema) => {
        if (DEVICE_CONFIGS_MAPPING_WITH_NEEDED_DEVICES.resolution.has(+deviceType)) {
          return schema.required().oneOf(ASSET_RESOLUTION_OPTIONS.map(resolutionOption => resolutionOption.value));
        }
        return schema;
      }),
      numberOfMacAddresses: Yup.number().min(0).max(10),
      macAddresses: Yup.array().when('numberOfMacAddresses', (numberOfMacAddresses, schema) => {
        if (numberOfMacAddresses > 0) {
          return schema
            .required()
            .of(Yup.string())
            .min(numberOfMacAddresses);
        }
        return schema;
      }),
    });

  const formatErrorMessage = error => `${t('N_ERRORS_OCCURED', { count: error.inner?.length })}.\n${error.inner?.map(
    eachError => `${eachError.path}: ${eachError.message}`,
  ).join('\n')}`;

  const formatCSVDataToAssetObject = (csvData, isForBulkUpdate = false) => {
    const formattedData = [];
    const errorMessages = [];
    setUploadErrorMessages([]);
    setBulkUpdateErrorMessages([]);
    for (let i = 0; i < csvData.length; i += 1) {
      const row = csvData[i];
      const {
        ASSET_ID, ASSET_CATEGORY_VALUE, NAME_OF_ASSET, DEVICE_TYPE_VALUE, BRAND,
        BARCODE, DEVICE_SERIAL_NO, INVOICE_NO, INVOICE_DATE, SUPPLIER, COUNTRY_VALUE,
        CITY, WARRANTY_END_DATE, COMMENTS, DEVICE_STATUS_VALUE,
        DEVICE_MODEL, LAPTOP_STORAGE, LAPTOP_YEAR,
        LAPTOP_DISPLAY_SIZE, LAPTOP_CHIP, LAPTOP_RAM_VALUE, CELLPHONE_STORAGE,
        CELLPHONE_IMEI1, CELLPHONE_IMEI2, TABLET_STORAGE, TABLET_DISPLAY_SIZE, TABLET_IMEI1,
        TABLET_IMEI2, MONITOR_DISPLAY_SIZE, MONITOR_REFRESH_RATE, MONITOR_RESOLUTION, MDM_INSTALLED,
        IS_RENTAL, RENTAL_START_DATE, RENTAL_END_DATE, BRAND_NEW, NUMBER_OF_MAC_ADDRESSES, MAC_ADDRESSES,
      } = row;
      let storageValue;
      if (DEVICE_TYPE_VALUE === ASSET_TYPES.LAPTOP) {
        storageValue = LAPTOP_STORAGE;
      }
      else if (DEVICE_TYPE_VALUE === ASSET_TYPES.TABLET) {
        storageValue = TABLET_STORAGE;
      }
      else if (DEVICE_TYPE_VALUE === ASSET_TYPES.CELL_PHONE) {
        storageValue = CELLPHONE_STORAGE;
      }

      let displaySizeValue;
      if (DEVICE_TYPE_VALUE === ASSET_TYPES.LAPTOP) {
        displaySizeValue = Math.ceil(parseFloat(LAPTOP_DISPLAY_SIZE));
      }
      else if (DEVICE_TYPE_VALUE === ASSET_TYPES.TABLET) {
        displaySizeValue = Math.ceil(parseFloat(TABLET_DISPLAY_SIZE));
      }
      else if (DEVICE_TYPE_VALUE === ASSET_TYPES.MONITOR) {
        displaySizeValue = Math.ceil(parseFloat(MONITOR_DISPLAY_SIZE));
      }
      let imei1Value;
      let imei2Value;
      if (DEVICE_TYPE_VALUE === ASSET_TYPES.TABLET) {
        imei1Value = TABLET_IMEI1;
        imei2Value = TABLET_IMEI2;
      }
      else if (DEVICE_TYPE_VALUE === ASSET_TYPES.CELL_PHONE) {
        imei1Value = CELLPHONE_IMEI1;
        imei2Value = CELLPHONE_IMEI2;
      }
      const formattedRowData = {
        ...(isValidCellData(ASSET_ID) ? { assetId: ASSET_ID } : undefined),
        ...(isValidCellData(ASSET_CATEGORY_VALUE) ? { assetCategory: ASSET_CATEGORY_VALUE } : undefined),
        ...(isValidCellData(NAME_OF_ASSET) ? { name: NAME_OF_ASSET } : undefined),
        ...(isValidCellData(DEVICE_TYPE_VALUE) ? { deviceType: DEVICE_TYPE_VALUE } : undefined),
        ...(isValidCellData(BRAND) ? { brand: BRAND } : undefined),
        ...(isValidCellData(BARCODE) ? { barcode: BARCODE.toString() } : undefined),
        ...(isValidCellData(COUNTRY_VALUE) ? { country: COUNTRY_VALUE.toLowerCase() } : undefined),
        ...(isValidCellData(CITY) ? { city: CITY } : undefined),
        ...(isValidCellData(DEVICE_SERIAL_NO) ? { deviceSerialNumber: DEVICE_SERIAL_NO.toString() } : undefined),
        ...(isValidCellData(INVOICE_NO) ? { invoiceNumber: INVOICE_NO.toString() } : undefined),
        ...(isValidCellData(INVOICE_DATE) ? { invoiceDate: toFakeLocalDate(INVOICE_DATE).toISOString() } : undefined),
        ...(isValidCellData(WARRANTY_END_DATE) ? { warrantyEndDate: toFakeLocalDate(WARRANTY_END_DATE).toISOString() } : undefined),
        ...(isValidCellData(SUPPLIER) ? { supplier: SUPPLIER } : undefined),
        ...(isValidCellData(COMMENTS) ? { remarks: COMMENTS } : undefined),
        ...(isValidCellData(DEVICE_STATUS_VALUE) ? { deviceStatus: DEVICE_STATUS_VALUE } : undefined),
        ...(isValidCellData(DEVICE_MODEL) ? { deviceModel: DEVICE_MODEL.toString() } : undefined),
        ...(isValidCellData(storageValue) ? { storage: storageValue.toString() } : undefined),
        ...(isValidCellData(LAPTOP_YEAR) ? { year: LAPTOP_YEAR.toString() } : undefined),
        ...(displaySizeValue ? { displaySize: displaySizeValue } : undefined),
        ...(isValidCellData(imei1Value) ? { imei1: imei1Value } : undefined),
        ...(isValidCellData(imei2Value) ? { imei2: imei2Value } : undefined),
        ...(isValidCellData(MONITOR_REFRESH_RATE) ? { refreshRate: MONITOR_REFRESH_RATE.toString() } : undefined),
        ...(isValidCellData(LAPTOP_CHIP) ? { chipType: LAPTOP_CHIP } : undefined),
        ...(isValidCellData(LAPTOP_RAM_VALUE) ? { ram: LAPTOP_RAM_VALUE } : undefined),
        ...(isValidCellData(MONITOR_RESOLUTION) ? { resolution: MONITOR_RESOLUTION } : undefined),
        ...(isValidCellData(MDM_INSTALLED) ? { mdmInstalled: MDM_INSTALLED } : undefined),
        ...(isValidCellData(IS_RENTAL) ? { isRental: IS_RENTAL } : undefined),
        ...(isValidCellData(BRAND_NEW) ? { isBrandNew: BRAND_NEW } : undefined),
        ...(isValidCellData(RENTAL_START_DATE) ? { rentalStartDate: RENTAL_START_DATE } : undefined),
        ...(isValidCellData(RENTAL_END_DATE) ? { rentalEndDate: RENTAL_END_DATE } : undefined),
        ...(isValidCellData(RENTAL_END_DATE) ? { rentalEndDate: RENTAL_END_DATE } : undefined),
        ...(isValidCellData(NUMBER_OF_MAC_ADDRESSES) ? { numberOfMacAddresses: NUMBER_OF_MAC_ADDRESSES } : undefined),
        ...(isValidCellData(MAC_ADDRESSES) ? { macAddresses: MAC_ADDRESSES.split(',') } : undefined),
      };
      if (!isEmpty(formattedRowData)) {
        formattedRowData.imei1 = formattedRowData.imei1?.toString();
        formattedRowData.imei2 = formattedRowData.imei2?.toString();
        formattedRowData.deviceConfig = {
          deviceModel: formattedRowData.deviceModel,
          storage: formattedRowData.storage,
          year: formattedRowData.year,
          displaySize: formattedRowData.displaySize,
          imei1: formattedRowData.imei1,
          imei2: formattedRowData.imei2,
          refreshRate: formattedRowData.refreshRate,
          chipType: formattedRowData.chipType,
          ram: formattedRowData.ram,
          resolution: formattedRowData.resolution,
          numberOfMacAddresses: formattedRowData.numberOfMacAddresses,
          macAddresses: Array.isArray(formattedRowData.macAddresses) ?
            formattedRowData.macAddresses.slice(0, formattedRowData.numberOfMacAddresses)
            : undefined,
        };
        formattedRowData.assignmentStatus = ASSET_DEVICE_STATUS_AND_ASSIGNMENT_STATUS_RELATIONSHIP[formattedRowData.deviceStatus];
        formattedRowData.version = ASSET_VERSIONS.v2;
        try {
          getAssetSchema(isForBulkUpdate).validateSync(formattedRowData, { abortEarly: false });
          formattedRowData.numberOfMacAddresses = undefined;
          formattedRowData.macAddresses = undefined;
          formattedData.push(formattedRowData);
        }
        catch (error) {
          errorMessages.push({
            row: i + 2,
            message: formatErrorMessage(error),
          });
        }
      }
    }
    return { formattedData, errorMessages };
  };

  const handleCsvImport = ({ data: csvData }) => {
    const { formattedData, errorMessages } = formatCSVDataToAssetObject(csvData);
    if (errorMessages.length > 0) {
      setUploadErrorMessages(errorMessages);
      setIsErrorModalVisible(true);
    }
    else {
      dispatch(Creators.bulkInsertAssetsRequest({ assets: formattedData }));
    }
  };

  const handleCsvImportForBulkUpdate = ({ data: csvData }) => {
    const { formattedData, errorMessages } = formatCSVDataToAssetObject(csvData, true);
    if (errorMessages.length > 0) {
      setBulkUpdateErrorMessages(errorMessages);
      setIsBulkUpdateErrorModalVisible(true);
    }
    else {
      dispatch(Creators.bulkUpdateAssetsRequest({ assets: formattedData }));
    }
  };

  const docLink = (
    <a
      className={classes.link}
      href={BULK_UPLOAD_IT_ASSETS_WARNING_MESSAGE_DOC_LINK}
      target="_blank"
      rel="noreferrer"
    >link
    </a>
  );

  const handleExcelDownLoadForBulkUpdate = () => {
    dispatch(Creators.getEmployeeAssetListExcelDownloadRequest({ filters, isForBulkUpdate: true }));
  };

  const downloadAssetsForBulkUpdateButton = (
    <Button
      type="link"
      className={classes.link}
      onClick={handleExcelDownLoadForBulkUpdate}
    >link
    </Button>
  );

  return (
    <Row>
      <Col flex={1}>
        <PageTitleHeader title={title} />
        <PageHeader className="p-0 page-title" title={title} />
      </Col>
      <Col className={classes.btnWrapper}>

        <Can permKey={permKey.PAGE_IT_ASSET_DASHBOARD}>
          <Button
            type="primary"
            onClick={() => navigate(ROUTE.IT_ASSET_DASHBOARD.path)}
          >
            {t('assetPage:IT_ASSET_DASHBOARD.BUTTON_TEXT')}
          </Button>
        </Can>

        <Can permKey={permKey.PAGE_EMPLOYEE_ASSET_LIST_COMPONENT_BULK_INSERT_EXCEL_IMPORT}>
          <CsvImporter
            modalProps={{ width: 800 }}
            onOkayClick={handleCsvImportForBulkUpdate}
            hasNestedHeaderKeys
            importButtonText={t('BULK_UPDATE_IT_ASSETS')}
            isButton
            loading={isBulkUpdateAssetsPending}
            modalTitleForCSV={t('BULK_UPDATE_IT_ASSETS_TITLE')}
            warningText={(
              <Trans
                t={t}
                i18nKey="BULK_UPDATE_IT_ASSETS_DOWNLOAD_MESSAGE"
                components={{ downloadAssetsForBulkUpdateButton }}
              />
            )}
          />

          <Modal
            title={t('BULK_UPDATE_IT_ASSETS_TITLE')}
            centered
            visible={isBulkUpdateErrorModalVisible}
            onCancel={handleErrorModalClose}
            footer={null}
          >
            <div className={classes.errorMessage}>
              {
                bulkUpdateErrorMessages.length && (
                  bulkUpdateErrorMessages.map(error => (
                    <Alert
                      key={error.row}
                      message={`${t('ON_ROW')}: ${error.row}`}
                      description={`${t('ERROR')}: ${error.message}`}
                      type="error"
                    />
                  ))
                )
              }
            </div>
            <Paragraph />
          </Modal>
        </Can>

        <Can permKey={permKey.PAGE_EMPLOYEE_ASSET_LIST_COMPONENT_BULK_INSERT_EXCEL_IMPORT}>
          <CsvImporter
            modalProps={{ width: 800 }}
            onOkayClick={handleCsvImport}
            hasNestedHeaderKeys
            importButtonText={t('assetPage:BULK_CREATE_IT_ASSETS')}
            isButton
            loading={isBulkInsertAssetsPending}
            modalTitleForCSV={t('assetPage:BULK_CREATE_IT_ASSETS_TITLE')}
            warningText={(
              <Trans
                t={t}
                i18nKey="BULK_UPLOAD_IT_ASSETS_WARNING_MESSAGE"
                components={{ docLink }}
              />
            )}
          />

          <Modal
            title={t('assetPage:BULK_CREATE_IT_ASSETS_TITLE')}
            centered
            visible={isErrorModalVisible}
            onCancel={handleErrorModalClose}
            footer={null}
          >
            <div className={classes.errorMessage}>
              {
                uploadErrorMessages.length && (
                  uploadErrorMessages.map(error => (
                    <Alert
                      key={error.row}
                      message={`${t('ON_ROW')}: ${error.row}`}
                      description={`${t('ERROR')}: ${error.message}`}
                      type="error"
                    />
                  ))
                )
              }
            </div>
            <Paragraph />
          </Modal>
        </Can>

        <Can permKey={permKey.PAGE_EMPLOYEE_ASSET_LIST_COMPONENT_EXCEL_EXPORT}>
          <Dropdown
            overlay={(
              <Menu>
                <Menu.Item>
                  <Button
                    type="link"
                    loading={isPending}
                    onClick={handleExcelDownLoad}
                  >
                    {t('ASSET_DETAIL_REPORT')}
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    type="link"
                    loading={isPending}
                    onClick={handleCurrentEmployeeAssetReportDownLoad}
                  >
                    {t('EMPLOYEE_ASSET_REPORT')}
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    type="link"
                    loading={isPending}
                    onClick={handleFormerEmployeeAssetReportDownLoad}
                  >
                    {t('FORMER_EMPLOYEE_ASSET_REPORT')}
                  </Button>
                </Menu.Item>
              </Menu>
            )}
            trigger={['click']}
          >
            <Button
              loading={isPending}
              icon={<DownloadOutlined />}
            >
              {t('EXPORT_EXCEL')}
            </Button>
          </Dropdown>
        </Can>

        <Can permKey={permKey.PAGE_EMPLOYEE_ASSET_NEW}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(ROUTE.EMPLOYEE_ASSET_NEW.path)}
          >
            {t('assetPage:NEW_ASSET')}
          </Button>
        </Can>

      </Col>
    </Row>
  );
};

export default Header;
