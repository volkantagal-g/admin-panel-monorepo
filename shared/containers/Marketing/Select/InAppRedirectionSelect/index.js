import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { compose } from 'redux';
import { get } from 'lodash';

import { getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '@shared/containers/Marketing/Select/InAppRedirectionSelect/redux/actions';

import { getLangKey } from '@shared/i18n';
import { ADMIN_PANEL_CONFIGS, MARKET_CONFIG_QUERY_TYPES, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import saga from '@shared/containers/Marketing/Select/InAppRedirectionSelect/redux/saga';
import injectReducer from '@shared/utils/injectReducer';
import reducer from '@shared/containers/Marketing/Select/InAppRedirectionSelect/redux/reducer';
import { inAppRedirectionSelector } from '@shared/containers/Marketing/Select/InAppRedirectionSelect/redux/selectors';

export const convertInAppRedirectPageOptions = (pageOptions, additionalFilter) => {
  if (additionalFilter) {
    return additionalFilter(pageOptions);
  }

  return pageOptions?.map(item => ({
    value: item?.pageId,
    label: item?.name[getLangKey()],
  }));
};

const InAppRedirectionSelect = ({
  fieldName,
  disabled,
  onChange,
  rules,
  mode = '',
  additionalFilter = null,
  inline = true,
  placeholder,
  pageListConfigKey = 'APPLICATION_LINK_IN_APP_REDIRECTION_OPTIONS',
}) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const isPending = useSelector(inAppRedirectionSelector.getIsPending);
  const configKeyDataValue = useSelector(inAppRedirectionSelector.getData);
  const inAppRedirectPageOptions = get(configKeyDataValue, 'value', []);
  useEffect(() => {
    dispatch(Creators.initContainer());
    dispatch(Creators.getInAppRedirectionRequest(
      {
        body: {
          key: ADMIN_PANEL_CONFIGS?.[pageListConfigKey],
          type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
        },
      },
    ));
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch, pageListConfigKey]);

  return (
    <Form.Item
      name={fieldName}
      label={t('IN_APP_PAGES')}
      className={inline ? 'd-inline' : null}
      rules={rules || rules.inAppPages}
    >
      <Select
        mode={mode}
        disabled={disabled || isPending}
        onChange={onChange}
        placeholder={placeholder || `${t('IN_APP_PAGES')}`}
        suffixIcon={isPending && <LoadingOutlined spin />}
        options={convertInAppRedirectPageOptions(inAppRedirectPageOptions, additionalFilter)}
        autoComplete="off"
        allowClear
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

const reduxKey = REDUX_KEY.MARKETING.SELECT.IN_APP_REDIRECTION;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(InAppRedirectionSelect);
