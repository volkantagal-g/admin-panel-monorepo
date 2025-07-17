import { Col, Form } from 'antd';

import { useTranslation } from 'react-i18next';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import LocalsMerchant from '@shared/containers/Select/LocalsMerchant';

export function GetirLocalsMerchantDetailAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('MERCHANT')}
        className="d-inline"
      >
        <LocalsMerchant
          mode="single"
          disabled={disabled}
          value={{
            value: value.data.shop,
            label: value.data.shopName,
          }}
          onChange={(val: MongoIDType, label: string) => onChange({ ...value, data: { shop: val, shopName: label } })}
        />
      </Form.Item>
    </Col>
  );
}
