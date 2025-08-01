import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

import { Button, Col, Form } from 'antd';

import { useMemo } from 'react';

import CsvImporter from '@shared/components/UI/CsvImporter';
import { t } from '@shared/i18n';
import { RestaurantActionPayload } from '@app/pages/Promo/types';
import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import { downloadDataAsCSV } from '@shared/utils/common';

const localStoreListExampleCsv = {
  id: '559831e0b1dc700c006a71b0',
  name: 'İstanbul',
};

type CsvData = {
  data: RestaurantActionPayload[]
}

export function RedirectToLocalsStoreListAction({ onChange, value, disabled }: ActionFormProps) {
  const handleCsvImport = ({ data: csvData }: CsvData) => {
    onChange({ ...value, data: { stores: csvData } });
  };

  const currentValue = useMemo(() => value.data.stores ?? [], [value.data.stores]);

  const uploadCSVButton = (
    <Button
      icon={<UploadOutlined />}
    >
      {t('global:IMPORT_CSV_FILE')}
    </Button>
  );

  return (
    <>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item
          label={t('RESTAURANT_LIST')}
          className="d-inline"
        >
          <CsvImporter
            onOkayClick={handleCsvImport}
            hasNestedHeaderKeys
            importButtonText={uploadCSVButton}
            exampleCsv={localStoreListExampleCsv}
            isVisible
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={24} className="mt-2">
        <Button
          icon={<DownloadOutlined />}
          onClick={() => downloadDataAsCSV({
            data: currentValue,
            columns: Object.keys(localStoreListExampleCsv),
          })}
          disabled={disabled}
        >
          {t('global:DOWNLOAD')}
        </Button>
      </Col>
    </>
  );
}
