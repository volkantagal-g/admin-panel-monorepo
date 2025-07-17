import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { FEE_SOURCE } from '@shared/shared/constants';
import ImportDeliveryFeeCsv from './components/Form';
import {
  dynamicDeliveryFeeSourceCsvURL,
  fixedDeliveryFeeSourceCsvURL,
  layeredDeliveryFeeSourceCsvURL,
  zoneBasedFixedDeliveryFeeSourceCsvURL,
  zoneBasedLayeredDeliveryFeeSourceCsvURL,
} from '../../feeSourceConfig';
import { Card } from '@shared/components/GUI';

const { Title } = Typography;

const DeliveryFeeBulkUpload = () => {
  const { t } = useTranslation('bulkFeeUpload');
  const deliveryFeeImportCards = [
    {
      title: t('DELIVERY_FEE.FIXED_DELIVERY_FEE'),
      mode: FEE_SOURCE.FIXED_DELIVERY_FEE,
      exampleCsvUrl: fixedDeliveryFeeSourceCsvURL,
    },
    {
      title: t('DELIVERY_FEE.ZONE_BASED_FIXED_DELIVERY_FEE'),
      mode: FEE_SOURCE.ZONE_BASED_FIXED_DELIVERY_FEE,
      exampleCsvUrl: zoneBasedFixedDeliveryFeeSourceCsvURL,
    },
    {
      title: t('DELIVERY_FEE.ZONE_BASED_LAYERED_DELIVERY_FEE'),
      mode: FEE_SOURCE.ZONE_BASED_LAYERED_DELIVERY_FEE,
      exampleCsvUrl: zoneBasedLayeredDeliveryFeeSourceCsvURL,
    },
    {
      title: t('DELIVERY_FEE.LAYERED_DELIVERY_FEE'),
      mode: FEE_SOURCE.LAYERED_DELIVERY_FEE,
      exampleCsvUrl: layeredDeliveryFeeSourceCsvURL,
    },
    {
      title: t('DELIVERY_FEE.DYNAMIC_DELIVERY_FEE'),
      mode: FEE_SOURCE.DYNAMIC_DELIVERY_FEE,
      exampleCsvUrl: dynamicDeliveryFeeSourceCsvURL,
    },
  ];
  return (
    <Card title={<Title level={3}>{t('DELIVERY_FEE.TITLE')}</Title>}>
      <Row
        gutter={[8, 8]}
        align="middle"
        data-testid="delivery-fee-bulk-update"
      >
        {deliveryFeeImportCards.map(({ title, mode, exampleCsvUrl }) => (
          <Col key={title} xs={24} md={8}>
            <ImportDeliveryFeeCsv
              title={title}
              mode={mode}
              exampleCsvUrl={exampleCsvUrl}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default DeliveryFeeBulkUpload;
