import { useState, useEffect, useMemo, useCallback } from 'react';
import { compose } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash';

import AntTable from '@shared/components/UI/AntTable';
import { GETIR_FINANCE_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { usePageViewAnalytics } from '@shared/hooks';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { ROUTE } from '@app/routes';
import sagas from './redux/sagas';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import { marketFranchisesSelector } from './redux/selectors';
import NewButton from './components/NewButton';
import Filter from './components/Filter';
import { tableColumns } from './config';
import { getMarketFranchisesRequestParams } from './utils';
import { GETIR_FINANCE_ROLE_IDS_DEV, GETIR_FINANCE_ROLE_IDS_PROD, IS_PROD_ENV } from '@app/pages/MarketFranchise/List/constants';
import { getMyPermissionsSelector } from '@shared/redux/selectors/common';

import permKey from '@shared/shared/permKey.json';

const { Title } = Typography;

const List = () => {
  usePageViewAnalytics({ name: ROUTE.MARKET_FRANCHISE_LIST.name, squad: ROUTE.MARKET_FRANCHISE_LIST.squad });
  const dispatch = useDispatch();
  const { t } = useTranslation('marketFranchisePage');

  const pageTitle = t('PAGE_TITLE.MARKET_FRANCHISE.LIST');

  const [filters, setFilters] = useState({
    isActivated: true,
    name: '',
    cities: [],
    domainTypes: [],
    franchiseTypes: [],
  });
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const marketFranchises = useSelector(marketFranchisesSelector.getData);
  const isPending = useSelector(marketFranchisesSelector.getIsPending);
  const total = useSelector(marketFranchisesSelector.getTotal);
  const myPermissions = useSelector(getMyPermissionsSelector.getData);

  const isGetirFinanceEmployees = useMemo(() => {
    const franchiseListPagePermissionList = myPermissions.filter(obj => obj.permKey === permKey.PAGE_MARKET_FRANCHISE_LIST);
    return franchiseListPagePermissionList.some(obj => (IS_PROD_ENV ? GETIR_FINANCE_ROLE_IDS_PROD : GETIR_FINANCE_ROLE_IDS_DEV).includes(obj.role));
  }, [myPermissions]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (!isEqual(pagination, { currentPage, rowsPerPage })) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const handleSubmit = currentFilters => {
    setFilters(currentFilters);
  };

  const marketFranchiseRequest = useCallback(() => {
    const { currentPage, rowsPerPage } = pagination;
    let requestParams = getMarketFranchisesRequestParams({
      ...filters,
      currentPage,
      rowsPerPage,
    });
    if (isGetirFinanceEmployees) {
      requestParams = { ...requestParams, domainTypes: [GETIR_FINANCE_DOMAIN_TYPE] };
    }

    dispatch(Creators.getMarketFranchisesRequest(requestParams));
  }, [dispatch, filters, isGetirFinanceEmployees, pagination]);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getCitiesRequest());
    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    marketFranchiseRequest();
  }, [marketFranchiseRequest]);

  return (
    <>
      <Row justify="center" align="middle">
        <Col span={22}>
          <Title level={3}>{pageTitle}</Title>
        </Col>
        <Col span={2}>
          <NewButton />
        </Col>
      </Row>
      <Filter filters={filters} handleSubmit={handleSubmit} isPending={isPending} isGetirFinanceEmployees={isGetirFinanceEmployees} />
      <Row>
        <Col span={24}>
          <AntTable
            data={marketFranchises}
            columns={tableColumns(t)}
            total={total}
            loading={isPending}
            rowKey="_id"
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
          />
        </Col>
      </Row>
    </>
  );
};

const reduxKey = REDUX_KEY.MARKET_FRANCHISE.LIST;
const withSaga = injectSaga({ key: reduxKey, saga: sagas });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(
  withReducer,
  withSaga,
)(List);
