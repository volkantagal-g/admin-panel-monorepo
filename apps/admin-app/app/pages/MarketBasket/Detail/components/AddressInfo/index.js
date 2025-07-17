import { Col, Row, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

import { Card } from '@shared/components/GUI';

const { Text } = Typography;
export default function AddressInfo({ address = {} }) {
  const { name, text, doorNo, aptNo, floor, city, country } = address;

  const { t } = useTranslation('marketBasketDetailPage');
  const addressInfo = [
    {
      label: t('ADDRESS_INFO.NAME'),
      value: name,
    },
    {
      label: t('global:COUNTRY'),
      value: country,
    },
    {
      label: t('global:CITY'),
      value: city,
    },
    {
      label: t('ADDRESS_INFO.ADDRESS'),
      value: text,
    },
    {
      label: t('ADDRESS_INFO.APARTMENT'),
      value: aptNo,
    },
    {
      label: t('ADDRESS_INFO.DOOR_NO'),
      value: doorNo,
    },
    {
      label: t('ADDRESS_INFO.FLOOR'),
      value: floor,
    },
  ];

  return (
    <Card title={t('global:ADDRESS')}>
      {addressInfo.map(({ label, value }) => (
        <Row key={label}>
          <Col span={2}>
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
