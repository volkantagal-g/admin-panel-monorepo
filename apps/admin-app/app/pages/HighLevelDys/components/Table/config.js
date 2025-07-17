import { get, isEmpty } from 'lodash';

import { t } from '@shared/i18n';
import { DEFAULT_PERFORMANCE_SELECT_ITEM, tableMetricOrder } from '../../constant';

const getMetricPercentage = (warehouse, metric) => {
  if (!isEmpty(warehouse)) {
    const weightKey = `${metric}_weight`;
    const percentage = parseInt(warehouse[weightKey] * 100, 10) || 0;
    return metric === 'dys' ? '' : `  %${percentage}`;
  }
  return '';
};

/**
   * Creates table column
   * @param {Array} data - required param for creating table columns
   * @param {string} classes - className for corresponding JSX element
   * @param {string} selectedPerformanceSystem - navigates to code with selected performance system
   */
export const getTableColumns = (data, classes, selectedPerformanceSystem) => {
  const selectedPerformanceForTable = selectedPerformanceSystem === DEFAULT_PERFORMANCE_SELECT_ITEM ? 'dps' : 'dys';

  if (!isEmpty(data)) {
    const warehouse = data?.warehouses[0];
    const columns = [
      {
        title: '',
        width: 60,
        children: [
          {
            title: <span>{t('WAREHOUSE')}</span>,
            width: 120,
            align: 'left',
            fixed: 'left',
            render: row => (
              <span className={row?.[selectedPerformanceForTable]?.isBold &&
              classes.boldText}
              >{row?.[selectedPerformanceForTable]?.warehouseName || '-'}
              </span>
            ),
          },
        ],
      },
    ];

    if (selectedPerformanceSystem !== DEFAULT_PERFORMANCE_SELECT_ITEM) {
      tableMetricOrder.forEach(metric => {
        const children = [
          {
            title: <span>{t('highLevelDys:LETTER_GRADE')}</span>,
            width: 60,
            align: 'left',
            fixed: metric === 'dys' && 'left',
            render: row => <span className={row?.dys?.isBold && classes.boldText}>{get(row, `${metric}.letter`, '-')}</span>,
          },
          {
            title: <span>{t('highLevelDys:POINT')}</span>,
            width: 60,
            align: 'left',
            fixed: metric === 'dys' && 'left',
            render: row => <span className={row?.dys?.isBold && classes.boldText}>{get(row, `${metric}.point`, '-')}</span>,
          },
        ];
        columns.push(
          {
            title: t(`highLevelDys:${metric.toUpperCase()}`) + getMetricPercentage(warehouse, metric),
            width: '130px',
            children,
          },
        );
      });
    }
    else {
      columns.push(
        {
          title: t('highLevelDys:DPS'),
          width: '130px',
          children: [
            {
              title: <span>{t('highLevelDys:LETTER_GRADE')}</span>,
              width: 60,
              align: 'left',
              fixed: 'left',
              render: row => <span className={row?.dps?.isBold && classes.boldText}>{get(row, 'dps.letter', '-')}</span>,
            },
            {
              title: <span>{t('highLevelDys:POINT')}</span>,
              width: 60,
              align: 'left',
              fixed: 'left',
              render: row => <span className={row?.dps?.isBold && classes.boldText}>{get(row, 'dps.point', '-')}</span>,
            },
          ],
        },
      );
    }

    return columns;
  }
  return [];
};
