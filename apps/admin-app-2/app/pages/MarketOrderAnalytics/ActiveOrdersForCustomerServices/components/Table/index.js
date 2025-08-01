import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { availableDomainTypesForCountrySelector, availableIntegrationTypesForCountrySelector } from '@shared/redux/selectors/common';
import { usePermission } from '@shared/hooks';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { TEST_ID } from '../../constants';
import { generateTableColumns } from './config';
import { Creators } from '../../redux/actions';
import { activeOrdersForCustomerServicesSelector, filtersSelector } from '../../redux/selectors';
import useStyles from './styles';

const Table = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(['global', 'activeOrdersCommon']);
  const classes = useStyles();

  const activeOrders = useSelector(activeOrdersForCustomerServicesSelector.getData);
  const totalActiveOrders = useSelector(activeOrdersForCustomerServicesSelector.getTotalActiveOrders);
  const isDomainAvailabilityLoading = useSelector(availableDomainTypesForCountrySelector.getIsPending);
  const isIntegrationAvailabilityLoading = useSelector(availableIntegrationTypesForCountrySelector.getIsPending);
  const isPending = useSelector(activeOrdersForCustomerServicesSelector.getIsPending);
  const { canAccess } = usePermission();
  const pagination = useSelector(filtersSelector.getPagination);

  const tableColumns = useMemo(() => generateTableColumns({ t, pagination, canAccess }), [t, pagination, canAccess]);

  const handlePaginationChange = ({ currentPage, rowsPerPage }) => {
    dispatch(Creators.setPagination({ currentPage, rowsPerPage }));
    dispatch(Creators.getActiveOrdersForCustomerServicesRequest());
  };

  return (
    <AntTableV2
      title={t('ORDERS')}
      data={activeOrders}
      columns={tableColumns}
      loading={isPending || isDomainAvailabilityLoading || isIntegrationAvailabilityLoading}
      pagination={pagination}
      onPaginationChange={handlePaginationChange}
      className={classes.antTable}
      total={totalActiveOrders}
      data-testid={TEST_ID.TABLE.ORDERS}
    />
  );
};

export default Table;
