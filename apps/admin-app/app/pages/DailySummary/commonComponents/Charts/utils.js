import { isEmpty, sumBy } from 'lodash';

import { numberFormat } from '@shared/utils/localization';
import { getFakeUTCDateInLocal, getFormattedColumnDate } from '../../utils';

function getBaseChartOptions({
  title = '',
  plotDecimalCount = 0,
  tooltipDecimalCount = 0,
  divideBy = 1,
  dateRanges,
  t,
}) {
  let decimalSuffix = '';
  if (divideBy === 1000000) {
    decimalSuffix = ` (${t('global:MILLION').toLowerCase()})`;
  }
  else if (divideBy === 1000) {
    decimalSuffix = ` (${(t('global:THOUSAND').toLowerCase())})`;
  }
  const titleWithSuffix = title + decimalSuffix;
  let chartCategories = [];
  if (dateRanges) {
    chartCategories = dateRanges.map(range => (
      getFormattedColumnDate(
        getFakeUTCDateInLocal(range.start),
        getFakeUTCDateInLocal(range.end),
      )
    )).reverse();
  }

  return ({
    chart: {
      type: 'spline',
      height: 300,
      spacing: [5, 2, 8, 2],
      zoomType: 'x',
    },
    credits: { enabled: false },
    title: { text: titleWithSuffix, pure: title },
    tooltip: {
      shared: true,
      crosshairs: true,
      valueDecimals: tooltipDecimalCount,
      pointFormatter() {
        return (
          `<span style='color:${this.color}'>●</span> ${this.series.name}: <b>${numberFormat({
            minDecimal: tooltipDecimalCount,
            maxDecimal: tooltipDecimalCount,
          }).format(this.y)}</b><br/>`
        );
      },
    },
    plotOptions: {
      spline: {
        marker: { enabled: false },
        dataLabels: {
          enabled: true,
          formatter: function dataLabelFormatter() {
            const dividedValue = this.y / divideBy;
            let toBeAppliedPlotDecimalCount = plotDecimalCount;
            if (dividedValue >= 100) {
              toBeAppliedPlotDecimalCount = 0;
            }

            return numberFormat({ minDecimal: toBeAppliedPlotDecimalCount, maxDecimal: toBeAppliedPlotDecimalCount }).format(dividedValue);
          },
        },
      },
    },
    xAxis: {
      categories: chartCategories,
      tickmarkPlacement: 'on',
    },
    yAxis: {
      visible: false,
      allowDecimals: false,
      title: { enabled: false },
      gridLineColor: '#eaeaea',
    },
  });
}

function fillEmptyDatesOfLine({ totalData, data }) {
  if (isEmpty(data) || isEmpty(totalData)) {
    return {};
  }
  const tempData = { ...data };
  Object.keys(totalData).forEach(dateKey => {
    if (!data[dateKey]) {
      tempData[dateKey] = 0;
    }
  });

  return tempData;
}

function getCalculatedTotalRowData({ lastSuccessfulDateRanges, rawData }) {
  const totalData = {};
  lastSuccessfulDateRanges.forEach(lastSuccessfulDateRange => {
    const summableData = rawData?.data || {};
    totalData[lastSuccessfulDateRange.start] = sumBy(Object.values(summableData), lastSuccessfulDateRange.start) || 0;
  });

  return totalData;
}

function fillEmptyDates({ lastSuccessfulDateRanges, rawData = {} }) {
  const data = {};
  lastSuccessfulDateRanges.forEach(lastSuccessfulDateRange => {
    data[lastSuccessfulDateRange.start] = rawData[lastSuccessfulDateRange.start] || 0;
  });

  return data;
}

function getPreparedChartData({ options: { data, configs, isPending } = {}, tableKey, lastSuccessfulDateRanges, chartViewStatusMap, t }) {
  const options = [];
  configs.forEach(config => {
    if (!chartViewStatusMap?.[tableKey]?.[config.dataKey]) {
      return;
    }

    const series = [];
    const rawData = data[config.dataKey] || {};
    const optionsTemplate = getBaseChartOptions({
      title: config.name,
      divideBy: config.divideBy,
      plotDecimalCount: config.plotDecimalCount,
      tooltipDecimalCount: config.tooltipDecimalCount,
      dateRanges: lastSuccessfulDateRanges,
      t,
    });

    let totalData = {};
    if (config.isTotalRowCalculated) {
      totalData = fillEmptyDates({ lastSuccessfulDateRanges, rawData: data?.[config.dataKey]?.totals });
    }
    else {
      totalData = getCalculatedTotalRowData({ lastSuccessfulDateRanges, rawData });
    }

    if (!isPending) {
      config?.linesConfig?.configs?.forEach((lineConfig, index) => {
        let seriesTotal = 0;
        const lineData = fillEmptyDatesOfLine({ totalData, data: rawData?.data?.[lineConfig.key] });
        const seriesData = Object.keys(lineData).sort().map(k => {
          seriesTotal += lineData[k] ?? 0;
          return lineData[k] ?? 0;
        });

        if (seriesTotal > 0) {
          series.push({
            index: index + 1,
            name: lineConfig.title,
            color: lineConfig.lineColor,
            data: seriesData,
            visible: config?.defaultVisibleKeys?.includes(lineConfig.key),
          });
        }
      });

      series.unshift({
        index: 0,
        name: t('global:TOTAL'),
        data: Object.keys(totalData).sort().map(k => totalData[k] ?? 0),
        visible: config?.defaultVisibleKeys?.includes('total'),
      });
    }

    options.push({
      customKey: `${tableKey}:${config.dataKey}`,
      isPending,
      ...optionsTemplate,
      series,
    });
  });

  return options;
}

export function getChartOptions({
  lastSuccessfulDateRanges,
  chartViewStatusMap,
  chartsData,
  t,
}) {
  const charts = [];

  Object.entries(chartsData).forEach(([tableKey, chartData]) => {
    const x = getPreparedChartData({
      options: chartData,
      tableKey,
      lastSuccessfulDateRanges,
      chartViewStatusMap,
      t,
    });
    charts.push(...x);
  });

  return charts;
}
