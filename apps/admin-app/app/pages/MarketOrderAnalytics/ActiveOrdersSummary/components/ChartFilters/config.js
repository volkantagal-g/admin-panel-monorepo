import { CHART_COLUMNS_NAME, CHART_COLUMNS_TITLE } from '../PieCharts/config';

export const getChartFilterTag = (t, key, val) => {
  return `${CHART_COLUMNS_TITLE(t)[key]}: ${CHART_COLUMNS_NAME(t)[key][val]}`;
};
