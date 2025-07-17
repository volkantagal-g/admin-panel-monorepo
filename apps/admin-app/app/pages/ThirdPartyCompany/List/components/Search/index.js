import { Row, Col, Input } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Creators } from '@app/pages/ThirdPartyCompany/List/redux/actions';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';

const DEFAULT_SEARCH_TEXT = '';
const { Search } = Input;

const ThirdPartyCompanyListSearch = () => {
  const { t } = useTranslation(['thirdPartyCompany', 'global']);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState(DEFAULT_SEARCH_TEXT);
  const search = useCallback(e => {
    setSearchText(e.target.value);
  }, []);

  const { debouncedCallback: handleSearch } = useDebouncedCallback({
    callback: search,
    delay: DEFAULT_DEBOUNCE_MS,
  });

  useEffect(() => {
    dispatch(Creators.setThirdPartyCompanyFiltersSearchParam({ searchParam: searchText.trim() }));
  }, [dispatch, searchText]);

  return (
    <Row>
      <Col span={24}>
        <Search
          size="large"
          placeholder={t('SEARCH')}
          onChange={handleSearch}
          enterButton
        />
      </Col>
    </Row>
  );
};

export default ThirdPartyCompanyListSearch;
