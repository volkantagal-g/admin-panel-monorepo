import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { tableColumns } from './config';
import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import { brandsSelector } from '@app/pages/Brand/List/redux/selectors';

const BrandListTable = ({ brandName, status }) => {
  const { t } = useTranslation('brandPage');
  const dispatch = useDispatch();
  const data = useSelector(brandsSelector.getData);
  const isPending = useSelector(brandsSelector.getIsPending);
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    dispatch(Creators.getBrandsRequest({ ...getLimitAndOffset(pagination), name: brandName, status }));
  }, [pagination.currentPage, pagination.rowsPerPage, brandName, status]);

  return (
    <>
      <AntTable
        title={t('BRANDS')}
        data={data}
        columns={tableColumns}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
};

export default BrandListTable;
