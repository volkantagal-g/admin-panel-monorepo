import { GETIR_10_DOMAIN_TYPE } from '@shared/shared/constants';

export const tableColumns = (classes, t) => ([
  {
    title: '',
    dataIndex: 'name',
    key: 'name',
    width: '130px',
    fixed: 'left',
  },
  {
    title: <span className={classes.columnTitle}>{t('euGrowthComparison:TABLE.COLUMNS.G10_ORDER_COUNT')}</span>,
    dataIndex: 'orderCount',
    key: 'orderCount',
    align: 'right',
    width: '125px',
    sorter: (a, b) => a.orderCount - b.orderCount,
  },
  {
    title: <span className={classes.columnTitle}>{t('euGrowthComparison:TABLE.COLUMNS.AVG_DAILY_ORDER_COUNT')}</span>,
    dataIndex: 'avgDailyOrderCount',
    key: 'avgDailyOrderCount',
    align: 'right',
    width: '125px',
    sorter: (a, b) => a.domainStats[GETIR_10_DOMAIN_TYPE].avgDailyOrderCount - b.domainStats[GETIR_10_DOMAIN_TYPE].avgDailyOrderCount,
  },
  {
    title: <span className={classes.columnTitle}>{t('euGrowthComparison:TABLE.COLUMNS.WEEK_GROWTH')}</span>,
    dataIndex: 'weekToWeekGrowth',
    key: 'weekToWeekGrowth',
    align: 'right',
    width: '130px',
    sorter: (a, b) => a.domainStats[GETIR_10_DOMAIN_TYPE].weekToWeekGrowth - b.domainStats[GETIR_10_DOMAIN_TYPE].weekToWeekGrowth,
  },
  {
    title: <span className={classes.columnTitle}>{t('euGrowthComparison:TABLE.COLUMNS.NUMBER_OF_WAREHOUSE')}</span>,
    dataIndex: 'numberOfWarehouse',
    key: 'numberOfWarehouse',
    align: 'right',
    width: '95px',
    sorter: (a, b) => a.numberOfWarehouse - b.numberOfWarehouse,
  },
  {
    title: <span className={classes.columnTitle}>{t('euGrowthComparison:TABLE.COLUMNS.ORDER_COUNT_PER_WAREHOUSE')}</span>,
    dataIndex: 'orderCountPerWarehouse',
    key: 'orderCountPerWarehouse',
    align: 'right',
    width: '175px',
    sorter: (a, b) => ((a.orderCount / a.numberOfWarehouse) - (b.orderCount / b.numberOfWarehouse)),
  },
]);
