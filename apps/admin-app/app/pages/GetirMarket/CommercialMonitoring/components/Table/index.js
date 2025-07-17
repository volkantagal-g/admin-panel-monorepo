import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col, Card, Table, Typography } from 'antd';

import { usePermission } from '@shared/hooks';
import permKeys from '@shared/shared/permKey.json';
import { numberFormatWithoutDecimal, percentFormatWithTwoDecimal, currencyFormat } from '@shared/utils/localization';
import { getMarketProductsSelector } from '@shared/redux/selectors/common';
import { PAGE_SIZE_OPTIONS, TABLE_TYPES } from './constants';
import {
  productSaleStatsSelector,
  availabilitySelector,
  instantAvailabilitySelector,
  formattedTableDataSelector,
  tableFiltersSelector,
} from '../../redux/selectors';
import TableFilter from './components/Filter';
import useStyles from './styles';
import { getTableColumns } from './config';

const { Text } = Typography;
const currencyFormatterWithoutDecimal = currencyFormat({ maxDecimal: 0 });

const GetirMarketCommercialMonitoringMainTable = () => {
  const { t } = useTranslation(['global', 'commercialMonitoringPage']);
  const classes = useStyles();
  const { canAccess } = usePermission();

  const isProductSaleStatsPending = useSelector(productSaleStatsSelector.getIsPending);
  const isAvailabilityPending = useSelector(availabilitySelector.getIsPending);
  const isInstantAvailabilityPending = useSelector(instantAvailabilitySelector.getIsPending);
  const isMarketProductsPending = useSelector(getMarketProductsSelector.getIsPending);
  const tableFilters = useSelector(tableFiltersSelector.getAllFilters);
  const totalAvailabilityCounts = useSelector(availabilitySelector.getTotalAvailabilityCounts);
  const totalInstantAvailabilityCounts = useSelector(instantAvailabilitySelector.getTotalAvailabilityCounts);
  const formattedTableData = useSelector(formattedTableDataSelector);
  const hasPermissionToViewFinancial = canAccess(permKeys.PAGE_GETIR_MARKET_COMMERCIAL_MONITORING_VIEW_FINANCIAL);

  const [pagination, setPagination] = useState({ currentPage: 1, rowsPerPage: 10 });

  const tableColumns = useMemo(() => getTableColumns({
    t,
    classes,
    hasPermissionToViewFinancial,
    isProductSaleStatsPending,
    isAvailabilityPending,
    isInstantAvailabilityPending,
    pagination,
    tableType: tableFilters.tableType,
    nonFilteredSaleStats: formattedTableData.nonFilteredSaleStats,
  }), [
    t,
    classes,
    tableFilters.tableType,
    formattedTableData.nonFilteredSaleStats,
    hasPermissionToViewFinancial,
    isProductSaleStatsPending,
    isAvailabilityPending,
    isInstantAvailabilityPending,
    pagination,
  ]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ rowsPerPage: pageSize, currentPage: page });
  };

  const getSummaryRow = () => {
    return (
      <>
        <Table.Summary.Row key="totalStatsRow">
          <Table.Summary.Cell index={0} />
          <Table.Summary.Cell index={1} />
          {
            tableFilters.tableType === TABLE_TYPES.PRODUCT && (
              <>
                <Table.Summary.Cell index={2} />
                <Table.Summary.Cell index={3} />
              </>
            )
          }
          <Table.Summary.Cell index={4} />
          <Table.Summary.Cell index={5}>
            <b>{numberFormatWithoutDecimal.format(formattedTableData.totalStats.count ?? 0)}</b>
          </Table.Summary.Cell>
          {
            hasPermissionToViewFinancial && (
              <>
                <Table.Summary.Cell index={6}>
                  <b>{currencyFormatterWithoutDecimal.format(formattedTableData.totalStats.chargedAmount ?? 0)}</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                  <b>{currencyFormatterWithoutDecimal.format(formattedTableData.totalStats.netRevenue ?? 0)}</b>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}>
                  <b>{currencyFormatterWithoutDecimal.format(formattedTableData.totalStats.basketAmount ?? 0)}</b>
                </Table.Summary.Cell>
              </>
            )
          }
        </Table.Summary.Row>
        {
          formattedTableData.nonFilteredSaleStats.totalCount !== formattedTableData.totalStats.count && (
            <Table.Summary.Row key="nonFilteredSaleStats">
              <Table.Summary.Cell index={0} />
              <Table.Summary.Cell index={1} />
              {
                tableFilters.tableType === TABLE_TYPES.PRODUCT && (
                  <>
                    <Table.Summary.Cell index={2} />
                    <Table.Summary.Cell index={3} />
                  </>
                )
              }
              <Table.Summary.Cell index={4} />
              <Table.Summary.Cell index={5}>
                <b>{numberFormatWithoutDecimal.format(formattedTableData.nonFilteredSaleStats.totalCount ?? 0)}</b>
              </Table.Summary.Cell>
              {
                hasPermissionToViewFinancial && (
                  <>
                    <Table.Summary.Cell index={6}>
                      <b>{currencyFormatterWithoutDecimal.format(formattedTableData.nonFilteredSaleStats.chargedAmount ?? 0)}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={7}>
                      <b>{currencyFormatterWithoutDecimal.format(formattedTableData.nonFilteredSaleStats.netRevenue ?? 0)}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={8}>
                      <b>{currencyFormatterWithoutDecimal.format(formattedTableData.nonFilteredSaleStats.basketAmount ?? 0)}</b>
                    </Table.Summary.Cell>
                  </>
                )
              }
            </Table.Summary.Row>
          )
        }
      </>
    );
  };

  return (
    <>
      <TableFilter />
      <Card size="small" className={classes.tableCardWrapper}>
        <Row>
          <Col span={24}>
            <Text title={t('global:AVAILABILITY')}>
              {t('commercialMonitoringPage:TOTAL_AVAILABILITY_EXCEPT_SUPPLIER_SHORT')}:&nbsp;
              <b title={t('commercialMonitoringPage:EXCEPT_SUPPLIER_RELATED_PROBLEMS')}>
                {percentFormatWithTwoDecimal.format(totalAvailabilityCounts.totalAvailabilityExceptSupplierProblem ?? 0)}
              </b>
              (<b>{percentFormatWithTwoDecimal.format(totalAvailabilityCounts.totalCustomerAvailability ?? 0)}</b>)&nbsp;
            </Text>
            <Text title={t('global:CRITICAL_AVAILABILITY')}>
              {t('commercialMonitoringPage:TOTAL_CRITICAL_AVAILABILITY_SHORT')}:&nbsp;
              <b>{percentFormatWithTwoDecimal.format(totalAvailabilityCounts.totalCriticalAvailability ?? 0)}</b>&nbsp;
            </Text>
            <Text title={t('global:LIVE_AVAILABILITY')}>
              {t('commercialMonitoringPage:TOTAL_LIVE_AVAILABILITY_EXCEPT_SUPPLIER_SHORT')}:&nbsp;
              <b title={t('commercialMonitoringPage:EXCEPT_SUPPLIER_RELATED_PROBLEMS')}>
                {percentFormatWithTwoDecimal.format(totalInstantAvailabilityCounts.totalAvailabilityExceptSupplierProblem ?? 0)}
              </b>
              (<b>{percentFormatWithTwoDecimal.format(totalInstantAvailabilityCounts.totalCustomerAvailability ?? 0)}</b>)&nbsp;
            </Text>
            <Text title={t('commercialMonitoringPage:LIVE_CRITICAL_AVAILABILITY')}>
              {t('commercialMonitoringPage:TOTAL_LIVE_CRITICAL_AVAILABILITY_SHORT')}:&nbsp;
              <b>{percentFormatWithTwoDecimal.format(totalInstantAvailabilityCounts.totalCriticalAvailability ?? 0)}</b>&nbsp;
            </Text>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={formattedTableData.data}
              columns={tableColumns}
              loading={isMarketProductsPending || (isProductSaleStatsPending && isAvailabilityPending && isInstantAvailabilityPending)}
              size="middle"
              pagination={{
                pageSizeOptions: PAGE_SIZE_OPTIONS,
                total: formattedTableData.total,
                pageSize: pagination.rowsPerPage,
                current: pagination.currentPage,
                onChange: handlePaginationChange,
              }}
              summary={() => getSummaryRow()}
              scroll={{ y: 525, x: 'max-content' }}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default GetirMarketCommercialMonitoringMainTable;
