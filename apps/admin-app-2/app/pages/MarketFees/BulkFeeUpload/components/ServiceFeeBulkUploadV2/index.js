import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { FEE_SOURCE } from '@shared/shared/constants';
import ImportServiceFeeCsv from './components/Form';
import {
  dynamicServiceFeeSourceCsvURL,
  fixedServiceFeeSourceCsvURL,
  layeredServiceFeeSourceCsvURL,
} from '../../feeSourceConfig';
import { Card } from '@shared/components/GUI';

const { Title } = Typography;

const ServiceFeeBulkUpload = () => {
  const { t } = useTranslation('bulkFeeUpload');
  const serviceFeeImportCards = [
    {
      title: t('SERVICE_FEE.FIXED_SERVICE_FEE'),
      mode: FEE_SOURCE.FIXED_SERVICE_FEE,
      exampleCsvUrl: fixedServiceFeeSourceCsvURL,
    },
    {
      title: t('SERVICE_FEE.LAYERED_SERVICE_FEE'),
      mode: FEE_SOURCE.LAYERED_SERVICE_FEE,
      exampleCsvUrl: layeredServiceFeeSourceCsvURL,
    },
    {
      title: t('SERVICE_FEE.DYNAMIC_SERVICE_FEE'),
      mode: FEE_SOURCE.DYNAMIC_SERVICE_FEE,
      exampleCsvUrl: dynamicServiceFeeSourceCsvURL,
    },
  ];
  return (
    <Card title={<Title level={3}>{t('SERVICE_FEE.TITLE')}</Title>}>
      <Row gutter={[8, 8]} align="middle" data-testid="service-fee-bulk-update">
        {serviceFeeImportCards.map(({ title, mode, exampleCsvUrl }) => (
          <Col key={title} xs={24} md={8}>
            <ImportServiceFeeCsv
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

export default ServiceFeeBulkUpload;
