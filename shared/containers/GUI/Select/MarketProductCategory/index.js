import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Spin } from 'antd';
import { isEqual } from 'lodash';

import { Creators } from '@shared/containers/Select/MarketProductCategory/redux/actions';
import saga from '@shared/containers/Select/MarketProductCategory/redux/saga';
import reducer from '@shared/containers/Select/MarketProductCategory/redux/reducer';
import { getMarketProductCategoriesSelector } from '@shared/containers/Select/MarketProductCategory/redux/selectors';
import { getLimitAndOffset } from '@shared/utils/common';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { t } from '@shared/i18n';
import { getMarketProductCategoryOptions } from '@shared/containers/Select/MarketProductCategory/utils';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { usePrevious } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { Select } from '@shared/components/GUI';

const reduxKey = REDUX_KEY.SELECT.MARKET_PRODUCT_CATEGORY;

const SelectMarketProductCategory = ({
  value = '',
  onChange,
  disabled,
  isFormEditable,
  label,
  requestParams = {},
  labelWithTooltip,
  ...otherProps
}) => {
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  const dispatch = useDispatch();
  const marketProductCategories = useSelector(getMarketProductCategoriesSelector.getData);
  const isGetMarketProductCategoriesPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const initialPagination = { currentPage: 1, rowsPerPage: 10 };
  const [pagination, setPagination] = useState({ ...initialPagination });
  const [queryText, setQueryText] = useState();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const prevQueryText = usePrevious(queryText);
  const prevPagination = usePrevious(pagination);
  const prevRequestParams = usePrevious(requestParams);

  useEffect(() => {
    dispatch(Creators.initContainer());
    const body = { queryText: '', isSubCategory: false };
    dispatch(Creators.getMarketProductCategoriesRequest({ ...body }));
    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  const handleSearchCallback = useCallback(params => {
    dispatch(Creators.getMarketProductCategoriesRequest({
      ...params,
      ...getLimitAndOffset(params.pagination),
      name: params.queryText,
    }));
  }, [dispatch]);

  const { debouncedCallback: debouncedHandleSearch } = useDebouncedCallback({ callback: handleSearchCallback, delay: DEFAULT_DEBOUNCE_MS });

  useEffect(
    () => {
      const isAnyDependencyChanged = prevQueryText !== queryText ||
      prevPagination?.currentPage !== pagination?.currentPage ||
      prevPagination?.rowsPerPage !== pagination?.rowsPerPage ||
      !isEqual(prevRequestParams, requestParams);

      if (queryText?.length && isAnyDependencyChanged) {
        debouncedHandleSearch({
          ...requestParams,
          pagination: { currentPage: pagination.currentPage, rowsPerPage: pagination.rowsPerPage },
          queryText,
          isSubCategory: false,
        });
      }
    },
    [debouncedHandleSearch, prevPagination?.currentPage, prevPagination?.rowsPerPage,
      pagination.currentPage, pagination.rowsPerPage, prevQueryText, queryText, prevRequestParams, requestParams],
  );

  const handleGetMoreData = () => {
    setPagination({ ...pagination, rowsPerPage: pagination.rowsPerPage + 25 });
  };

  const handleChange = marketProductCategoriesOption => {
    if (Array.isArray(marketProductCategoriesOption)) {
      onChange(marketProductCategoriesOption);
    }
    else {
      const marketProductCategoryId = marketProductCategoriesOption?.value;
      onChange(marketProductCategoryId);
    }
    setPagination({ ...initialPagination });
  };

  const handleDropdownVisibleChange = isVisible => {
    if (isVisible) setIsDropdownVisible(isVisible);
    if (!isVisible && value) setIsDropdownVisible(isVisible);
  };

  const renderDropdownMenu = menu => (
    <>
      <Row>
        <Col md={24} xs={24}>
          {menu}
        </Col>
      </Row>
      <Row justify="center">
        <Col xs={24} className="text-center my-3">
          <Button type="primary" disabled={!queryText?.length} onClick={handleGetMoreData} loading={isGetMarketProductCategoriesPending}>
            {t('button:GET_MORE_DATA')}
          </Button>
        </Col>
      </Row>
    </>
  );

  const getNotFoundContent = () => {
    if (isGetMarketProductCategoriesPending) return <div className="text-center my-3"><Spin size="small" /></div>;
    if (!isGetMarketProductCategoriesPending && !queryText) {
      return <div className="text-center my-3">{t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 1 })}</div>;
    }
    if (!isGetMarketProductCategoriesPending && queryText?.length && !marketProductCategories.length) {
      return <div className="text-center my-3">{t('NOT_FOUND')}</div>;
    }
    return undefined;
  };

  useEffect(() => {
    if (!isFormEditable && marketProductCategories?.length) {
      dispatch(Creators.clearMarketProductCategories());
    }
  }, [dispatch, marketProductCategories, isFormEditable]);

  return (
    <Select
      value={value}
      labelWithTooltip={labelWithTooltip}
      open={isDropdownVisible}
      searchValue={queryText}
      placeholder={t('SELECT_CATEGORY')}
      onSearch={searchValue => setQueryText(searchValue)}
      className="w-100"
      onChange={handleChange}
      loading={isGetMarketProductCategoriesPending}
      dropdownAlign={{ overflow: { adjustY: 0 } }}
      dropdownRender={renderDropdownMenu}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      filterOption={false}
      notFoundContent={getNotFoundContent()}
      getPopupContainer={trigger => trigger?.parentNode}
      showSearch
      disabled={disabled || isGetMarketProductCategoriesPending}
      {...otherProps}
    >
      {getMarketProductCategoryOptions(marketProductCategories)}
    </Select>
  );
};

export default SelectMarketProductCategory;
