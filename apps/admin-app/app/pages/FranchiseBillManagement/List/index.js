import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/FranchiseBillManagement/List/redux/saga';
import reducer from '@app/pages/FranchiseBillManagement/List/redux/reducer';
import { Creators } from '@app/pages/FranchiseBillManagement/List/redux/actions';
import { franchiseBillManagementListSelector } from '@app/pages/FranchiseBillManagement/List/redux/selector';
import { REDUX_KEY, GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE } from '@shared/shared/constants';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import { ROUTE } from '@app/routes';
import { getLangKey } from '@shared/i18n';
import { Filter, Table, PageHeader } from './components';
import { getFranchiseBillManagementListRequestParams } from './utils';

const reduxKey = REDUX_KEY.FRANCHISE_BILL_MANAGEMENT.LIST;

const FranchiseBillManagementPage = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_BILL_MANAGEMENT_LIST.name, squad: ROUTE.FRANCHISE_BILL_MANAGEMENT_LIST.squad });

  const data = useSelector(franchiseBillManagementListSelector.getData);
  const isPending = useSelector(franchiseBillManagementListSelector.getIsPending);
  const total = useSelector(franchiseBillManagementListSelector.getTotal);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const [filters, setFilters] = useState({
    selectedFranchiseId: undefined,
    selectedWarehouseIds: [],
    selectedDomainTypes: [GETIR_10_DOMAIN_TYPE, GETIR_MARKET_DOMAIN_TYPE],
    selectedRequestTimeRange: [
      moment().subtract(30, 'days'),
      moment().endOf('day'),
    ],
  });
  const [domainTypes, setDomainTypes] = useState(filters.selectedDomainTypes);

  const franchiseBillManagementListRequest = useCallback(() => {
    const { currentPage, rowsPerPage } = pagination;
    const requestParams = getFranchiseBillManagementListRequestParams({
      ...filters,
      currentPage,
      rowsPerPage,
    });
    dispatch(Creators.getFranchiseBillManagementListRequest(requestParams));
  }, [dispatch, filters, pagination]);

  useEffect(() => {
    franchiseBillManagementListRequest();
  }, [franchiseBillManagementListRequest]);

  const exportFranchiseBillManagementListRequest = () => {
    const requestParams = getFranchiseBillManagementListRequestParams(filters);
    dispatch(Creators.exportFranchiseBillListRequest({
      ...requestParams,
      lang: getLangKey(),
      domainTypes,
    }));
  };

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    if (currentPage !== pagination.currentPage || rowsPerPage !== pagination.rowsPerPage) {
      setPagination({ currentPage, rowsPerPage });
    }
  };

  const handleSubmit = filter => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setFilters(filter);
  };

  return (
    <>
      <PageHeader exportFranchiseBillManagementListRequest={exportFranchiseBillManagementListRequest} />
      <Filter
        filters={filters}
        isPending={isPending}
        handleSubmit={handleSubmit}
        domainTypes={domainTypes}
        setDomainTypes={setDomainTypes}
      />
      <Table
        data={data}
        total={total}
        isPending={isPending}
        pagination={pagination}
        handlePaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default FranchiseBillManagementPage;
