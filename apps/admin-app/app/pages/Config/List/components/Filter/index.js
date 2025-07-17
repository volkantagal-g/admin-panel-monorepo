import { useDispatch } from 'react-redux';
import { Row, Col, Collapse, Input } from 'antd';
import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';

import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import useDebounce from '@shared/shared/hooks/useDebounce';
import { Creators } from '../../redux/actions';

const { Panel } = Collapse;
const { Search } = Input;

const MAX_SEARCH_TERM_LENGTH = 100;

const Filter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, DEFAULT_DEBOUNCE_MS);

  const handleSearchTermChange = ({ target = {} } = {}) => {
    const { value = '' } = target;
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debouncedSearchTerm?.length > MAX_SEARCH_TERM_LENGTH) return;
    dispatch(Creators.setFilters({ filterObject: { searchTerm: debouncedSearchTerm } }));
  }, [dispatch, debouncedSearchTerm]);

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Collapse defaultActiveKey={1}>
          <Panel header={t('FILTER')} key={1}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <label htmlFor="configSearchInput">{t('SEARCH')}</label>
                <Search onChange={handleSearchTermChange} id="configSearchInput" />
                {
                  searchTerm.length > MAX_SEARCH_TERM_LENGTH && (
                    <span className="text-danger">
                      {t('baseYupError:STRING.MAX', { max: MAX_SEARCH_TERM_LENGTH })}
                    </span>
                  )
                }
              </Col>
            </Row>
          </Panel>
        </Collapse>
      </Col>
    </Row>
  );
};

export default Filter;
