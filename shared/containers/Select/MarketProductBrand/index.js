import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Col, Select, Spin } from 'antd';
import { useTheme } from 'react-jss';
import { isEqual } from 'lodash';

import { Creators } from './redux/actions';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { getBrandsSelector } from './redux/selectors';
import { getLimitAndOffset } from '@shared/utils/common';
import { DEFAULT_DEBOUNCE_MS, REDUX_KEY } from '@shared/shared/constants';
import { t } from '@shared/i18n';
import { getBrandOptions } from './utils';
import useDebouncedCallback from '@shared/hooks/useDebouncedCallback';
import { usePrevious } from '@shared/hooks';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';

const reduxKey = REDUX_KEY.SELECT.MARKET_PRODUCT_BRAND;

const SelectMarketProductBrand = ({
  value = '',
  onChange,
  disabled,
  isFormEditable,
  requestParams = {},
  ...otherProps
}) => {
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  const theme = useTheme();
  const dispatch = useDispatch();
  const brands = useSelector(getBrandsSelector.getData);
  const isGetBrandsPending = useSelector(getBrandsSelector.getIsPending);
  const initialPagination = { currentPage: 1, rowsPerPage: 10 };
  const [pagination, setPagination] = useState({ ...initialPagination });
  const [queryText, setQueryText] = useState();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const prevQueryText = usePrevious(queryText);
  const prevPagination = usePrevious(pagination);
  const prevRequestParams = usePrevious(requestParams);

  useEffect(() => {
    dispatch(Creators.initContainer());

    return () => {
      dispatch(Creators.destroyContainer());
    };
  }, [dispatch]);

  const handleSearchCallback = useCallback(params => {
    dispatch(Creators.getBrandsRequest({
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
        });
      }
    },
    [debouncedHandleSearch, prevPagination?.currentPage, prevPagination?.rowsPerPage,
      pagination.currentPage, pagination.rowsPerPage, prevQueryText, queryText, prevRequestParams, requestParams],
  );

  const handleGetMoreData = () => {
    setPagination({ ...pagination, rowsPerPage: pagination.rowsPerPage + 25 });
  };

  const handleChange = brandOption => {
    const brandId = brandOption?.value;
    onChange(brandId);
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
          <Button type="primary" disabled={!queryText?.length} onClick={handleGetMoreData} loading={isGetBrandsPending}>
            {t('button:GET_MORE_DATA')}
          </Button>
        </Col>
      </Row>
    </>
  );

  const getNotFoundContent = () => {
    if (isGetBrandsPending) return <div className="text-center my-3"><Spin size="small" /></div>;
    if (!isGetBrandsPending && !queryText) return <div className="text-center my-3">{t('NOT_FOUND_PLEASE_TYPE_FOR_SEARCH', { letterCount: 1 })}</div>;
    if (!isGetBrandsPending && queryText?.length && !brands?.length) return <div className="text-center my-3">{t('NOT_FOUND')}</div>;
    return undefined;
  };

  useEffect(() => {
    if (!isFormEditable && brands?.length) {
      dispatch(Creators.clearBrands());
    }
  }, [dispatch, brands, isFormEditable]);

  return (
    <Row gutter={theme.spacing(3)}>
      <Col span={24}>
        <Select
          value={value}
          labelInValue
          open={isDropdownVisible}
          searchValue={queryText}
          placeholder={t('SELECT_BRAND')}
          onSearch={searchValue => setQueryText(searchValue)}
          className="w-100"
          onChange={handleChange}
          loading={isGetBrandsPending}
          dropdownAlign={{ overflow: { adjustY: 0 } }}
          dropdownRender={renderDropdownMenu}
          onDropdownVisibleChange={handleDropdownVisibleChange}
          filterOption={false}
          notFoundContent={getNotFoundContent()}
          getPopupContainer={trigger => trigger?.parentNode}
          showSearch
          disabled={disabled}
          {...otherProps}
        >
          {getBrandOptions(brands)}
        </Select>
      </Col>
    </Row>
  );
};

export default SelectMarketProductBrand;
