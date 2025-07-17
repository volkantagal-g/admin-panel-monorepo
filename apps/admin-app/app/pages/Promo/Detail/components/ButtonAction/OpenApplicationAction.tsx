import { useTranslation } from 'react-i18next';
import { Col, Form, Input } from 'antd';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';

function OpenApplicationAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item
          name={['data', 'playStoreUrl']}
          label={t('PLAY_STORE_URL')}
          className="d-inline"
        >
          <Input
            placeholder={`${t('PLAY_STORE_URL')}`}
            disabled={disabled}
            value={value.data.playStoreUrl}
            onChange={event => onChange({ ...value, data: { ...value.data, playStoreUrl: event.target.value } })}
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item
          name={['data', 'appId']}
          label={t('APP_STORE_ID')}
          className="d-inline"
        >
          <Input
            placeholder={`${t('APP_STORE_ID')}`}
            disabled={disabled}
            onChange={event => onChange({ ...value, data: { ...value.data, appId: event.target.value } })}
            value={value.data.appId}
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item
          name={['data', 'packageName']}
          label={t('PACKAGE_NAME')}
          className="d-inline"
        >
          <Input
            placeholder={`${t('PACKAGE_NAME')}`}
            disabled={disabled}
            onChange={event => onChange({ ...value, data: { ...value.data, packageName: event.target.value } })}
            value={value.data.packageName}
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item
          name={['data', 'urlSchema']}
          label={t('URL_SCHEMA')}
          className="d-inline"
        >
          <Input
            placeholder={`${t('URL_SCHEMA')}`}
            disabled={disabled}
            onChange={event => onChange({ ...value, data: { ...value.data, urlSchema: event.target.value } })}
            value={value.data.urlSchema}
          />
        </Form.Item>
      </Col>
    </>
  );
}

export default OpenApplicationAction;
