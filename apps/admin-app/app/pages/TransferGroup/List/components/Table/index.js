import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { transferGroupsSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';

const TransferGroupListTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(transferGroupsSelector.getData) || [];
  const isPending = useSelector(transferGroupsSelector.getIsPending);
  const { t } = useTranslation('transferGroupPage');
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    dispatch(Creators.getTransferGroupsRequest({ ...getLimitAndOffset(pagination) }));
  }, [pagination.currentPage, pagination.rowsPerPage]);

  return (
    <>
      <AntTable
        title={t('TRANSFER_GROUPS')}
        data={data}
        columns={tableColumns(t)}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        // TODO: total should be come from backend
        // total={total}
        // totalBadge={{ total: total, label: t('RESULT') }}
      />
    </>
  );
};

export default TransferGroupListTable;
