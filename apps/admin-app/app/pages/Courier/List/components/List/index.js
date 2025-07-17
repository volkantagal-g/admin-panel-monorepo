import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Creators } from '../../redux/actions';
import { courierListSelector } from '../../redux/selectors';
import Filter from '../Filter';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { tableColumns } from './config';
import { usePermission } from '@shared/hooks';
import useStyles from './styles';
import { GETIR_FINANCE_DOMAIN_TYPE } from '@shared/shared/constants';
import permKey from '@shared/shared/permKey.json';

const CourierList = () => {
  const { t } = useTranslation(['courierPage']);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { Can, canAccess } = usePermission();

  const hasGetirFinanceEmployeeRole = canAccess(permKey.PAGE_COURIER_DETAIL_COMPONENT_GETIR_FINANCE_EMPLOYEE);

  const [filters, setFilters] = useState({
    name: '',
    isLoggedIn: null,
    isActivated: null,
    status: null,
    domainTypes: hasGetirFinanceEmployeeRole ? [GETIR_FINANCE_DOMAIN_TYPE] : null,
  });
  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const data = useSelector(courierListSelector.getData);
  const totalCount = useSelector(courierListSelector.getCount);
  const isPending = useSelector(courierListSelector.getIsPending);

  const handlePaginationChange = newPagination => {
    setPagination(newPagination);
  };

  const handleFilter = newFilters => {
    setFilters({
      ...newFilters,
      ...(hasGetirFinanceEmployeeRole && { domainTypes: [GETIR_FINANCE_DOMAIN_TYPE] }),
    });
  };

  const columns = useMemo(() => tableColumns(t, Can), [t, Can]);

  useEffect(() => {
    dispatch(Creators.getCourierListRequest({ filters, pagination }));
  }, [dispatch, pagination, filters]);

  return (
    <div className={classes.tableColumn}>
      <Filter filters={filters} isPending={isPending} handleSubmit={handleFilter} />
      <AntTableV2
        title={t('COURIER_LIST')}
        data={data}
        columns={columns}
        loading={isPending}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        total={totalCount}
        isScrollableToTop={false}
      />
    </div>
  );
};

export default CourierList;
