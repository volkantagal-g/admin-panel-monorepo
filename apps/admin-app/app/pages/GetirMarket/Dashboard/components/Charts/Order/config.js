import _ from 'lodash';

import { numberFormatWithOneDecimal } from '@shared/utils/localization';

import { getCommonChartOptions } from '../../../chartUtils';

const getSpesificOptions = (data, t) => ({
  chart: { height: 157 },
  yAxis: [
    {
      allowDecimals: false,
      title: {
        text: '',
        margin: 4,
      },
      min: 0,
      gridLineColor: '#eaeaea',
    },
    {
      visible: false,
      allowDecimals: false,
      title: {
        text: '',
        margin: 4,
      },
      min: 0,
      gridLineColor: '#eaeaea',
    },
  ],
  tooltip: {
    pointFormatter() {
      return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${numberFormatWithOneDecimal.format(this.y)}</b><br/>`;
    },
    formatter(tooltip) {
      const items = this.points;
      const header = [tooltip.tooltipFooterHeaderFormatter(items[0])];
      const values = tooltip.bodyFormatter(items);
      const footer = tooltip.tooltipFooterHeaderFormatter(items[0], true);
      _.forEach(items, (item, idx) => {
        if (_.get(item, ['point', 'queuedOrderPercentage'])) {
          const queuedOrderPercentage = numberFormatWithOneDecimal.format(item.point.queuedOrderPercentage);
          values[idx] = values[idx].replace('<br/>', '');
          values[idx] += ` (${queuedOrderPercentage}%)<br>`;
        }
        if (_.get(item, ['point', 'missedOrderPercentage'])) {
          const missedOrderPercentage = numberFormatWithOneDecimal.format(item.point.missedOrderPercentage);
          values[idx] = values[idx].replace('<br/>', '');
          values[idx] += ` (${missedOrderPercentage}%)<br>`;
        }
      });
      return [...header, ...values, ...footer];
    },
  },
  series: [
    {
      name: t('DEMAND'),
      color: '#FF9800',
      data: data?.demandOrder,
      index: 0,
    },
    {
      name: t('ORDER'),
      color: '#5D3EBD',
      data: data?.order,
      index: 1,
    },
    {
      name: t('SLOTTED_ORDER'),
      color: '#2CAFFE',
      data: data?.slottedOrder,
      index: 2,
    },
    {
      name: t('BATCHED'),
      color: '#AB432A',
      data: data?.batchedOrder,
      index: 3,
    },
    {
      name: t('QUEUE'),
      color: '#4CAF50',
      data: data?.queuedOrder,
      index: 4,
    },
    {
      name: t('MISSED'),
      color: '#F44336',
      data: data?.missedOrder,
      index: 5,
    },
  ],
});

export const getOrderChartConfig = (data, t) => {
  const options = _.merge({}, getCommonChartOptions(), getSpesificOptions(data, t));
  return options;
};
