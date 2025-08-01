import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { Creators } from '../../../redux/actions';
import MultipleSelect from '../MultipleSelect';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';

const ABTestCodeSelect = ({
  description,
  activeKey,
  value,
  label,
  selectable,
  tagValue,
  tagKey = 'id',
  placeholder,
}) => {
  const { t } = useTranslation('clientTargetingPage');
  const dispatch = useDispatch();

  const handleSearch = useCallback(code => {
    if (code.length < 3) return;
    dispatch(Creators.searchABTestCodeRequest({ testCode: code, activeKey }));
  }, [activeKey, dispatch]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearch, delay: DEFAULT_DEBOUNCE_MS });

  return (
    <MultipleSelect
      activeKey={activeKey}
      value={value}
      label={label || t('SELECT_AB_TEST_CODE')}
      clientListKey="abTestCodes"
      description={description}
      selectable={selectable}
      onSearch={debouncedHandleSearch}
      tagValue={tagValue}
      tagKey={tagKey}
      placeholder={placeholder}
    />
  );
};

export default ABTestCodeSelect;
