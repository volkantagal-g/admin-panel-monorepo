import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';

import { getTableColumns } from './config';
import {
  filtersSelector,
  getFilteredOrdersSelector,
  lastUsedFiltersSelector,
} from '../../redux/selectors';
import { usePermission } from '@shared/hooks';
import { Creators } from '../../redux/actions';
import { getLimitAndOffset } from '@shared/utils/common';
import { getDeviceTypes, getFilterStatuses, getIntegrationType } from '../Filter/utils';
import { GETIR_MARKET_DOMAIN_TYPE, INTEGRATION_TYPE, INTEGRATION_TYPES } from '@shared/shared/constants';
import { Table } from '@shared/components/GUI';

function FilteredOrdersTable({ isN11 }) {
  const dispatch = useDispatch();
  const { canAccess } = usePermission();
  const { t } = useTranslation('orderFilterPage');
  const orders = useSelector(getFilteredOrdersSelector.getData);
  const isPending = useSelector(getFilteredOrdersSelector.getIsPending);
  const {
    city,
    domainType,
    warehouse,
    selectedDateRange,
    status,
    errorCode,
    platforms,
    integrationType,
    pagination,
    referenceId,
    initialStatusForSuccessDuration,
    minDuration,
    maxDuration,
  } = useSelector(filtersSelector.getData);
  const lastUsedFilters = useSelector(lastUsedFiltersSelector);
  const { startDate, endDate } = selectedDateRange;
  const hasReferenceIdFilter = integrationType !== (INTEGRATION_TYPE.GETIR?.toString());

  const handlePaginationChange = ({ current: currentPage, pageSize: rowsPerPage }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
    const deviceTypes = getDeviceTypes(platforms);
    const paginationFilters = { ...getLimitAndOffset({ currentPage, rowsPerPage }) };
    dispatch(
      Creators.getFilteredOrdersRequest({
        ...paginationFilters,
        domainType: isN11 ? GETIR_MARKET_DOMAIN_TYPE : domainType,
        city,
        createdAtStart: moment(startDate).toISOString(),
        createdAtEnd: moment(endDate).toISOString(),
        warehouse,
        statuses: getFilterStatuses(status),
        errorCode,
        referenceId: hasReferenceIdFilter ? referenceId : null,
        deviceTypes: !isEmpty(deviceTypes) ? deviceTypes : null,
        integrationType: getIntegrationType(isN11 ? INTEGRATION_TYPE.N11.toString() : integrationType),
        excludedIntegrationTypes: !isN11 ? [INTEGRATION_TYPES.N11.toLowerCase()] : null,
        initialStatusForSuccessDuration,
        minDuration,
        maxDuration,
      }),
    );
  };
  const hasIntegration = !!(integrationType && integrationType !== INTEGRATION_TYPE.GETIR?.toString());
  const columns = useMemo(
    () => getTableColumns({ t, canAccess, pagination, hasIntegration, lastUsedFilters }),
    [t, pagination, canAccess, hasIntegration, lastUsedFilters],
  );

  return (
    <Table
      title={t('TITLE')}
      columns={columns}
      data={orders}
      data-testid="filtered-orders"
      loading={isPending}
      pagination={{
        ...pagination,
        total: 10000,
      }}
      onChange={handlePaginationChange}
      size="middle"
      scroll={{ y: 700 }}
    />
  );
}

export default FilteredOrdersTable;
