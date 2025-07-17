import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import AntTable from '@shared/components/UI/AntTable';
import { getLimitAndOffset } from '@shared/utils/common';
import { Creators } from '../../redux/actions';
import { warehousesBySegmentIdSelector } from '../../redux/selector';
import { tableColumns } from './config';

const WarehouseTable = ({ segmentData }) => {
  const { t } = useTranslation('warehouseSegmentPage');
  const dispatch = useDispatch();

  const warehouses = {
    data: useSelector(warehousesBySegmentIdSelector.getData),
    total: useSelector(warehousesBySegmentIdSelector.getTotal),
    isPending: useSelector(warehousesBySegmentIdSelector.getIsPending),
  };

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  const getWarehousesRequest = () => {
    if(segmentData?._id) {
      dispatch(Creators.getWarehousesBySegmentIdRequest({
        ...getLimitAndOffset(pagination),
        segmentId: segmentData?._id,
        segmentType: segmentData?.type,
      }));
    }
  };

  useEffect(() => {
    getWarehousesRequest();
  }, [pagination.currentPage, pagination.rowsPerPage, segmentData?._id]);

  return (
    <>
      <AntTable
        title={t('DETAIL.TABLE.TITLE')}
        data={warehouses.data}
        total={warehouses.total}
        columns={tableColumns()}
        loading={warehouses.isPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
      />
    </>
  );
};

WarehouseTable.propTypes = { segmentData: PropTypes.object };

export default WarehouseTable;
