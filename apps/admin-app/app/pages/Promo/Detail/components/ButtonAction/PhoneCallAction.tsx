import { Col, Form, Input } from 'antd';

import { useTranslation } from 'react-i18next';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';

export function PhoneCallAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('PHONE')}
        className="d-inline"
      >
        <Input
          placeholder={`${t('PHONE')}`}
          disabled={disabled}
          value={value.data.gsm}
          onChange={event => onChange({ ...value, data: { ...value.data, gsm: event.target.value } })}
        />
      </Form.Item>
    </Col>
  );
}
