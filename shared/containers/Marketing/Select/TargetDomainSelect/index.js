// IMPORTANT NOTE: DO NOT FORGET TO CHECK WHICH API CALLS ARE MADE THROUGH THIS COMMON CONTAINER
// AND ADD YOUR PAGE PERM KEY TO API-GW
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { compose } from 'redux';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '@shared/containers/Marketing/Select/TargetDomainSelect/redux/actions';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import { domainTypes } from '@shared/shared/constantValues';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/TargetDomainSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/TargetDomainSelect/redux/reducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getConfigWithKeySelector } from '@shared/redux/selectors/common';
import { getLangKey } from '@shared/i18n';

const convertTargetDomainOptions = (targetDomains, filteredDomains) => {
  return targetDomains.flatMap(targetDomain => {
    if (filteredDomains.includes(targetDomain)) {
      return [];
    }
    return { value: targetDomain, label: domainTypes?.[targetDomain]?.[getLangKey()] };
  });
};

const TargetDomainSelect = ({
  className = null,
  fieldName,
  disabled,
  onChange,
  rules,
  filteredDomains = [],
  inline = true,
  mode = null,
  label = null,
  tooltip = null,
  allowClear = false,
  formItemClassName = null,
  placeholder = null,
}) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const config = useSelector(getConfigWithKeySelector.getData);
  const isConfigPending = useSelector(getConfigWithKeySelector.getIsPending);

  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(CommonCreators.getConfigWithKeyRequest({
      body: {
        key: ADMIN_PANEL_CONFIGS.ACTIVE_DOMAIN_TYPES,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }));
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);
  return (
    <Form.Item
      name={fieldName}
      label={label ?? t('TARGET_DOMAIN')}
      className={`${!inline && 'd-inline'} ${formItemClassName}`}
      rules={rules}
      tooltip={tooltip}
    >
      <Select
        allowClear={allowClear}
        mode={mode}
        className={className}
        aria-label={t('TARGET_DOMAIN')}
        suffixIcon={isConfigPending && <LoadingOutlined style={{ fontSize: 12 }} spin />}
        disabled={disabled || isConfigPending}
        placeholder={placeholder ?? `${t('TARGET_DOMAIN')}`}
        options={convertTargetDomainOptions(
          config?.customValue?.[getSelectedCountry()?.code?.alpha2] ?? [],
          filteredDomains,
        )}
        autoComplete="off"
        onChange={onChange}
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.TARGET_DOMAIN;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(TargetDomainSelect);
