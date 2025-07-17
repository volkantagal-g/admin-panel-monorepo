import { forEach, get, isEmpty } from 'lodash';

import moment from 'moment';

import { AVERAGE, BarChartTypeCode, DEFAULT_PERFORMANCE_SELECT_ITEM, DysPerformanceCodes, DysServiceTypeCode, metrics } from './constant';
import { getLangKey, t } from '@shared/i18n';

export const getFormattedData = (data, selectedPerformanceSystem) => {
  let performanceRowsMap = {};
  const selectedPerformanceForTable = selectedPerformanceSystem === DEFAULT_PERFORMANCE_SELECT_ITEM ? 'dps' : 'dys';
  performanceRowsMap = {
    [AVERAGE]: {
      [selectedPerformanceForTable]: {
        warehouseName: t('highLevelDys:AVERAGE'),
        point: get(data, 'avg_dys_point', get(data, 'avg_dps_point', 0)).toFixed(2),
        letter: get(data, 'avg_dys_letter', get(data, 'avg_dps_letter', '-')),
        isBold: true,
      },
    },
  };

  if (!isEmpty(data) && selectedPerformanceSystem !== DEFAULT_PERFORMANCE_SELECT_ITEM) {
    forEach(data?.warehouses, warehouse => {
      forEach(metrics, metric => {
        const metricValue = metric !== 'dys' ?
          {
            point: get(warehouse, `${metric}_point`, 0).toFixed(2),
            letter: get(warehouse, `letter_${metric}`, '-'),
          } :
          {
            warehouseName: get(warehouse, 'warehouse_name', '-'),
            point: get(warehouse, 'total', 0).toFixed(2),
            letter: get(warehouse, 'letter', '-'),
          };
        performanceRowsMap = {
          ...performanceRowsMap,
          [warehouse.warehouse_id]: {
            ...performanceRowsMap[warehouse.warehouse_id],
            [metric]: metricValue,
          },
        };
      });
    });
  }
  else if (!isEmpty(data)) {
    forEach(data?.warehouses, warehouse => {
      performanceRowsMap = {
        ...performanceRowsMap,
        [warehouse.warehouse_id]: {
          ...performanceRowsMap[warehouse.warehouse_id],
          dps: {
            warehouseName: get(warehouse, 'warehouse_name', '-'),
            point: get(warehouse, 'dps_point', 0).toFixed(2),
            letter: get(warehouse, 'letter_dps', '-'),
          },
        },
      };
    });
  }

  return Object.values(performanceRowsMap);
};

function sortLetterValues(letterValues) {
  return letterValues.sort((a, b) => {
    if ('A+' in a) return -1;
    if ('A+' in b) return 1;

    return Object.keys(a)[0].localeCompare(Object.keys(b)[0]);
  });
}

export const getFormattedBarChartData = data => {
  if (!isEmpty(data)) {
    let letters = [];
    const barChartData = [];
    const sortedResponse = data.map(letterValue => {
      const clonedLetterValue = { ...letterValue };

      sortLetterValues(clonedLetterValue.data);

      return clonedLetterValue;
    });

    const firstItemOfBarChart = sortedResponse[0]?.data;
    letters = firstItemOfBarChart.flatMap(Object.keys);

    forEach(sortedResponse, barChartPoints => {
      const tempPoints = barChartPoints.data.map(letterGrade => {
        return Object.values(letterGrade) * 100;
      });

      const nameOfBar = get(barChartPoints, 'name', '-');
      barChartData.push({
        data: tempPoints,
        name: BarChartTypeCode[nameOfBar].translation[getLangKey()],
        color: BarChartTypeCode[nameOfBar].color,
      });
    });

    return { letters, barChartData };
  }
  return [];
};

export const getFormattedLineChartData = data => {
  if (!isEmpty(data)) {
    const formattedData = data.map(lineChartPoint => {
      const [date, value] = lineChartPoint;

      return [date * 1000, +value.toFixed(2)];
    });

    return formattedData;
  }
  return [];
};

export const getDateType = date => moment(date).format('YYYY-MM-DD');

export const createRequestBody = filter => {
  let updatedBody = filter;

  updatedBody = {
    ...updatedBody,
    performanceSystem: DysPerformanceCodes[updatedBody.performanceSystem].payloadValue,
    serviceType: DysServiceTypeCode[updatedBody.serviceType].payloadValue,
  };

  return updatedBody;
};
