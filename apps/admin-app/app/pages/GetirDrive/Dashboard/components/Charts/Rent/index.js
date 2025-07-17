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

import { rentTimeSeriesSelector } from '../../../redux/selectors';
import { getDefaultChartOptions, getTimeSeriesMap } from '../../../chartUtils';

import useStyles from './styles';

function RentChart({
  dateRange,
  hourRange,
  dateType,
}) {
  const { t } = useTranslation('getirDriveDashboardPage');
  const chartRef = useRef();
  const rentTimeSeries = useSelector(rentTimeSeriesSelector.getData);
  const rentTimeSeriesIsPending = useSelector(rentTimeSeriesSelector.getIsPending);
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

  const moovRawData = _get(rentTimeSeries, GETIR_DRIVE_EXTERNAL_SOURCE_MOOV, []);
  const getirRawData = _get(rentTimeSeries, GETIR_DRIVE_EXTERNAL_SOURCE_GETIR, []);
  const bitaksiRawData = _get(rentTimeSeries, GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI, []);
  const moovChartData = [];
  const getirChartData = [];
  const bitaksiChartData = [];
  let totalDemand = 0;
  let totalFinished = 0;
  let totalCanceled = 0;

  useEffect(() => {
    chartRef.current.chart.showLoading();
    if (!rentTimeSeriesIsPending) {
      chartRef.current.chart.hideLoading();
    }
  }, [rentTimeSeriesIsPending]);

  _forEach(moovRawData, ({
    start_date_timezone: startDateIsoString,
    demand,
    finished,
    canceled,
  }) => {
    totalDemand += demand || 0;
    totalFinished += finished || 0;
    totalCanceled += canceled || 0;
    _set(
      timeSeriesMap,
      [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_MOOV],
      _get(timeSeriesMap, [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_MOOV], 0) + (finished || 0),
    );
  });
  _forEach(getirRawData, ({
    start_date_timezone: startDateIsoString,
    demand,
    finished,
    canceled,
  }) => {
    totalDemand += demand || 0;
    totalFinished += finished || 0;
    totalCanceled += canceled || 0;
    _set(
      timeSeriesMap,
      [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_GETIR],
      _get(timeSeriesMap, [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_GETIR], 0) + (finished || 0),
    );
  });
  _forEach(bitaksiRawData, ({
    start_date_timezone: startDateIsoString,
    demand,
    finished,
    canceled,
  }) => {
    totalDemand += demand || 0;
    totalFinished += finished || 0;
    totalCanceled += canceled || 0;
    _set(
      timeSeriesMap,
      [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI],
      _get(timeSeriesMap, [moment(startDateIsoString).valueOf(), GETIR_DRIVE_EXTERNAL_SOURCE_BITAKSI], 0) + (finished || 0),
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
          {t('getirDriveDashboardPage:RENT')}
        </div>
        <div>
          <span className={classes.headerTextLight}>
            {t('getirDriveDashboardPage:DEMAND')}:&nbsp;
          </span>
          <span className={classes.headerText}>
            {numberFormat({ maxDecimal: 0 }).format(totalDemand)}
          </span>
          &nbsp;
          <span className={classes.headerTextLight}>
            {t('getirDriveDashboardPage:FINISHED')}:&nbsp;
          </span>
          <span className={classes.headerText}>
            {numberFormat({ maxDecimal: 0 }).format(totalFinished)}
          </span>
          &nbsp;
          <span className={classes.headerTextLight}>
            {t('getirDriveDashboardPage:CANCELED')}:&nbsp;
          </span>
          <span className={classes.headerText}>
            {numberFormat({ maxDecimal: 0 }).format(totalCanceled)}
          </span>
        </div>
      </div>
      <HighchartsReact
        key="rentChart"
        highcharts={Highcharts}
        options={chartOptions}
        ref={chartRef}
      />
    </>
  );
}

export default memo(RentChart);
