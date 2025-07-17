import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import AntCard from '@shared/components/UI/AntCard';
import PermitDetailModal from '@app/pages/Employee/components/Permit/DetailModal';
import { useCursorPagination } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import { filterSelector, filteredPermitsSelector, actionButtonSelector } from '../../redux/selectors';
import { getTableColumns } from './config';

const PermitTable = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'employeePage']);
  const { limit, nextPageCursor, previousPageCursor } = useSelector(filterSelector.getPagination);
  const data = useSelector(filteredPermitsSelector.getData);
  const isPending = useSelector(filteredPermitsSelector.getIsPending);
  const [selectedPermit, setSelectedPermit] = useState();
  const isActionSucceeded = useSelector(actionButtonSelector.getIsSucceeded);
  const isActionResultPending = useSelector(actionButtonSelector.getIsPending);

  const memoizedHandlePermitDetailBtnClick = useCallback(({ permit }) => {
    setSelectedPermit(permit._id);
  }, []);

  const handlePermitDetailModalClose = ({ isDataNeedToBeRefresh = false } = {}) => {
    setSelectedPermit();
    dispatch(Creators.actionButtonReset());
    if (isDataNeedToBeRefresh) {
      dispatch(Creators.getFilteredPermitsRequest({}));
    }
  };

  const handleLimitChange = value => {
    dispatch(Creators.setPagination({ pagination: { limit: value } }));
    dispatch(Creators.getFilteredPermitsRequest({}));
  };
  const handleNextBtnClick = () => {
    dispatch(Creators.getFilteredPermitsRequest({ nextPageCursor }));
  };
  const handlePreviousBtnClick = () => {
    dispatch(Creators.getFilteredPermitsRequest({ previousPageCursor }));
  };
  const handleApprove = ({ permitId }) => {
    dispatch(Creators.approvePermitRequest({ permitId }));
  };
  const handleReject = ({ permitId }) => {
    dispatch(Creators.rejectPermitRequest({ permitId }));
  };
  const handleCancel = ({ permitId }) => {
    dispatch(Creators.cancelPermitRequest({ permitId }));
  };
  const handleCancelRequest = ({ permitId }) => {
    dispatch(Creators.cancelRequestedPermitRequest({ permitId }));
  };

  const pagination = useCursorPagination({
    hasPrev: previousPageCursor,
    hasNext: nextPageCursor,
    isLoading: isPending,
    handleNext: handleNextBtnClick,
    handlePrevious: handlePreviousBtnClick,
    handleLimit: handleLimitChange,
    limit,
  });

  const tableColumns = useMemo(() => getTableColumns({
    t,
    handlePermitDetailBtnClick: memoizedHandlePermitDetailBtnClick,
  }), [t, memoizedHandlePermitDetailBtnClick]);

  return (
    <>
      <AntCard data-testid="permitsTableWrapper">
        <AntTableV2
          data={data}
          columns={tableColumns}
          loading={isPending}
          pagination={false}
        />
        {pagination}
      </AntCard>
      {
        selectedPermit && (
          <PermitDetailModal
            permitId={selectedPermit}
            onClose={handlePermitDetailModalClose}
            changeStatusPermKey={permKey.PAGE_EMPLOYEE_PERMIT_LIST_COMPONENT_CHANGE_LEAVE_STATUS}
            onApprove={handleApprove}
            onReject={handleReject}
            onCancel={handleCancel}
            onCancelRequest={handleCancelRequest}
            isActionSucceeded={isActionSucceeded}
            isActionResultPending={isActionResultPending}
          />
        )
      }
    </>
  );
};

export default PermitTable;
