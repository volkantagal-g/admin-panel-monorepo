import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import { convertSelectOptions } from '@shared/utils/common';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';

import { Creators } from '../../redux/actions';
import { getClientListTemplatesSelector } from '../../redux/selectors';

function ClientListTemplateSelect(props) {
  const { value, onChange, initialValue } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation('autoSegmentListPage');

  const clientListTemplates = useSelector(getClientListTemplatesSelector.getData);
  const isClientListTemplatesPending = useSelector(getClientListTemplatesSelector.getIsPending);

  const clientListTemplateSelectOptions = useMemo(() => convertSelectOptions(clientListTemplates, { labelKey: 'name' }), [clientListTemplates]);

  const handleSearch = useCallback(name => {
    if (name?.trim?.()?.length < 3) return;
    dispatch(Creators.getClientListTemplatesRequest({ name }));
  }, [dispatch]);

  useEffect(() => {
    if (initialValue) {
      dispatch(Creators.getInitialClientListTemplateRequest({ id: initialValue }));
    }
  }, [dispatch, initialValue]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  return (
    <Select
      value={value}
      options={clientListTemplateSelectOptions}
      onChange={onChange}
      loading={isClientListTemplatesPending}
      onSearch={debouncedHandleSearch}
      filterOption={false}
      notFoundContent={isClientListTemplatesPending ? <Spin size="small" /> : undefined}
      showSearch
      allowClear
      placeholder={t('autoSegmentListPage:PLACEHOLDER_CLIENT_LIST_TEMPLATE_SELECT')}
    />
  );
}

export default ClientListTemplateSelect;
