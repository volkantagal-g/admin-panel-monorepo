import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { getMarketProductFamilyListSelector } from '@app/pages/MarketProduct/Family/redux/selectors';
import { tableColumns } from './config';
import { Table } from '@shared/components/GUI';

import { Creators } from '@app/pages/MarketProduct/Family/redux/actions';

const FamilyTable = ({ formValues }) => {
  const { t } = useTranslation('marketProductFamilyPage');
  const dispatch = useDispatch();

  const initialPagination = { page: 1, pageSize: 10 };

  const [currentPage, setCurrentPage] = useState(initialPagination.page);
  const [currentPageSize, setCurrentPageSize] = useState(initialPagination.pageSize);

  const data = useSelector(getMarketProductFamilyListSelector.getData);
  const isPending = useSelector(getMarketProductFamilyListSelector.getIsPending);

  const loading = isPending;

  const handlePaginationChange = (page, pageSize) => {
    const limit = pageSize || 0;
    const modifiedParams = {
      ...formValues,
      page,
      limit,
    };
    dispatch(Creators.getMarketProductFamilyListRequest({ ...modifiedParams }));
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
  };

  useEffect(() => {
    setCurrentPage(initialPagination.page);
    setCurrentPageSize(initialPagination.pageSize);
  }, [initialPagination.page, initialPagination.pageSize]);

  return (
    <Table
      data={data}
      columns={tableColumns(t)}
      loading={loading}
      onPaginationChange={handlePaginationChange}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      total={data?.count}
      isBEPaginationAvailable
      title={t('TITLES.LIST')}
      data-testId="market-product-family-table"
    />
  );
};

export default FamilyTable;
