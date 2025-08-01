import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Creators } from '../../redux/actions';
import { getMarketProductCategoriesSelector } from '../../redux/selectors';
import { tableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';

const MarketProductCategoryListTable = ({ domainType, queryText, status }) => {
  const dispatch = useDispatch();
  const data = useSelector(getMarketProductCategoriesSelector.getData) || [];
  const isPending = useSelector(getMarketProductCategoriesSelector.getIsPending);
  const { t } = useTranslation('marketProductCategoryPage');
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    dispatch(Creators.getMarketProductCategoriesRequest({ ...getLimitAndOffset(pagination), queryText, status, domainType }));
  }, [pagination.currentPage, pagination.rowsPerPage, queryText, status, domainType]);

  return (
    <AntTable
      title={t('CATEGORIES')}
      data={data}
      columns={tableColumns}
      loading={isPending}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default MarketProductCategoryListTable;
