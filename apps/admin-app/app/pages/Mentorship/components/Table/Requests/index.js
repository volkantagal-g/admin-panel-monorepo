import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RollbackOutlined } from '@ant-design/icons';

import { useSearchParams } from 'react-router-dom';

import { Button, Table } from '@shared/components/GUI';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { reduxKey } from './constants';
import { Creators } from './redux/actions';
import reducer from './redux/reducer';
import saga from './redux/saga';
import { tableColumns } from './config';
import WithdrawMentorshipModal from './WithdrawMentorshipModal';
import DeclineMentorshipModal from './DeclineMentorshipModal';
import { useCursorPagination, useInitAndDestroyPage } from '@shared/hooks';
import { filterMentorshipRequestsSelector } from './redux/selectors';
import { isEmptyObject } from '@shared/utils/common';

const getRequestStatusFilter = (requestStatusFilter, filtersData) => {
  if (requestStatusFilter) {
    return (Array.isArray(requestStatusFilter) ? requestStatusFilter : requestStatusFilter?.split(','));
  }
  return filtersData?.requestStatus;
};

const RequestsTable = ({ userData }) => {
  const isFirstLoad = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestStatusFilter = searchParams.get('requestStatusFilter');
  const dispatch = useDispatch();
  useInjectReducer({ key: reduxKey, reducer });
  useInjectSaga({ key: reduxKey, saga });
  useInitAndDestroyPage({ dispatch, Creators });

  const mentorshipRequests = useSelector(filterMentorshipRequestsSelector.getData);
  const isPending = useSelector(filterMentorshipRequestsSelector.getIsPending);
  const filtersData = useSelector(filterMentorshipRequestsSelector.getFilters);
  const { limit = 10, nextPageCursor, previousPageCursor } = useSelector(filterMentorshipRequestsSelector.getPaginationData);

  const requestStatus = getRequestStatusFilter(requestStatusFilter, filtersData);
  const { t } = useTranslation(['mentorshipPage', 'global']);
  const [selectedRequest, setSelectedRequest] = useState();
  const [isOpenDeclineModal, setIsOpenDeclineModal] = useState(false);
  const [isOpenWithdrawModal, setIsOpenWithdrawModal] = useState(false);

  const memoizedHandleAcceptMentorshipBtnClick = useCallback(({ request }) => {
    dispatch(Creators.acceptMentorshipRequest({ body: { request } }));
  }, [dispatch]);

  const memoizedHandleDeclineMentorshipBtnClick = useCallback(({ request }) => {
    setSelectedRequest(request);
    setIsOpenDeclineModal(true);
  }, []);

  const handleDeclineMentorshipModalClose = () => {
    setSelectedRequest();
    setIsOpenDeclineModal(false);
  };

  const handleDeclineMentorshipSubmit = values => {
    dispatch(Creators.declineMentorshipRequest({ body: { ...values, request: selectedRequest } }));
    setIsOpenDeclineModal(false);
  };

  const memoizedHandleWithdrawMentorshipBtnClick = useCallback(({ request }) => {
    setSelectedRequest(request);
    setIsOpenWithdrawModal(true);
  }, []);

  const handleWithdrawMentorshipClose = () => {
    setSelectedRequest();
    setIsOpenWithdrawModal(false);
  };

  const handleWithdrawMentorshipSubmit = values => {
    dispatch(Creators.withdrawMentorshipRequest({ body: { ...values, request: selectedRequest } }));
    setIsOpenWithdrawModal(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleOnChange = (_, filters) => {
    if (filters.requestStatus) {
      searchParams.set('requestStatusFilter', filters.requestStatus.join(','));
    }
    else {
      searchParams.delete('requestStatusFilter');
    }
    setSearchParams(searchParams);
    dispatch(Creators.setFilters({ filters }));
    dispatch(Creators.filterMentorshipRequestsRequest({ body: { filters, limit, mentorOrMenteeId: userData._id } }));
  };

  const resetFilters = () => {
    dispatch(Creators.resetFilters());
    dispatch(Creators.filterMentorshipRequestsRequest({ body: { filters: {}, limit, mentorOrMenteeId: userData._id } }));
  };

  const handleLimitChange = value => {
    dispatch(Creators.setPagination({ pagination: { limit: value } }));
    dispatch(Creators.filterMentorshipRequestsRequest({ body: { limit: value, mentorOrMenteeId: userData._id } }));
  };
  const handleNextBtnClick = () => {
    dispatch(Creators.filterMentorshipRequestsRequest({ body: { limit, nextPageCursor, mentorOrMenteeId: userData._id } }));
  };
  const handlePreviousBtnClick = () => {
    dispatch(Creators.filterMentorshipRequestsRequest({ body: { limit, previousPageCursor, mentorOrMenteeId: userData._id } }));
  };

  const pagination = useCursorPagination({
    limit,
    hasPrev: previousPageCursor,
    hasNext: nextPageCursor,
    isLoading: isPending,
    handleNext: handleNextBtnClick,
    handlePrevious: handlePreviousBtnClick,
    handleLimit: handleLimitChange,
  });

  useEffect(() => {
    if (isFirstLoad.current && userData._id) {
      dispatch(Creators.filterMentorshipRequestsRequest({ body: { filters: { requestStatus }, mentorOrMenteeId: userData._id } }));
    }
    return () => {
      isFirstLoad.current = false;
    };
  }, [dispatch, requestStatus, userData]);

  return (
    <div>
      <Table
        title={t('MENTORSHIP_REQUESTS')}
        data={mentorshipRequests}
        loading={isPending}
        columns={tableColumns({
          t,
          userData,
          requestStatusFilter: requestStatus,
          handleAcceptMentorshipBtnClick: memoizedHandleAcceptMentorshipBtnClick,
          handleDeclineMentorshipBtnClick: memoizedHandleDeclineMentorshipBtnClick,
          handleWithdrawMentorshipBtnClick: memoizedHandleWithdrawMentorshipBtnClick,
        })}
        pagination={false}
        onChange={handleOnChange}
        isBorderRounded
      />
      <div className="d-flex justify-content-end mt-2">
        {!isEmptyObject(filtersData) && (
          <Button
            className="mr-2"
            icon={<RollbackOutlined />}
            size="small"
            color="secondary"
            onClick={resetFilters}
          >{t('RESET_FILTERS')}
          </Button>
        )}
        {pagination}
      </div>
      <DeclineMentorshipModal
        isOpen={isOpenDeclineModal}
        isPending={isPending}
        onClose={handleDeclineMentorshipModalClose}
        onSubmit={handleDeclineMentorshipSubmit}
        fullName={selectedRequest?.mentee?.employeeId?.fullName}
      />
      <WithdrawMentorshipModal
        isOpen={isOpenWithdrawModal}
        isPending={isPending}
        onClose={handleWithdrawMentorshipClose}
        onSubmit={handleWithdrawMentorshipSubmit}
        fullName={selectedRequest?.mentor?.employeeId?.fullName}
      />
    </div>
  );
};

export default RequestsTable;
