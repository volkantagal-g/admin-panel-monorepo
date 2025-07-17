import { Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import permKeys from '@shared/shared/permKey.json';
import { Card } from '@shared/components/GUI';
import { ROUTE } from '@app/routes';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';

const { Text } = Typography;
export default function ClientInfo({ client = {} }) {
  const { t } = useTranslation('marketBasketDetailPage');
  const { id, name, gsm } = client;

  const storeInfo = [
    { label: t('global:NAME'), value: name },
    { label: t('global:GSM'), value: gsm },
  ];

  const clientDetailsUrl = ROUTE.CLIENT_DETAIL.path.replace(
    ':id',
    id,
  );

  return (
    <Card
      title={t('global:CLIENT')}
      extra={(
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={clientDetailsUrl}
          permKey={permKeys.PAGE_CLIENT_DETAIL}
          target="_blank"
          data-testid="client-info-detail-link"
          size="small"
          type="primary"
        />
      )}
    >
      {storeInfo.map(({ label, value }) => (
        <Row className="mb-1" key={label}>
          <Col span={6}>
            <Text><strong>{label}:</strong></Text>
          </Col>
          <Col flex={1}>
            <Text>{value}</Text>
          </Col>
        </Row>
      ))}
    </Card>
  );
}
