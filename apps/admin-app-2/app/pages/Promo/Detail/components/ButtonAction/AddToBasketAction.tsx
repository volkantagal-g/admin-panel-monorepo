import { Col, Form } from 'antd';

import { useTranslation } from 'react-i18next';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import SelectMarketProduct from '@shared/containers/Select/MarketProduct';
import { MarketProduct } from '@app/pages/Promo/types';
import { getLangKey } from '@shared/i18n';

export function AddToBasketAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('PRODUCT')}
        className="d-inline"
      >
        <SelectMarketProduct
          disabled={disabled}
          value={{
            value: value.data.productId,
            label: value.data.productName,
          }}
          onChange={(productId: MongoIDType, product: MarketProduct) => {
            onChange({ ...value, data: { productId, productName: product?.fullName?.[getLangKey()] } });
          }}
        />
      </Form.Item>
    </Col>
  );
}
