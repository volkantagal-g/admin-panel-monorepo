import { memo, useEffect, useRef } from 'react';
import {
  forEach as _forEach,
  get as _get,
  set as _set,
} from 'lodash';
import moment from 'moment-timezone';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  GETIR_DRIVE_EXTERNAL_SOURCE,
  GETIR_DRIVE_EXTERNAL_SOURCE_MOOV,
  GETIR_DRIVE_EXTERNAL_SOURCE_GETIR,
  GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI,
} from '@shared/shared/constants';
import { numberFormat } from '@shared/utils/localization';
import { netRevenueTimeSeriesSelector } from '../../../redux/selectors';
import { getDefaultChartOptions, getTimeSeriesMap } from '../../../chartUtils';
import useStyles from './styles';

function RevenueChart({
  dateRange,
  hourRange,
  dateType,
}) {
  const { t } = useTranslation('getirDriveDashboardPage');
  const chartRef = useRef();
  const netRevenueTimeSeries = useSelector(netRevenueTimeSeriesSelector.getData);
  const netRevenueTimeSeriesIsPending = useSelector(netRevenueTimeSeriesSelector.getIsPending);
  const classes = useStyles();

  const { startDate, endDate } = dateRange;
  const [minHour, maxHour] = hourRange;

  const chartOptions = getDefaultChartOptions();
  const timeSeriesMap = getTimeSeriesMap({
    startDate,
    endDate,
    minHour,
    maxHour,
    dateType,
  });

  const moovRawData = _get(netRevenueTimeSeries, GETIR_DRIVE_EXTERNAL_SOURCE_MOOV, []);
  const getirRawData = _get(netRevenueTimeSeries, GETIR_DRIVE_EXTERNAL_SOURCE_GETIR, []);
  const bitaksiRawData = _get(netRevenueTimeSeries, GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI, []);
  const moovChartData = [];
  const getirChartData = [];
  const bitaksiChartData = [];
  let totalNetRevenueTaxExcluded = 0;

  useEffect(() => {
    chartRef.current.chart.showLoading();
    if (!netRevenueTimeSeriesIsPending) {
      chartRef.current.chart.hideLoading();
    }
  }, [netRevenueTimeSeriesIsPending]);

  _forEach(moovRawData, ({
    start_date_timezone: startDateIsoString,
    net_revenue_tax_excluded: netRevenueTaxExcluded,
  }) => {
    totalNetRevenueTaxExcluded += netRevenueTaxExcluded || 0;
    _set(
      timeSeriesMap,
      [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_MOOV],
      _get(timeSeriesMap, [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_MOOV], 0) + (netRevenueTaxExcluded || 0),
    );
  });
  _forEach(getirRawData, ({
    start_date_timezone: startDateIsoString,
    net_revenue_tax_excluded: netRevenueTaxExcluded,
  }) => {
    totalNetRevenueTaxExcluded += netRevenueTaxExcluded || 0;
    _set(
      timeSeriesMap,
      [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_GETIR],
      _get(timeSeriesMap, [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_GETIR], 0) + (netRevenueTaxExcluded || 0),
    );
  });
  _forEach(bitaksiRawData, ({
    start_date_timezone: startDateIsoString,
    net_revenue_tax_excluded: netRevenueTaxExcluded,
  }) => {
    totalNetRevenueTaxExcluded += netRevenueTaxExcluded || 0;
    _set(
      timeSeriesMap,
      [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI],
      _get(timeSeriesMap, [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI], 0) + (netRevenueTaxExcluded || 0),
    );
  });
  _forEach(timeSeriesMap, ({
    timestamp,
    [GETIR_DRIVE_EXTERNAL_SOURCE_MOOV]: moovData,
    [GETIR_DRIVE_EXTERNAL_SOURCE_GETIR]: getirData,
    [GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI]: bitaksiData,
  }) => {
    moovChartData.push([timestamp, moovData]);
    getirChartData.push([timestamp, getirData]);
    bitaksiChartData.push([timestamp, bitaksiData]);
  });
  chartOptions.series[0] = {
    name: GETIR_DRIVE_EXTERNAL_SOURCE.MOOV,
    color: '#24B7E6',
    data: moovChartData,
  };
  chartOptions.series[1] = {
    name: GETIR_DRIVE_EXTERNAL_SOURCE.GETIR,
    color: '#5D3EBC',
    data: getirChartData,
  };
  chartOptions.series[2] = {
    name: GETIR_DRIVE_EXTERNAL_SOURCE.BITAKSI,
    color: '#FFD10D',
    data: bitaksiChartData,
  };

  return (
    <>
      <div className={classes.header}>
        <div className={classes.headerText}>
          {t('getirDriveDashboardPage:REVENUE_CHART_HEADER')}
        </div>
        <div>
          <span className={classes.headerTextLight}>
            {t('getirDriveDashboardPage:TOTAL_REVENUE')}:&nbsp;
          </span>
          <span className={classes.headerText}>
            {numberFormat({ maxDecimal: 0 }).format(totalNetRevenueTaxExcluded)}
          </span>
        </div>
      </div>
      <HighchartsReact
        key="revenueChart"
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
    </>
  );
}

export default memo(RevenueChart);
