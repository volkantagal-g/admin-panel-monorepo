import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getPaginatedData } from '@shared/utils/table';

const ErrorDetailTable = ({ errors, isVisible }) => {
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 5,
  });
  const { t } = useTranslation(['payoutsForDomains']);

  const columns = [
    {
      title: t('payoutsForDomains:STATUS_CODE'),
      dataIndex: 'StatusCode',
      key: 'StatusCode',
    },
    {
      title: t('payoutsForDomains:ERROR_EXPLANATION'),
      dataIndex: 'ErrorExplanation',
      key: 'ErrorExplanation',
    },
    {
      title: t('payoutsForDomains:TOTAL_COUNT'),
      dataIndex: 'TotalCount',
      key: 'TotalCount',
    },
    {
      title: t('payoutsForDomains:TOTAL_AMOUNT'),
      dataIndex: 'TotalAmount',
      key: 'TotalAmount',
    },
  ];

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  return (
    isVisible && (
    <AntTableV2
      className="mt-4"
      total={errors?.length}
      dataSource={getPaginatedData(
        errors,
        pagination.currentPage,
        pagination.rowsPerPage,
      )}
      columns={columns}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}

    />
    )
  );
};

export default ErrorDetailTable;
