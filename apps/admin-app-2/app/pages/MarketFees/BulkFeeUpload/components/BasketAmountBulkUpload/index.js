import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

import { FEE_SOURCE } from '@shared/shared/constants';
import ImportBasketAmountCsv from './components/Form';
import {
  basketAmountSourceCsvURL,
  zoneBasedBasketAmountSourceCsvURL,
} from '../../feeSourceConfig';
import { Card } from '@shared/components/GUI';

const { Title } = Typography;

const BasketAmountBulkUpload = () => {
  const { t } = useTranslation('bulkFeeUpload');
  const basektAmountImportCards = [
    {
      title: t('BASKET.TITLE'),
      mode: FEE_SOURCE.BASKET_AMOUNT,
      exampleCsvUrl: basketAmountSourceCsvURL,
    },
    {
      title: t('BASKET.ZONE_BASED_TITLE'),
      mode: FEE_SOURCE.ZONE_BASED_BASKET_AMOUNT,
      exampleCsvUrl: zoneBasedBasketAmountSourceCsvURL,
    },
  ];
  return (
    <Card title={<Title level={3}>{t('BASKET.TITLE')}</Title>}>
      <Row
        gutter={[8, 8]}
        align="middle"
        data-testid="basket-amount-bulk-update"
      >
        {basektAmountImportCards.map(({ title, mode, exampleCsvUrl }) => (
          <Col key={title} xs={24} md={8}>
            <ImportBasketAmountCsv
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

export default BasketAmountBulkUpload;
