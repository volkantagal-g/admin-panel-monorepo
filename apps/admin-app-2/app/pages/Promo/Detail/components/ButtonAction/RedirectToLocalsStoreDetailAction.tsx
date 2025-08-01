import { Col, Form } from 'antd';

import { useTranslation } from 'react-i18next';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import ArtisanStore from '@shared/containers/Select/ArtisanStore';

export function RedirectToLocalsStoreDetailAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('STORE')}
        className="d-inline"
      >
        <ArtisanStore
          disabled={disabled}
          mode="single"
          value={{
            value: value.data.store,
            label: value.data.storeName,
          }}
          onChange={(val: MongoIDType, label: string) => onChange({ ...value, data: { store: val, storeName: label } })}
        />
      </Form.Item>
    </Col>
  );
}
