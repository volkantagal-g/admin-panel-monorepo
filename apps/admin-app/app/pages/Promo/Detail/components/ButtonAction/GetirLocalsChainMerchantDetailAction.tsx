import { useTranslation } from 'react-i18next';
import { Col, Form } from 'antd';

import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';
import LocalsChain from '@shared/containers/Select/LocalsChain';

export function GetirLocalsChainMerchantDetailAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('CHAIN')}
        className="d-inline"
      >
        <LocalsChain
          value={value.data?.chainId}
          disabled={disabled}
          onChange={(chainId: MongoIDType) => onChange({ ...value, data: { ...value.data, chainId } })}
        />
      </Form.Item>
    </Col>
  );
}
