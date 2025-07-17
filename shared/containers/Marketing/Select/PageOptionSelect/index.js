import { Form, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { getSelectFilterOption } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';
import { MARKET_CONFIG_QUERY_TYPES } from '@shared/shared/constants';
import { getConfigKey } from '@shared/api/marketing';
import { Creators as ToastCreators } from '@shared/redux/actions/toast';

export const convertInAppRedirectPageOptions = (pageOptions, additionalFilter) => {
  if (additionalFilter) {
    return additionalFilter(pageOptions);
  }

  return pageOptions?.map(item => ({
    value: item?.pageId,
    label: item?.name[getLangKey()],
  }));
};

const PageOptionSelect = ({
  configKey = null,
  fieldName,
  disabled,
  mode = null,
  onChange,
  label = null,
  onLoad,
  maxTagCount = 10,
  rules,
  additionalFilter = null,
  inline = true,
  placeholder,
}) => {
  const { t } = useTranslation('marketing');
  const dispatch = useDispatch();

  const [pageOptions, setPageOptions] = useState([]);
  const [isPageOptionsLoading, setIsPageOptionsLoading] = useState(false);

  useEffect(() => {
    setIsPageOptionsLoading(true);
    getConfigKey({
      body: {
        key: configKey,
        type: MARKET_CONFIG_QUERY_TYPES.ARRAY,
      },
    }).then(data => {
      setPageOptions(data?.value);
      if (onLoad) {
        onLoad(data?.value);
      }
    }).catch(error => {
      dispatch(ToastCreators.error({ error }));
    }).finally(() => {
      setIsPageOptionsLoading(false);
    });
  }, [configKey, dispatch, onLoad]);

  return (
    <Form.Item
      name={fieldName}
      label={label ?? t('IN_APP_PAGES')}
      className={inline ? 'd-inline' : null}
      rules={rules || rules?.inAppPages}
    >
      <Select
        maxTagCount={maxTagCount}
        mode={mode}
        loading={isPageOptionsLoading}
        disabled={disabled || isPageOptionsLoading}
        onChange={onChange}
        placeholder={placeholder || `${t('IN_APP_PAGES')}`}
        suffixIcon={isPageOptionsLoading && <LoadingOutlined spin />}
        options={convertInAppRedirectPageOptions(pageOptions, additionalFilter)}
        autoComplete="off"
        allowClear
        showSearch
        filterOption={getSelectFilterOption}
      />
    </Form.Item>
  );
};

export default PageOptionSelect;
