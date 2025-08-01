import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { getMarketProductSubCategoriesSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';

const MarketProductSubCategoryListTable = ({ queryText, status }) => {
  const dispatch = useDispatch();
  const data = useSelector(getMarketProductSubCategoriesSelector.getData) || [];
  const isPending = useSelector(getMarketProductSubCategoriesSelector.getIsPending);
  const { t } = useTranslation('marketProductCategoryPage');
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    dispatch(Creators.getMarketProductSubCategoriesRequest({ ...getLimitAndOffset(pagination), queryText, status }));
  }, [pagination.currentPage, pagination.rowsPerPage, queryText, status]);

  return (
    <>
      <AntTable
        title={t('SUB_CATEGORIES')}
        data={data}
        columns={tableColumns}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default MarketProductSubCategoryListTable;
