import { useTranslation } from 'react-i18next';
import { Col, Form, Radio, RadioChangeEvent, Space } from 'antd';

import LocalsMerchantType from '@shared/containers/Select/LocalsMerchantType';
import LocalsChain from '@shared/containers/Select/LocalsChain';
import { GETIR_LOCAL_MERCHANT_TYPES } from '@shared/shared/constants';
import { ActionFormProps } from '@app/pages/Promo/Detail/components/ButtonAction/formHelper';

export function GetirLocalsFilteredMerchantListAction({ onChange, value, disabled }: ActionFormProps) {
  const { ALL_CHAIN_MERCHANTS, SPECIFIC_CHAIN_MERCHANT, SPECIFIC_MERCHANT_TYPE } = GETIR_LOCAL_MERCHANT_TYPES;
  const { t } = useTranslation('bannerAction');

  const handleMerchantTypeChange = (event: RadioChangeEvent) => {
    onChange({ ...value, data: { getirLocalsMerchantType: event.target.value } });
  };

  const onChainChange = (chainId: MongoIDType) => {
    onChange({ ...value, data: { chainId } });
  };

  const onMerchantTypeChange = (filterShops: MongoIDType) => {
    onChange({ ...value, data: { filterShops } });
  };

  return (
    <>
      <Col xs={24} lg={24} className="mt-2">
        <Radio.Group
          onChange={handleMerchantTypeChange}
          value={value.data.getirLocalsMerchantType}
          disabled={disabled}
        >
          <Space direction="vertical">
            <Radio value={ALL_CHAIN_MERCHANTS}>{t('SHOW_ALL_CHAIN_MERCHANTS')}</Radio>
            <Radio value={SPECIFIC_CHAIN_MERCHANT}>{t('SHOW_SPECIFIC_CHAIN_MERCHANT')}</Radio>
            <Radio value={SPECIFIC_MERCHANT_TYPE}>{t('SHOW_SPECIFIC_MERCHANT_TYPE')}</Radio>
          </Space>
        </Radio.Group>
      </Col>
      {value.data.getirLocalsMerchantType === SPECIFIC_CHAIN_MERCHANT && (
        <Col xs={24} lg={24} className="mt-2">
          <Form.Item
            label={t('CHAIN')}
            className="d-inline"
          >
            <LocalsChain
              disabled={disabled}
              onChange={onChainChange}
              value={value.data.chainId}
            />
          </Form.Item>
        </Col>
      )}
      {value.data.getirLocalsMerchantType === SPECIFIC_MERCHANT_TYPE && (
        <Col xs={24} lg={24} className="mt-2">
          <Form.Item
            label={t('MERCHANT_TYPE')}
            className="d-inline"
          >
            <LocalsMerchantType
              disabled={disabled}
              onChange={onMerchantTypeChange}
              value={value.data.filterShops}
            />
          </Form.Item>
        </Col>
      )}
    </>
  );
}
