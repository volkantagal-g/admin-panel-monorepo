import { Col, Row, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import permKeys from '@shared/shared/permKey.json';
import { Card } from '@shared/components/GUI';
import { ROUTE } from '@app/routes';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { warehouseTypes } from '@shared/shared/constantValues';
import { getLangKey } from '@shared/i18n';

const { Text } = Typography;
export default function StoreInfo({ warehouse = {} }) {
  const { t } = useTranslation('marketBasketDetailPage');
  const { id, name, type } = warehouse;

  const storeInfo = [
    { label: t('global:NAME'), value: name },
    { label: t('global:TYPE'), value: warehouseTypes?.[type]?.[getLangKey()] || '' },
  ];

  const feeDetailsUrl = ROUTE.MARKET_FEES_DETAILS.path.replace(
    ':warehouseId',
    id,
  );
  const basketAmountDetailsUrl =
    ROUTE.GETIR_MARKET_BASKET_CONFIG_DETAILS.path.replace(':warehouseId', id);
  const warehouseDetailsUrl = ROUTE.WAREHOUSE_DETAIL.path.replace(':id', id);

  const storeLinks = [
    {
      text: t('global:FEE'),
      to: feeDetailsUrl,
      permKey: permKeys.PAGE_MARKET_FEES_DETAILS,
    },
    {
      text: t('global:BASKET'),
      to: basketAmountDetailsUrl,
      permKey: permKeys.PAGE_GETIR_MARKET_BASKET_CONFIG_DETAILS,
    },
    {
      text: t('global:DETAIL'),
      to: warehouseDetailsUrl,
      permKey: permKeys.PAGE_WAREHOUSE_DETAIL,
    },
  ];

  return (
    <Card
      title={t('global:STORE')}
      extra={(
        <Space>
          {storeLinks.map(({ text, to, permKey }) => (
            <RedirectButtonV2
              key={to}
              text={text}
              to={to}
              type="primary"
              permKey={permKey}
              target="_blank"
              size="small"
            />
          ))}
        </Space>
      )}
    >
      {storeInfo.map(({ label, value }) => (
        <Row className="mb-1" key={label}>
          <Col span={6}>
            <Text><strong>{label}:</strong></Text>
          </Col>
          <Col flex={1}>
            <span>{value}</span>
          </Col>
        </Row>
      ))}
    </Card>
  );
}
