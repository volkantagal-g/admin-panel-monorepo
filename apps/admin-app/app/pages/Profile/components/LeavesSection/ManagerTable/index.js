import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';

import { useSearchParams } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { Creators } from '../../../redux/actions';
import { employeesForManagerSelector, permitRequestsForSupervisorSelector } from '../../../redux/selectors';
import { getTableColumns } from './config';
import { useCursorPagination } from '@shared/hooks';
import { isEmptyObject } from '@shared/utils/common';

const PermitRequestTable = ({ onPermitDetailClick, onApproveBtnClick, onRejectBtnClick, isActionResultPending }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation(['global', 'employeePage']);
  const { limit = 10, nextPageCursor, previousPageCursor } = useSelector(permitRequestsForSupervisorSelector.getPaginationData);
  const data = useSelector(permitRequestsForSupervisorSelector.getData);
  const isPending = useSelector(permitRequestsForSupervisorSelector.getIsPending);
  const filtersData = useSelector(permitRequestsForSupervisorSelector.getFilters);
  const employees = useSelector(employeesForManagerSelector.getData);

  const handleLimitChange = value => {
    dispatch(Creators.setPaginationForPermitRequestsForSupervisor({ pagination: { limit: value } }));
    dispatch(Creators.getPermitRequestsForSupervisorRequest({ limit: value }));
  };
  const handleNextBtnClick = () => {
    dispatch(Creators.getPermitRequestsForSupervisorRequest({ limit, nextPageCursor }));
  };
  const handlePreviousBtnClick = () => {
    dispatch(Creators.getPermitRequestsForSupervisorRequest({ limit, previousPageCursor }));
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

  const tableColumns = useMemo(() => getTableColumns({
    t,
    employees,
    filters: filtersData,
    handlePermitDetailBtnClick: onPermitDetailClick,
    handleApproveBtnClick: onApproveBtnClick,
    handleRejectBtnClick: onRejectBtnClick,
    isPending: isActionResultPending,
  }), [t, employees, filtersData, onPermitDetailClick, onRejectBtnClick, onApproveBtnClick, isActionResultPending]);

  // eslint-disable-next-line no-unused-vars
  const handleOnChange = (_, filters) => {
    if (filters?.status) {
      searchParams.set('status', filters.status.join(','));
    }
    else {
      searchParams.delete('status');
    }
    setSearchParams(searchParams);
    dispatch(Creators.setFiltersForPermitRequestsForSupervisor({ filters }));
    dispatch(Creators.getPermitRequestsForSupervisorRequest({ filters, limit }));
  };

  const resetFilters = () => {
    searchParams.delete('status');
    setSearchParams(searchParams);
    dispatch(Creators.resetFiltersForPermitRequestsForSupervisor());
    dispatch(Creators.getPermitRequestsForSupervisorRequest({ filters: {}, limit }));
  };

  return (
    <div>
      <AntTableV2
        size="small"
        data={data}
        columns={tableColumns}
        loading={isPending}
        scroll={{ y: 500 }}
        pagination={false}
        onChange={handleOnChange}
      />
      <div className="d-flex justify-content-end">
        {!isEmptyObject(filtersData) && <Button type="primary" onClick={resetFilters} icon={<RollbackOutlined />} className="mr-2">Reset filters</Button>}
        {pagination}
      </div>
    </div>
  );
};

export default PermitRequestTable;
