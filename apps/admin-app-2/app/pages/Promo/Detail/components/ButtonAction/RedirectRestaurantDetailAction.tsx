import { Col, Form } from 'antd';

import { useTranslation } from 'react-i18next';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import Restaurant from '@shared/containers/Select/Restaurant';

export function RedirectRestaurantDetailAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('RESTAURANT')}
        className="d-inline"
      >
        <Restaurant
          value={{
            value: value.data.restaurantId,
            label: value.data.restaurantName,
          }}
          disabled={disabled}
          onChange={(val: MongoIDType, label: string) => onChange({ ...value, data: { restaurantId: val, restaurantName: label } })}
          mode="single"
        />
      </Form.Item>
    </Col>
  );
}
