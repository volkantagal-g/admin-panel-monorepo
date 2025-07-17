import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import { Col, Row, Space } from 'antd';

import { DeleteOutlined, DownloadOutlined, PaperClipOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
import moment from 'moment';

import { Alert, Button, Modal } from '@shared/components/GUI';
import CsvImporter from '@shared/components/UI/CsvImporter';
import {
  CSVCols,
  separateValidAndInvalidRows,
} from '@app/pages/MarketAutoGrowthOperations/components/AutoTarget/TargetImportModal/constants';
import { promoSetSelector } from '@app/pages/MarketAutoGrowthOperations/redux/selectors';
import { CHANGE_REASON_TITLES } from '@app/pages/MarketAutoGrowthOperations/constants';
import ChangeReason from '@app/pages/MarketAutoGrowthOperations/components/ChangeReason';
import { downloadDataAsCSV } from '@shared/utils/common';
import { DEFAULT_DATE_FORMAT, MIME_TYPE } from '@shared/shared/constants';

export function TargetImportModal({ open, setOpen, onSubmit }) {
  const { t } = useTranslation('marketAutoGrowthOperations');
  const [fileName, setFileName] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [data, setData] = useState(null);
  const warehouseTypeList = useSelector(promoSetSelector.warehouseTypeList);
  const [invalidRows, setInvalidRows] = useState([]);

  const clearState = ({ resetReason = true } = {}) => {
    setData(null);
    setFileName('');
    setInvalidRows([]);
    if (resetReason) {
      setSelectedReason('');
    }
  };

  const handleCancel = () => {
    setOpen(false);
    clearState();
  };

  const handleCSVImport = ({ data: csvData }, file) => {
    const warehouseTypes = warehouseTypeList.map(item => item.value);
    const [valid, invalid] = separateValidAndInvalidRows(csvData, warehouseTypes, t);
    if (valid.length > 0) {
      setData(valid);
    }
    setInvalidRows(invalid);
    setFileName(file.name);
  };

  const handleSubmit = () => {
    if (data) {
      onSubmit({
        data,
        selectedReason,
      });
      clearState();
      setOpen(false);
    }
  };

  function downloadErrorFile() {
    if (invalidRows?.length > 0) {
      downloadDataAsCSV(
        {
          data: invalidRows.map(item => ({
            ...item,
            date: item.date ? moment(item.date).local().format(DEFAULT_DATE_FORMAT) : '',
          })),
          columns: [Object.fromEntries(Object.values(CSVCols).map(col => [col, col]))],
          fileName: `invalid-target-rows-${moment().format(DEFAULT_DATE_FORMAT)}`,
        },
      );
    }
  }

  function handleRemoveFile() {
    clearState({ resetReason: false });
  }

  return (
    <Modal
      title={t('CSV_IMPORT')}
      visible={open}
      onOk={handleSubmit}
      okText={t('SAVE')}
      onCancel={handleCancel}
      cancelText={t('CANCEL')}
      okButtonProps={{ disabled: !data || !selectedReason }}
    >
      <Row gutter={[16, 16]}>
        {
          invalidRows?.length > 0 && (
            <Col span={24}>
              <Alert type="error" message={t('TARGET_ERROR_MESSAGES.N_ROWS_ARE_INVALID', { count: invalidRows.length })} />
            </Col>
          )
        }
        {
          data?.length > 0 && (
            <Col span={24}>
              <Alert type="info" message={t('TARGET_ERROR_MESSAGES.N_ROWS_WILL_BE_SAVED', { count: data.length })} />
            </Col>
          )
        }
        <Col span={24} style={{ display: 'flex' }}>
          <ChangeReason
            setSelectedReason={setSelectedReason}
            reasonType={CHANGE_REASON_TITLES.TARGET}
            selectedReason={selectedReason}
          />
        </Col>
        <Col span={24}>
          <Space align="center">
            <CsvImporter
              onOkayClick={handleCSVImport}
              hasNestedHeaderKeys
              importButtonText={t('UPLOAD_CSV')}
              buttonType="primary"
              disabled={data}
              isButton
              accept={MIME_TYPE.CSV}
            />
            {
              invalidRows?.length > 0 && (
                <Button
                  type="primary"
                  onClick={downloadErrorFile}
                  icon={<DownloadOutlined />}
                  size="extra-small"
                >
                  {t('ERROR_FILE')}
                </Button>
              )
            }
          </Space>
        </Col>
        {
          fileName && (
            <Col span={24}>
              <Row className="mt-3" align="middle" gutter={[8]}>
                <Col>
                  <PaperClipOutlined />
                </Col>
                <Col>
                  {fileName}
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
            </Col>
          )
        }
      </Row>
    </Modal>
  );
}
