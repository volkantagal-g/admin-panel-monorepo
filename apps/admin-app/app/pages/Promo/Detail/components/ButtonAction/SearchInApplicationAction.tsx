import { useTranslation } from 'react-i18next';
import { Col, Form, Input, Select } from 'antd';

import { getSelectFilterOption } from '@shared/utils/common';
import { ActionFormProps, getBannerActionTargetsOptions } from './formHelper';

export function SearchInApplicationAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');
  return (
    <>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item
          label={t('KEYWORD')}
          className="d-inline"
        >
          <Input
            value={value.data.keyword}
            disabled={disabled}
            onChange={event => {
              event.persist();
              onChange({ ...value, data: { ...value.data, keyword: event.target.value } });
            }}
          />
        </Form.Item>
      </Col>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item
          label={t('SERVICE')}
          className="d-inline"
        >
          <Select
            placeholder={`${t('SERVICE')}`}
            options={getBannerActionTargetsOptions()}
            value={value.service?.toString()}
            disabled={disabled}
            allowClear
            onChange={service => onChange({ ...value, service: parseInt(service, 10) })}
            filterOption={getSelectFilterOption}
          />
        </Form.Item>
      </Col>
    </>
  );
}
