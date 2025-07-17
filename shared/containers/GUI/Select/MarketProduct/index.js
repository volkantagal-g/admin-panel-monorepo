import { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spin, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { getMarketProductsSelector } from '@shared/redux/selectors/common';
import { createMap, getLimitAndOffset, isObjectIdValid } from '@shared/utils/common';
import { DEFAULT_DEBOUNCE_MS } from '@shared/shared/constants';
import { getMarketProductOptions } from './utils';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { usePrevious } from '@shared/hooks';
import { Button, Select } from '@shared/components/GUI';

const SelectMarketProduct = ({ value, onChange, projectFields = [], ...rest }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('marketProductPageV2');
  const marketProducts = useSelector(getMarketProductsSelector.getData);
  const marketProductsMap = useMemo(() => createMap(marketProducts), [marketProducts]);
  const isGetProductsPending = useSelector(getMarketProductsSelector.getIsPending);
  const initialPagination = { currentPage: 1, rowsPerPage: 100 };
  const [pagination, setPagination] = useState({ ...initialPagination });
  const [queryText, setQueryText] = useState();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const prevQueryText = usePrevious(queryText);
  const prevPagination = usePrevious(pagination);

  useEffect(() => {
    return () => {
      dispatch(CommonCreators.clearMarketProducts());
    };
  }, [dispatch]);

  const handleSearchCallback = useCallback(params => {
    const options = { fullName: true };
    const idsOrQueryTextParam = isObjectIdValid(params.queryText) ? { ids: [params.queryText] } : { queryText: params.queryText };

    dispatch(CommonCreators.getMarketProductsRequest({
      fields: ['fullName', 'suppliers', ...projectFields],
      filterOptions: options,
      ...idsOrQueryTextParam,
      ...getLimitAndOffset(params.pagination),
    }));
  }, [dispatch, projectFields]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearchCallback, delay: DEFAULT_DEBOUNCE_MS });

  useEffect(
    () => {
      const isAnyDependencyChanged = prevQueryText !== queryText ||
      prevPagination?.currentPage !== pagination?.currentPage ||
      prevPagination?.rowsPerPage !== pagination?.rowsPerPage;
      if (queryText?.length && isAnyDependencyChanged) {
        debouncedHandleSearch({
          pagination: { currentPage: pagination.currentPage, rowsPerPage: pagination.rowsPerPage },
          queryText,
        });
      }
    },
    [debouncedHandleSearch, prevPagination?.currentPage, prevPagination?.rowsPerPage,
      pagination?.currentPage, pagination?.rowsPerPage, prevQueryText, queryText],
  );

  const handleGetMoreData = () => {
    setPagination({ ...pagination, rowsPerPage: pagination.rowsPerPage + 25 });
  };

  const handleChange = productId => {
    if (Array.isArray(productId)) {
      onChange(productId, marketProductsMap);
    }
    else {
      onChange(productId, marketProductsMap[productId]);
    }
    setPagination({ ...initialPagination });
  };

  const handleDropdownVisibleChange = isVisible => {
    if (isVisible) setIsDropdownVisible(isVisible);
    if (!isVisible && value) setIsDropdownVisible(isVisible);
  };

  const renderDropdownMenu = menu => (
    <Row>
      <Col md={24} xs={24}>
        {menu}
      </Col>
      <Col span={6} offset={9}>
        <Button disabled={!queryText?.length} type="primary" onClick={handleGetMoreData} loading={isGetProductsPending}>
          {t('button:GET_MORE_DATA')}
        </Button>
      </Col>
    </Row>
  );

  const getNotFoundContent = () => {
    if (isGetProductsPending) return <div className="text-center my-3"><Spin size="small" /></div>;
    if (!isGetProductsPending && !queryText) return <div className="text-center my-3">{t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 1 })}</div>;
    if (!isGetProductsPending && queryText?.length && !marketProducts.length) return <div className="text-center my-3">{t('NOT_FOUND')}</div>;
    return undefined;
  };

  return (
    <Row>
      <Col span={24}>
        <Tooltip placement="topRight" title={t('SEARCH_BY_PRODUCT_ID_OR_NAME')}>
          <Select
            open={isDropdownVisible}
            {...rest}
            searchValue={queryText}
            label={t('BUNDLE_INFO.PRODUCT')}
            onSearch={searchValue => setQueryText(searchValue)}
            value={value}
            className="w-100"
            onChange={handleChange}
            loading={isGetProductsPending}
            dropdownAlign={{ overflow: { adjustY: 0 } }}
            dropdownRender={renderDropdownMenu}
            onDropdownVisibleChange={handleDropdownVisibleChange}
            filterOption={false}
            notFoundContent={getNotFoundContent()}
            showSearch
          >
            {getMarketProductOptions(marketProducts)}
          </Select>
        </Tooltip>
      </Col>
    </Row>
  );
};

export default SelectMarketProduct;
