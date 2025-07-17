import { Col, Form } from 'antd';

import { useTranslation } from 'react-i18next';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import SelectMarketProduct from '@shared/containers/Select/MarketProduct';

export function ShowProductAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('PRODUCTS')}
        className="d-inline"
      >
        <SelectMarketProduct
          disabled={disabled}
          value={value.data.productId}
          onChange={(productId: MongoIDType) => onChange({ ...value, data: { ...value.data, productId } })}
        />
      </Form.Item>
    </Col>
  );
}
