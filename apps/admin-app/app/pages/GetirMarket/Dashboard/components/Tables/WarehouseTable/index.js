import { useState, memo, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';

import AnalyticsService from '@shared/services/analytics';
import { isMobile } from '@shared/utils/common';
import {
  getFilteredWarehousesForDivisionSelector,
  getDivisionsCitiesSelector,
  getCitiesSelector,
} from '@shared/redux/selectors/common';
import { filtersSelector, warehouseStatsV2Selector } from '../../../redux/selectors';
import { getColumns, getSummaryItems } from './config';
import { getFormattedData } from './utils';
import useStyles from './styles';
import useParentStyles from '../styles';
import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getRowClassName } from '../utils';
import { MARKET_DASHBOARD_EVENTS } from '../../../mixPanelEvents';
import TableFooter from '../TableFooter';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';

const LIMIT_ALL = 50000;
const ORDER_GROWTH_SUMMARY_TABLE_ALL_DOMAINS_HEIGHT = 278;

const WarehouseTable = () => {
  let heightOffset = 0;
  const orderGrowthSummaryTableHTMLElement = document.getElementById('OrderGrowthSummaryTable');
  if (orderGrowthSummaryTableHTMLElement) {
    const orderGrowthSummaryTableHeight = orderGrowthSummaryTableHTMLElement.offsetHeight;
    if (orderGrowthSummaryTableHeight < ORDER_GROWTH_SUMMARY_TABLE_ALL_DOMAINS_HEIGHT) {
      heightOffset = ORDER_GROWTH_SUMMARY_TABLE_ALL_DOMAINS_HEIGHT - orderGrowthSummaryTableHeight;
    }
  }
  const hasSelectedCountryGotADivision = getSelectedCountryDivision();
  const warehouseStatsData = useSelector(warehouseStatsV2Selector.getData);
  const warehouses = useSelector(getFilteredWarehousesForDivisionSelector.getData);
  const divisionsCities = useSelector(getDivisionsCitiesSelector.getData);
  const cities = useSelector(getCitiesSelector.getOperationalCities);
  const selectedDomainType = useSelector(filtersSelector.getSelectedDomainType);
  const selectedCities = useSelector(filtersSelector.getSelectedCities);
  const isWarehouseStatsPending = useSelector(warehouseStatsV2Selector.getIsPending);
  const isWarehousesPending = useSelector(getFilteredWarehousesForDivisionSelector.getIsPending);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const isDivisionsCitiesPending = useSelector(getDivisionsCitiesSelector.getIsPending);

  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [limit, setLimit] = useState(() => (isMobile() ? 10 : LIMIT_ALL));

  const { t } = useTranslation('getirMarketDashboardPage');
  const parentClasses = useParentStyles();
  const classes = useStyles();

  const onExpandClick = useCallback(
    rowKey => {
      AnalyticsService.track(MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.EVENT_NAME, {
        tableName: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.WAREHOUSE.NAME,
        button: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.WAREHOUSE.EXPAND,
      });
      if (expandedRowKeys.includes(rowKey)) setExpandedRowKeys(previousExpandedRows => previousExpandedRows.filter(key => key !== rowKey));
      else setExpandedRowKeys(previousExpandedRows => [...previousExpandedRows, rowKey]);
    },
    [expandedRowKeys],
  );

  const isPending = isWarehouseStatsPending || isWarehousesPending || isCitiesPending || isDivisionsCitiesPending;
  const columns = useMemo(() => getColumns({ t, classes: parentClasses, onExpandClick }), [parentClasses, onExpandClick, t]);
  const data = useMemo(
    () => (warehouseStatsData?.current && warehouses?.length && cities?.length
      ? getFormattedData({
        data: warehouseStatsData?.current,
        warehouses,
        cities: hasSelectedCountryGotADivision ? divisionsCities : cities,
        selectedDomainType,
        selectedCities,
      })
      : null),
    [cities, divisionsCities, hasSelectedCountryGotADivision, selectedCities, selectedDomainType, warehouseStatsData, warehouses],
  );
  const summaryItems = useMemo(() => getSummaryItems({ data: data?.totals }), [data]);

  const handleSort = (pagination, filters, sort) => {
    AnalyticsService.track(
      MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.EVENT_NAME,
      { button: MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.TABLE_SORTING.WAREHOUSE[sort?.columnKey] },
    );
  };

  const renderSummaryRow = () => {
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          {summaryItems.map((summaryData, index) => (
            <Table.Summary.Cell
              key={summaryData.key}
              index={index}
            >
              {summaryData.value}
            </Table.Summary.Cell>
          ))}
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  const handleLimit = limitNumber => {
    if (limitNumber === 'All') {
      setLimit(LIMIT_ALL);
    }
    else setLimit(limitNumber);
  };

  return (
    <AntTableV2
      data={data?.distribution}
      columns={columns}
      loading={isPending}
      className={`${classes.tableWrapper} ${parentClasses.warehouseTable} ${parentClasses.rightPaddingForScrollBar}`}
      containerClassName={parentClasses.antTableContainer}
      scroll={data?.distribution ? { y: 326 + heightOffset } : null}
      rowClassName={(_, index) => getRowClassName(parentClasses, index)}
      onChange={handleSort}
      expandable={{
        expandIconColumnIndex: -1,
        expandedRowKeys,
      }}
      showFooter={isMobile()}
      footer={(
        <TableFooter
          setLimit={handleLimit}
          limit={limit}
        />
      )}
      pageSize={limit}
      summary={renderSummaryRow}
      bordered
    />
  );
};

export default memo(WarehouseTable);
