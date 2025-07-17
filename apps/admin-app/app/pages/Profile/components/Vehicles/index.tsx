import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getLimitAndOffset } from '@shared/utils/common';
// Redux
import { Creators } from '../../redux/actions';
import { getEmployeeVehiclesForProfileSelector } from '../../redux/selectors';

// Components
import AntTableV2 from '@shared/components/UI/AntTableV2';
import SectionTitle from '../SectionTitle';

import { getTableColumns } from './config';

export default function Vehicles() {
  const { t } = useTranslation(['profile', 'assetManagement']);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  const vehicles = useSelector(getEmployeeVehiclesForProfileSelector.getData);
  const totalCount = useSelector(
    getEmployeeVehiclesForProfileSelector.getTotalCount,
  );
  const isVehiclesLoading = useSelector(
    getEmployeeVehiclesForProfileSelector.getIsPending,
  );

  const tableColumns = getTableColumns({ t });

  useEffect(() => {
    dispatch(
      Creators.getEmployeeVehiclesForProfileRequest({ ...getLimitAndOffset(pagination) }),
    );
  }, [dispatch, pagination]);

  return (
    <div>
      {vehicles.length > 0 ? (
        <>
          <SectionTitle title={t('profile:COMPONENTS.VEHICLES.TITLE')} />
          <AntTableV2
            loading={isVehiclesLoading}
            columns={tableColumns}
            data={vehicles}
            pagination={pagination}
            onPaginationChange={setPagination}
            total={totalCount}
            scroll={{ y: '405px' }}
          />
        </>
      ) : null}
    </div>
  );
}
