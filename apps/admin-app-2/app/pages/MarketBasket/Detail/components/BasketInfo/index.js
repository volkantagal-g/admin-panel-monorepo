import { Col, Divider, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { formatDate } from '@shared/utils/dateHelper';
import { Card } from '@shared/components/GUI';
import { getLangKey } from '@shared/i18n';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { ROUTE } from '@app/routes';
import permKeys from '@shared/shared/permKey.json';

const { Text } = Typography;
export default function BasketInfo({ basketInfo = {} }) {
  const { createdAt, device, totalPriceText: basketAmount, products, orderId } = basketInfo;
  const { t } = useTranslation('marketBasketDetailPage');
  const basketDetails = [
    { label: t('global:BASKET_AMOUNT'), value: basketAmount },
    { label: t('global:CREATED_AT'), value: formatDate(createdAt) },
    { label: 'Device', value: device?.type },
  ];
  const orderDetailRedirectLink = ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', orderId);
  return (
    <Card
      title={t('global:BASKET')}
      extra={(
        orderId && (
          <RedirectButtonV2
            type="primary"
            text={t('global:ORDER')}
            to={orderDetailRedirectLink}
            permKey={permKeys.PAGE_GETIR_MARKET_ORDER_DETAIL}
            target="_blank"
            size="small"
          />
        )
      )}
    >
      {products?.length > 0 && (
      <Row>
        <Col span={24}>
          <ul>
            {products?.map(({ totalPriceText, priceText, names, quantity, id }) => (
              <li key={id}>
                <span className="mr-2">{quantity}x-</span>
                <span>{names?.[getLangKey()]} ({priceText}) - {totalPriceText}</span>
              </li>
            ))}
          </ul>
        </Col>
        <Divider />
      </Row>
      )}
      {basketDetails.map(({ label, value }) => (
        <Row key={label}>
          <Col span={6} className="flex justify-content-end">
            <Text> <strong>{label}:</strong></Text>
          </Col>
          <Col flex={1}>
            <Text>{value}</Text>
          </Col>
        </Row>
      ))}

    </Card>
  );
}
