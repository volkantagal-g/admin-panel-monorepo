import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { RollbackOutlined } from '@ant-design/icons';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { useCursorPagination } from '@shared/hooks';
import { Creators } from '../../../redux/actions';
import { getPermitHistorySelector } from '../../../redux/selectors';
import { getTableColumns } from './config';
import { isEmptyObject } from '@shared/utils/common';

const MyLeaveTable = ({ onPermitDetailClick }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'employeePage']);
  const { limit = 10, nextPageCursor, previousPageCursor } = useSelector(getPermitHistorySelector.getPaginationData);
  const data = useSelector(getPermitHistorySelector.getData);
  const isPending = useSelector(getPermitHistorySelector.getIsPending);
  const filtersData = useSelector(getPermitHistorySelector.getFilters);

  const handleLimitChange = value => {
    dispatch(Creators.setPaginationForPermitHistory({ pagination: { limit: value } }));
    dispatch(Creators.getPermitHistoryRequest({ limit: value }));
  };
  const handleNextBtnClick = () => {
    dispatch(Creators.getPermitHistoryRequest({ limit, nextPageCursor }));
  };
  const handlePreviousBtnClick = () => {
    dispatch(Creators.getPermitHistoryRequest({ limit, previousPageCursor }));
  };

  // eslint-disable-next-line no-unused-vars
  const handleOnChange = (_, filters) => {
    if (filters?.status) {
      searchParams.set('status', filters.status.join(','));
    }
    else {
      setSearchParams.delete('status');
    }
    setSearchParams(searchParams);
    dispatch(Creators.setFiltersForPermitHistory({ filters }));
    dispatch(Creators.getPermitHistoryRequest({ filters, limit }));
  };

  const resetFilters = () => {
    setSearchParams({});
    dispatch(Creators.resetFiltersForPermitHistory());
    dispatch(Creators.getPermitHistoryRequest({ filters: {}, limit }));
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
    handlePermitDetailBtnClick: onPermitDetailClick,
    filters: filtersData,
  }), [t, onPermitDetailClick, filtersData]);

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

export default MyLeaveTable;
