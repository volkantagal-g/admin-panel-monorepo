import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

import { useLiveQuery } from 'dexie-react-hooks';

import { convertSelectOptions, getSelectFilterOption } from '@shared/utils/common';
import { Creators } from '@shared/redux/actions/common';
import { getAllPagesSelector } from '@shared/redux/selectors/common';
import { indexedDb } from '@shared/indexedDb';

const SelectPage = props => {
  const dispatch = useDispatch();
  const pagesPending = useSelector(getAllPagesSelector.getIsPending);
  const { value, onChange, disabled, excludedPageIds, ...otherProps } = props;

  useEffect(() => {
    dispatch(Creators.getAllPagesRequest());
  }, [dispatch]);

  const filteredPageOptions = useLiveQuery(async () => {
    const pages = await indexedDb.pages
      .where('_id').noneOf(excludedPageIds ?? [])
      .toArray();

    const selectOptions = convertSelectOptions(pages, { isTranslation: true, isData: true });
    return selectOptions;
  }, [excludedPageIds], []);

  return (
    <Select
      {...otherProps}
      value={value}
      options={filteredPageOptions}
      onChange={onChange}
      showSearch
      disabled={disabled}
      autoComplete="off"
      filterOption={getSelectFilterOption}
      loading={pagesPending}
    />
  );
};

export default SelectPage;
