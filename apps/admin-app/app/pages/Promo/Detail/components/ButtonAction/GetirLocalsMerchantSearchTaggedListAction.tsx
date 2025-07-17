import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import LocalsMerchantType from '@shared/containers/Select/LocalsMerchantType';
import { Creators } from '@app/pages/Promo/Detail/components/ButtonAction/redux/actions';
import { getSmartSuggestionsSelector } from '@app/pages/Promo/Detail/components/ButtonAction/redux/selectors';
import { ActionFormProps, getSmartSuggestionsOptions } from './formHelper';

export function GetirLocalsMerchantSearchTaggedListAction({ onChange, value, disabled }: ActionFormProps) {
  const dispatch = useDispatch();
  const isSmartPending = useSelector(getSmartSuggestionsSelector.getIsPending);
  const smartSuggestions = useSelector(getSmartSuggestionsSelector.getData);
  const { t } = useTranslation('bannerAction');

  const smartSuggestionsOptions = useMemo(
    () => getSmartSuggestionsOptions(smartSuggestions),
    [smartSuggestions],
  );

  const handleMerchantTypeChange = (merchantTypeId: MongoIDType) => {
    dispatch(Creators.getSmartSuggestionsRequest(
      { body: { merchantTypeId } },
    ));
    onChange({ ...value, data: { merchantTypeId } });
  };

  return (
    <>
      <Col xs={24} lg={24} className="mt-2">
        <Form.Item
          label={t('MERCHANT_TYPE')}
          className="d-inline"
        >
          <LocalsMerchantType
            disabled={disabled}
            onChange={handleMerchantTypeChange}
            value={value.data.merchantTypeId}
          />
        </Form.Item>
      </Col>
      {value.data.merchantTypeId && (
        <Col xs={24} lg={24} className="mt-2">
          <Form.Item
            label={t('SMART_SUGGESTION')}
            className="d-inline"
          >
            <Select
              disabled={isSmartPending || disabled}
              placeholder={t('SMART_SUGGESTION')}
              value={value.data.tagId}
              onChange={(tagId: MongoIDType) => onChange({ ...value, data: { ...value.data, tagId } })}
              options={smartSuggestionsOptions}
              suffixIcon={isSmartPending && <LoadingOutlined spin />}
              filterOption={false}
              showSearch
              allowClear
            />
          </Form.Item>
        </Col>
      )}

    </>
  );
}
