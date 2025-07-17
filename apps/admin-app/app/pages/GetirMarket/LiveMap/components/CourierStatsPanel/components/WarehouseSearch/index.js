import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import {
  getCourierCountsDataSelector,
  filtersSelector,
  getCourierPlanViolationsSelector,
  noBreadStockWarehousesSelector,
  noRamadanPitaStockWarehousesSelector,
} from '../../../../redux/selectors';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { Creators } from '../../../../redux/actions';
import useDebounce from '@shared/shared/hooks/useDebounce';
import { usePrevious } from '@shared/hooks';
import useStyles from './styles';
import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '@app/pages/GetirMarket/LiveMap/mixPanelEvents';

const WarehouseSearch = ({ expandTableRows, collapseTableRows }) => {
  const dispatch = useDispatch();
  const rawData = useSelector(getCourierCountsDataSelector);
  const courierPlanViolations = useSelector(getCourierPlanViolationsSelector);
  const noBreadStockWarehouses = useSelector(noBreadStockWarehousesSelector);
  const noRamadanPitaStockWarehouses = useSelector(noRamadanPitaStockWarehousesSelector);
  const warehouses = useSelector(getFilteredWarehousesSelector.getData);
  const domainType = useSelector(filtersSelector.getDomainType);

  const classes = useStyles();
  const { t } = useTranslation('getirMarketLiveMapPage');

  const [searchedWarehouse, setSearchedWarehouse] = useState();

  const DEBOUNCE_DELAY = 600; // Delay duration in ms

  const debouncedSearchedWarehouse = useDebounce(searchedWarehouse, DEBOUNCE_DELAY);
  const prevDebouncedSearchedWarehouse = usePrevious(debouncedSearchedWarehouse);

  useEffect(() => {
    if (debouncedSearchedWarehouse && prevDebouncedSearchedWarehouse !== debouncedSearchedWarehouse) {
      expandTableRows();
    }
    if (prevDebouncedSearchedWarehouse && !debouncedSearchedWarehouse) {
      collapseTableRows();
    }
  }, [collapseTableRows, expandTableRows, debouncedSearchedWarehouse, prevDebouncedSearchedWarehouse]);

  useEffect(() => {
    if (rawData && warehouses?.length) {
      dispatch(
        Creators.formatCourierCountsTableRequest({
          warehouseSearch: debouncedSearchedWarehouse,
          domainType,
          rawData,
          courierPlanViolations,
          warehouses,
          noBreadStockWarehouses,
          noRamadanPitaStockWarehouses,
        }),
      );
    }
  }, [
    debouncedSearchedWarehouse,
    dispatch,
    rawData,
    courierPlanViolations,
    warehouses,
    domainType,
    noBreadStockWarehouses,
    noRamadanPitaStockWarehouses,
  ]);

  useEffect(() => {
    if (debouncedSearchedWarehouse) {
      AnalyticsService.track(LIVE_MAP_EVENTS.WAREHOUSE.SEARCH, { keyword: debouncedSearchedWarehouse, component: LIVE_MAP_EVENTS.WAREHOUSE.NAME });
    }
  }, [debouncedSearchedWarehouse]);

  return (
    <div className={classes.searchWrapper}>
      <Input
        onChange={e => setSearchedWarehouse(e.target.value)}
        size="small"
        placeholder={t('SEARCH_WAREHOUSE_PLACEHOLDER')}
        prefix={<SearchOutlined />}
        bordered={false}
        className={classes.searchInput}
        allowClear
      />
    </div>
  );
};

WarehouseSearch.defaultProps = {
  expandTableRows: () => { },
  collapseTableRows: () => { },
};

WarehouseSearch.propTypes = {
  expandTableRows: PropTypes.func,
  collapseTableRows: PropTypes.func,
};

export default WarehouseSearch;
