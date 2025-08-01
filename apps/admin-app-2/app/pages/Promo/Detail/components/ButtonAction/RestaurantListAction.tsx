import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

import { Button, Col, Form } from 'antd';

import { useMemo } from 'react';

import CsvImporter from '@shared/components/UI/CsvImporter';
import { t } from '@shared/i18n';
import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import { downloadDataAsCSV } from '@shared/utils/common';
import { RestaurantActionPayload } from '@app/pages/Promo/types';

const restaurantListExampleCsv: RestaurantActionPayload = {
  id: '559831e0b1dc700c006a71b0',
  name: 'İstanbul',
};

type CsvData = {
  data: RestaurantActionPayload[]
}

export function RestaurantListAction({ onChange, value, disabled }: ActionFormProps) {
  const handleCsvImport = ({ data: csvData }: CsvData) => {
    onChange({ ...value, data: { restaurants: csvData } });
  };

  const currentValue = useMemo(() => value.data.restaurants ?? [], [value.data.restaurants]);

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
            disabled={disabled}
            hasNestedHeaderKeys
            importButtonText={uploadCSVButton}
            exampleCsv={restaurantListExampleCsv}
            isVisible
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={24} className="mt-2">
        <Button
          icon={<DownloadOutlined />}
          onClick={() => downloadDataAsCSV({
            data: currentValue,
            columns: Object.keys(restaurantListExampleCsv),
          })}
          disabled={disabled}
        >
          {t('global:DOWNLOAD')}
        </Button>
      </Col>
    </>
  );
}
