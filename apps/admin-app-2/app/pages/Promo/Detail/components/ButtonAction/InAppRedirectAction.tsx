import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Creators } from '@app/pages/Promo/Detail/components/ButtonAction/redux/actions';
import { getConfigKeySelector } from '@app/pages/Promo/Detail/components/ButtonAction/redux/selectors';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES } from '@shared/shared/constants';
import { getSelectFilterOption } from '@shared/utils/common';
import { ActionFormProps, getInAppRedirectPageOptions } from './formHelper';

export function InAppRedirectAction({ onChange, value, disabled }: ActionFormProps) {
  const { t } = useTranslation('bannerAction');
  const dispatch = useDispatch();
  const isPending = useSelector(getConfigKeySelector.getIsPending);
  const configKeyDataValue = useSelector(getConfigKeySelector.getData);

  const inAppRedirectPages = get(configKeyDataValue, 'value', []);

  const inAppRedirectPageOptions = useMemo(
    () => getInAppRedirectPageOptions(inAppRedirectPages),
    [inAppRedirectPages],
  );

  useEffect(() => {
    if (!inAppRedirectPages.length) {
      dispatch(Creators.getConfigKeyRequest(
        {
          body: {
            key: ADMIN_PANEL_CONFIGS.APPLICATION_LINK_IN_APP_REDIRECTION_OPTIONS,
            type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
          },
        },
      ));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Col xs={24} lg={24} className="mt-2">
      <Form.Item
        label={t('IN_APP_PAGES')}
        className="d-inline"
      >
        <Select
          disabled={isPending || disabled}
          value={value.data.pageId}
          onChange={page => onChange({ ...value, data: { ...value.data, pageId: page } })}
          placeholder={`${t('IN_APP_PAGES')}`}
          suffixIcon={isPending && <LoadingOutlined spin />}
          options={inAppRedirectPageOptions}
          allowClear
          showSearch
          filterOption={getSelectFilterOption}
        />
      </Form.Item>
    </Col>

  );
}
