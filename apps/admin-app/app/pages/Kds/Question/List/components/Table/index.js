import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import AntTable from '@shared/components/UI/AntTable';
import { kdsQuestionListSelector } from '@app/pages/Kds/Question/List/redux/selector';
import { Creators } from '@app/pages/Kds/Question/List/redux/actions';
import { getLimitAndOffset } from '@shared/utils/common';
import { _getTableColumns } from './config';

const Table = () => {
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });
  const tableColumns = _getTableColumns();
  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    dispatch(Creators.getKdsQuestionListRequest({ ...getLimitAndOffset(pagination) }));
  }, [pagination.currentPage, pagination.rowsPerPage]);

  const data = useSelector(kdsQuestionListSelector.getData);
  const isPending = useSelector(kdsQuestionListSelector.getIsPending);
  const total = useSelector(kdsQuestionListSelector.getTotal);

  return (
    <>
      <AntTable
        data={data}
        columns={tableColumns}
        total={total}
        pagination={pagination}
        loading={isPending}
        rowKey="_id"
        onPaginationChange={handlePaginationChange} />
    </>
  );
};

export default Table;
