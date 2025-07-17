import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { rules } from '@shared/containers/Marketing/ClientAppActions/helpers';
import { MERCHANT_LIST } from '@shared/containers/Marketing/ClientAppActions/LocalsMerchantAction/constant';
import LocalsChainSelect from '@shared/containers/Marketing/Select/LocalsChainSelect';

const LocalsMerchantAction = (
  {
    filterShopsFieldName,
    chainsFieldName,
    disabled,
    form,
    actionObjName,
  },
) => {
  const { t } = useTranslation('marketing');

  return (
    <>
      <Form.Item
        name={filterShopsFieldName}
        label={t('MERCHANT_LIST')}
        className="d-none"
        initialValue={MERCHANT_LIST.SHOW_ALL_CHAIN_MERCHANTS}
        defaultValue={MERCHANT_LIST.SHOW_ALL_CHAIN_MERCHANTS}
        rules={rules.filterShopsList}
      >
        <Input
          placeholder={`${t('MERCHANT_LIST')}`}
          disabled
        />
      </Form.Item>
      <LocalsChainSelect
        onChange={e => {
          if (!e) {
            form.resetFields([actionObjName]);
            form.setFields([{ name: filterShopsFieldName, value: MERCHANT_LIST.SHOW_ALL_CHAIN_MERCHANTS }]);
          }
        }}
        preserve={false}
        disabled={disabled}
        fieldName={chainsFieldName}
      />

    </>
  );
};

export default LocalsMerchantAction;
