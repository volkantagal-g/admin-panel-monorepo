import { Col, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';

export function RedirectToUrlAction({ value, disabled, onChange }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item
          label={t('REDIRECT_URL_TYPE')}
          className="d-inline"
        >
          <Input
            placeholder={`${t('REDIRECT_URL_TYPE')}`}
            value={value.data.url}
            disabled={disabled}
            onChange={event => onChange({ ...value, data: { ...value.data, url: event.target.value } })}
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={24} className="mt-4">
        <Form.Item
          label={t('REDIRECT_TO_BROWSER')}
          className="d-inline"
        >
          <input
            type="checkbox"
            checked={value.data.redirectToBrowser}
            disabled={disabled}
            onChange={e => onChange({ ...value, data: { ...value.data, redirectToBrowser: e.target.checked } })}
          />
        </Form.Item>
      </Col>
    </>
  );
}
