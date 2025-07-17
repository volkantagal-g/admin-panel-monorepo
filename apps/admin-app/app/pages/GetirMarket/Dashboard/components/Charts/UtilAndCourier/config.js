import _ from 'lodash';

import { numberFormat } from '@shared/utils/localization';

import { getCommonChartOptions } from '../../../chartUtils';
import { CHART_DOMAIN_KEYS, CHART_DOMAIN_LABELS } from '../utils';

const getSpesificOptions = (data, isUtil, t) => ({
  chart: { height: 140 },
  tooltip: {
    pointFormatter() {
      return `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${numberFormat({ maxDecimal: isUtil ? 2 : 0 }).format(
        this.y,
      )}</b><br/>`;
    },
  },
  series: [
    {
      name: CHART_DOMAIN_LABELS(t)[0],
      data: data?.[CHART_DOMAIN_KEYS[0]]?.hourlyStats || [],
      index: 0,
    },
    {
      name: CHART_DOMAIN_LABELS(t)[1],
      data: data?.[CHART_DOMAIN_KEYS[1]]?.hourlyStats || [],
      index: 1,
    },
    {
      name: CHART_DOMAIN_LABELS(t)[2],
      data: data?.[CHART_DOMAIN_KEYS[2]]?.hourlyStats || [],
      index: 2,
    },
    {
      name: CHART_DOMAIN_LABELS(t)[3],
      data: data?.[CHART_DOMAIN_KEYS[3]]?.hourlyStats || [],
      index: 3,
    },
  ],
});

export const getUtilAndCourierConfig = (data, isUtil, t) => {
  const options = _.merge({}, getCommonChartOptions(), getSpesificOptions(data, isUtil, t));
  return options;
};
