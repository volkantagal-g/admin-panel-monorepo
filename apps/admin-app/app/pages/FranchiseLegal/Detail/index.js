import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router';

import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { useInitAndDestroyPage, usePageViewAnalytics } from '@shared/hooks';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { Filter, Table, Header, PieChart, ReminderHistoryTable } from './components/index';
import { Creators } from './redux/actions';
import { ROUTE } from '@app/routes';
import { getFranchiseLegalDetailSelector } from './redux/selector';
import { getLimitAndOffset } from '@shared/utils/common';
import { removeEmptyProperties } from './utils';

const reduxKey = REDUX_KEY.FRANCHISE_LEGAL.DETAIL;

const ListFranchiseLegal = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });
  usePageViewAnalytics({ name: ROUTE.FRANCHISE_LEGAL_DETAIL.name, squad: ROUTE.FRANCHISE_LEGAL_DETAIL.squad });

  const { agreementId } = useParams();

  const isPendingTable = useSelector(getFranchiseLegalDetailSelector.getIsTableRequestPending);
  const isPendingLegalAgreement = useSelector(getFranchiseLegalDetailSelector.getIsPending);
  const tableData = useSelector(getFranchiseLegalDetailSelector.getTableData);
  const totalTableData = useSelector(getFranchiseLegalDetailSelector.getTotal);
  const historyData = useSelector(getFranchiseLegalDetailSelector.getHistoryData);
  const agreementDetails = useSelector(getFranchiseLegalDetailSelector.getAgreementDetailData);
  const isHistoryTableRequestPending = useSelector(getFranchiseLegalDetailSelector.getIsHistoryTableRequestPending);

  const isPending = isPendingTable || isPendingLegalAgreement;
  const [filters, setFilters] = useState({
    status: undefined,
    franchiseIds: [],
  });

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 50 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const handleSubmit = filter => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setFilters(filter);
  };

  const getLegalAgreementTableData = useCallback(() => {
    const { limit, offset } = getLimitAndOffset(pagination);
    const payload = removeEmptyProperties(filters);
    dispatch(Creators.getFranchiseLegalAgreementTableRequest({ offset, limit, filters: payload, agreementId }));
  }, [dispatch, filters, pagination, agreementId]);

  useEffect(() => {
    getLegalAgreementTableData();
  }, [getLegalAgreementTableData]);

  const getLegalAgreementDetail = useCallback(() => {
    dispatch(Creators.getFranchiseLegalAgreementDetailRequest({ id: agreementId }));
    dispatch(Creators.getLegalNotificationHistoryRequest({ id: agreementId }));
  }, [dispatch, agreementId]);

  useEffect(() => {
    getLegalAgreementDetail();
  }, [getLegalAgreementDetail]);

  return (
    <>
      <Header isPending={isPending} agreementDetails={agreementDetails} agreementId={agreementId} />
      <PieChart data={agreementDetails?.acceptanceRateData} isPending={isPendingLegalAgreement} />
      <ReminderHistoryTable tableData={historyData} isPending={isHistoryTableRequestPending} />
      <Filter filters={filters} isPending={isPending} handleSubmit={handleSubmit} />
      <Table
        isPending={isPending}
        tableData={tableData}
        totalTableData={totalTableData}
        pagination={pagination}
        handlePaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default ListFranchiseLegal;
