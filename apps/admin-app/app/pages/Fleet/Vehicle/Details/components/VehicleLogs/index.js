import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { Creators } from '../../redux/action';
import { vehicleLogsSelector } from '../../redux/selector';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { getWarehousesSelector } from '@shared/containers/Select/Warehouse/redux/selectors';

const VehicleLogs = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['marketVehicle', 'global']);
  const { id } = useParams();
  const { vehicleUpdateLogs, totalCount } = useSelector(vehicleLogsSelector.getData);
  const isPending = useSelector(vehicleLogsSelector.getIsPending);
  const cities = useSelector(getCitiesSelector.getData);
  const warehouses = useSelector(getWarehousesSelector.getData);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    setPagination({ currentPage, rowsPerPage });
  };

  useEffect(() => {
    const { currentPage, rowsPerPage } = pagination;
    const body = {
      limit: rowsPerPage,
      offset: (currentPage - 1) * rowsPerPage,
      vehicleIds: [id],
      withTotalCount: true,
    };
    dispatch(Creators.getVehicleLogsRequest({ body }));
  }, [dispatch, id, pagination]);

  return (
    <AntTableV2
      data={vehicleUpdateLogs}
      columns={tableColumns({ t, cities, warehouses })}
      loading={isPending}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      total={totalCount}
      scroll={{ y: 300, x: 'max-content' }}
    />
  );
};

export default VehicleLogs;
