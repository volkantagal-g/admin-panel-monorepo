import * as Yup from 'yup';

import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux';

import { Alert, Button, ButtonProps, Col, Row } from 'antd';

import { DeleteOutlined, PaperClipOutlined } from '@ant-design/icons';

import CsvImporter from '@shared/components/UI/CsvImporter';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

type DataType = Record<string, string>

type OnOkayClick = (data: {
  data: DataType[],
  duplicateColumnsExistAndOverwritten: boolean
}, file: any, loadedBase64File: string | ArrayBuffer | null) => void;

type ValidatedCsvImporterProps = {
  onChange?: (data: DataType[]) => void;
  validationSchema?: Yup.Schema<any>
  withoutHeader?: boolean,
  onOkayClick?: OnOkayClick;
  exampleCsv?: React.ReactNode;
  hasNestedHeaderKeys?: boolean,
  importButtonText?: string,
  importIconButtonTooltipText?: string,
  isVisible?: boolean,
  disabled?: boolean,
  warningText?: string,
  modalProps?: Record<string, any>,
  handleShowModal?: () => void,
  exampleTableProps?: any,
  isButton?: boolean,
  loading?: boolean,
  accept?: string,
  isExcel?: boolean,
  modalTitleForCSV?: string,
  incrementalParsing?: boolean,
  buttonType?: ButtonProps['type'],
  tableLayout?: string,
  onClear?: () => void,
  hideAlert?: boolean
  hideFeedback?: boolean
}

type ImportedFileProps = { fileName: string, onRemoveFile: () => void, disabled?: boolean }

function ImportedFile({ fileName, onRemoveFile, disabled }: ImportedFileProps) {
  return (
    <Row align="middle" gutter={[8, 8]}>
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
          onClick={onRemoveFile}
          disabled={disabled}
        />
      </Col>
    </Row>
  );
}

export function ValidatedCsvImporter({
  onChange,
  validationSchema,
  onOkayClick,
  exampleCsv,
  onClear,
  loading,
  disabled,
  hideAlert,
  hideFeedback,
  ...rest
}: ValidatedCsvImporterProps) {
  const { t } = useTranslation('promoPage');

  const dispatch = useDispatch();
  const [fileName, setFileName] = useState('');
  const [innerValue, setInnerValue] = useState<DataType[]>([]);
  const [showAlert, setShowAlert] = useState(!hideAlert);

  const handleOkayClick: OnOkayClick = (data, file, loadedBase64File) => {
    let rows = data.data;
    if (!rows.length) {
      return dispatch(ToastCreators.error({ message: t('ERR_INVALID_CSV_FILE') }));
    }

    if (validationSchema) {
      try {
        rows = Yup.array().of(validationSchema).validateSync(rows, { abortEarly: false, stripUnknown: true }) as unknown as DataType[];
      }
      catch (error) {
        return dispatch(ToastCreators.error({ message: t('ERR_INVALID_CSV_FILE') }));
      }
    }

    onChange?.(rows);
    setInnerValue(rows);
    setFileName(file.name);
    setShowAlert(!hideAlert);
    return onOkayClick?.(data, file, loadedBase64File);
  };

  const onRemoveFile = () => {
    setFileName('');
    onChange?.([]);
    setInnerValue([]);
    onClear?.();
    setShowAlert(!hideAlert);
  };

  if (fileName && !hideFeedback) {
    return (
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <ImportedFile fileName={fileName} onRemoveFile={onRemoveFile} disabled={disabled} />
        </Col>
        {
          showAlert && (
            <Col span={24}>
              <Alert
                onClose={() => setShowAlert(false)}
                message={`Total of ${innerValue.length} records are successfully imported.`}
                type="success"
                closable
                showIcon
              />
            </Col>
          )
        }
      </Row>
    );
  }

  return (
    <Row gutter={[12, 12]}>
      <Col>
        <CsvImporter
          hasNestedHeaderKeys
          importButtonText={t('GLOBAL:UPLOAD_CSV')}
          isButton
          onOkayClick={handleOkayClick}
          loading={loading}
          disabled={disabled}
          {...rest}
        />
      </Col>
      {exampleCsv && (
        <Col>
          {exampleCsv}
        </Col>
      )}
    </Row>
  );
}
