import { useCallback, useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { isEmpty, isNumber as _isNumber } from 'lodash';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';
import {
  GETIR_10_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE, GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
} from '@shared/shared/constants';

import {
  filtersSelector,
  tableDataSelector,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import { tableColumns } from './config';
import useStyles from './styles';
import { PaginationType } from '../../orderGrowthMonitoring';

const TableComponent = () => {
  const { canAccess } = usePermission();
  const dispatch = useDispatch();
  const hasAccessToViewFinancial: boolean = canAccess(permKey.PAGE_LIVE_MONITORING_COMPONENT_VIEW_FINANCIALS);
  const classes = useStyles();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    rowsPerPage: 10,
  });
  const navigate = useNavigate();
  const { pathname: url } = useLocation();

  const filters = useSelector(filtersSelector.getData);
  const tableData = useSelector(tableDataSelector.getData);
  const tableDataTotalCount = useSelector(tableDataSelector.getTotalCount);

  const orderOfDomainTypes = [
    GETIR_10_DOMAIN_TYPE,
    GETIR_MARKET_DOMAIN_TYPE,
    GETIR_FOOD_DOMAIN_TYPE,
    GETIR_VOYAGER_DOMAIN_TYPE,
    GETIR_LOCALS_DOMAIN_TYPE,
  ];
  const filteredDomainTypes = isEmpty(filters?.selectedDomainTypes) ? orderOfDomainTypes :
    orderOfDomainTypes.filter(domainType => filters?.selectedDomainTypes?.includes(domainType));

  const handleCityClick = useCallback(cityId => {
    navigate(`${url}?selectedCity=${cityId}`);
  }, [navigate, url]);

  const handleCSVExport = useCallback(({ domainType }: {domainType: number}) => {
    const filteredCSVData = tableData.filter(data => data?.rowFirst?.operationalDomainTypes?.includes(domainType));
    dispatch(Creators.exportCSVRequest({ domainType, dataToExport: filteredCSVData }));
  }, [dispatch, tableData]);

  const columns = useMemo(() => {
    return tableColumns({
      selectedCity: filters?.selectedCity,
      hasAccessToViewFinancial,
      classes,
      filteredDomainTypes,
      handleCityClick,
      handleCSVExport,
    });
  }, [filters?.selectedCity, hasAccessToViewFinancial, classes, filteredDomainTypes, handleCityClick, handleCSVExport]);

  useEffect(() => {
    setPagination(prevState => ({
      ...prevState,
      currentPage: 1,
    }));
  }, [filters?.selectedCity, filters?.selectedDomainTypes, filters?.selectedWarehouses]);

  const handlePaginationChange = (paginationData: { current: number, pageSize: number }) => {
    setPagination({
      currentPage: _isNumber(paginationData.current) ? paginationData.current : pagination.currentPage,
      rowsPerPage: _isNumber(paginationData.pageSize) ? paginationData.pageSize : pagination.rowsPerPage,
    });
  };

  return (
    <AntTableV2
      data={tableData}
      columns={columns}
      total={tableDataTotalCount}
      pagination={{ pageSize: pagination.rowsPerPage, current: pagination.currentPage }}
      onChange={handlePaginationChange}
      showFrontendPagination
      showSorterTooltip={false}
      className={classes.table}
    />
  );
};

export default TableComponent;
