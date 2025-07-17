import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { getMasterSubClassesSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';

const MasterSubClassTable = ({ queryText }) => {
  const dispatch = useDispatch();
  const data = useSelector(getMasterSubClassesSelector.getData) || [];
  const isPending = useSelector(getMasterSubClassesSelector.getIsPending);
  const { t } = useTranslation('marketProductMasterCategoryPage');
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    dispatch(Creators.getMasterSubClassesRequest({ ...getLimitAndOffset(pagination), queryText }));
  }, [pagination.currentPage, pagination.rowsPerPage, queryText]);

  return (
    <>
      <AntTable
        title={t('MASTER_SUB_CLASSES')}
        data={data}
        columns={tableColumns}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default MasterSubClassTable;
