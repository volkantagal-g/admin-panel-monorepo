import { Button, Col, Form, Row } from 'antd';

import { useTranslation } from 'react-i18next';

import { DownloadOutlined } from '@ant-design/icons';

import { useState } from 'react';

import { useDispatch } from 'react-redux';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import SelectMarketProduct from '@shared/containers/Select/MarketProduct';
import CsvImporter from '@shared/components/UI/CsvImporter';
import { downloadDataAsCSV } from '@shared/utils/common';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';
import { ERROR_TIMEOUT_MS } from '@app/pages/Promo/constantValues';

type CSVData = {
  data: { item: string }[]
}

const CSV_COLUMNS = [
  { id: 'id' },
];

export function ShowMultipleProductsAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');
  const dispatch = useDispatch();

  const [isProductsCsvModalOpen, setIsProductsCsvModalOpen] = useState(false);

  const handleProductsCsvImport = ({ data }: CSVData) => {
    if (!data.length) return;
    if (!data?.[0]?.item) {
      dispatch(ToastCreators.error({
        error: t('ERROR.INVALID_CSV'),
        message: t('ERROR.INVALID_CSV'),
        toastOptions: { autoClose: ERROR_TIMEOUT_MS },
      }));
    }
    else {
      const importedProducts = data.map(product => product?.item);
      onChange({ ...value, data: { products: importedProducts } });
    }
  };

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Row gutter={4}>
        <Col span={24}>
          <Form.Item
            label={t('PRODUCT')}
            className="d-inline"
          >
            <SelectMarketProduct
              mode="multiple"
              disabled={disabled}
              value={value.data.products}
              onChange={(marketProductIds: MongoIDType[]) => onChange({ ...value, data: { products: marketProductIds } })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={4}>
        <Col span={2}>
          <Button
            onClick={() => setIsProductsCsvModalOpen(true)}
            className="mt-2 w-100"
            style={{ border: 'none' }}
            disabled={disabled}
          >
            <CsvImporter
              onOkayClick={handleProductsCsvImport}
              hasNestedHeaderKeys
              exampleCsv={{ item: 'id' }}
              isVisible={isProductsCsvModalOpen}
            />
          </Button>
        </Col>
        <Col span={2}>
          <Button
            icon={<DownloadOutlined />}
            onClick={() => downloadDataAsCSV({
              data: value.data.products?.map((product: MongoIDType) => ({ id: product })) ?? [],
              columns: CSV_COLUMNS,
            })}
            className="mt-2"
          >
            {t('global:DOWNLOAD')}
          </Button>
        </Col>
      </Row>
    </Col>
  );
}
