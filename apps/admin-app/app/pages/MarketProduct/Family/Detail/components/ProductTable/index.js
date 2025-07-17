import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';

import { tableColumns } from './config';
import { Table } from '@shared/components/GUI';

import useStyles from './styles';

const ProductTable = ({ data }) => {
  const { t } = useTranslation('marketProductFamilyPage');
  const classes = useStyles();

  const initialPagination = { page: 1, pageSize: 10 };

  const [currentPage, setCurrentPage] = useState(initialPagination.page);
  const [currentPageSize, setCurrentPageSize] = useState(initialPagination.pageSize);

  const handlePaginationChange = (page, pageSize) => {
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
      rowClassName={record => (record?.isLeadProduct ? classes.lead : '')}
      onPaginationChange={handlePaginationChange}
      currentPage={currentPage}
      currentPageSize={currentPageSize}
      total={data?.count}
      isBEPaginationAvailable
      title={t('PRODUCT_TABLE.TITLE')}
      data-testId="family-product-table"
    />
  );
};

export default ProductTable;
