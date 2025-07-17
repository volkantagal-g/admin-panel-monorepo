import { numberFormat } from '@shared/utils/localization';
import {
  getFakeUTCDateInLocal,
  getFormattedColumnDate,
} from '../../../utils';
import { DEFAULT_DIVIDER } from '../../constants';

export function getDynamicTableColumns({
  dateRanges,
  classes,
  isTableDataPendingObj,
  currency,
}) {
  const startDates = dateRanges.map(dr => dr.start);
  const endDates = dateRanges.map(dr => dr.end);
  const columns = [
    {
      title: '',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      className: classes.nameColumn,
      render: () => null,
    },
  ];

  startDates.forEach((startDate, index) => {
    const isFirstStartDate = index === 0;
    const stripedColumnClass = index % 2 === 0 ? 'stripedColumn' : '';
    const endDate = endDates[index];
    const localStartDate = getFakeUTCDateInLocal(startDate);
    const localEndDate = getFakeUTCDateInLocal(endDate);

    const dateTitle = getFormattedColumnDate(localStartDate, localEndDate);

    const orderCountColumn = {
      title: dateTitle,
      // first date has no difference
      colSpan: isFirstStartDate ? 3 : 6,
      onCell: () => ({ colSpan: 1 }),
      dataIndex: '',
      ...(!isFirstStartDate ? { className: `${classes.unifiedCell} ${stripedColumnClass}` } : { className: stripedColumnClass }),
      key: startDate,
      align: 'right',
      render: record => {
        // TODO: these render values are not dynamic, change this to work with getters from config or use generic names
        return (
          <div>
            {
              !record.recordConfig.isSectionHeader && (
                <div className={classes.boldCellsExceptPercentage}>
                  {
                    isTableDataPendingObj[record.dataKey] ?
                      '-' :
                      getFormattedNumber({
                        value: record?.formattedData?.valuesPerStartDate?.[startDate]?.orderCount,
                        numberFormatter: numberFormat({ minDecimal: 1, maxDecimal: 1 }),
                      })
                  }
                </div>
              )
            }
          </div>
        );
      },
    };
    columns.push(orderCountColumn);

    // first date has no diff columns
    if (!isFirstStartDate) {
      const orderCountDiffColumn = {
        title: <b />,
        colSpan: 0,
        onCell: () => ({ colSpan: 1 }),
        className: `${stripedColumnClass} ${classes.growthCell}`,
        key: `${startDate}_order_count_growth`,
        align: 'right',
        render: record => {
          const value = record?.formattedData?.valuesPerStartDate?.[startDate]?.orderCountGrowthRateFromThisDate || Infinity;
          return (
            !record.recordConfig.isSectionHeader && (
              <span className={getDiffClassName(value, record, classes)}>
                {isTableDataPendingObj[record.dataKey] ? '-' : getFormattedGrowthRate(value)}
              </span>
            )
          );
        },
      };

      columns.push(orderCountDiffColumn);
    }

    const netRevenueColumn = {
      title: <b />,
      // first date has no difference
      colSpan: 0,
      onCell: () => ({ colSpan: 1 }),
      dataIndex: '',
      key: startDate,
      align: 'right',
      ...(!isFirstStartDate ? { className: `${classes.unifiedCell} ${stripedColumnClass}` } : { className: stripedColumnClass }),
      render: record => {
        return (
          <div>
            {
              !record.recordConfig.isSectionHeader && (
                <div className={classes.boldCellsExceptPercentage}>
                  {
                    isTableDataPendingObj[record.dataKey] ?
                      '-' :
                      getFormattedNumber({ value: record?.formattedData?.valuesPerStartDate?.[startDate]?.netRevenuePerCurrency?.[currency] || 0 })
                  }
                </div>
              )
            }
          </div>
        );
      },
    };
    columns.push(netRevenueColumn);

    // first date has no diff columns
    if (!isFirstStartDate) {
      const netRevenueDiffColumn = {
        title: <b />,
        colSpan: 0,
        onCell: () => ({ colSpan: 1 }),
        className: `${stripedColumnClass} ${classes.growthCell}`,
        key: `${startDate}_net_revenue_growth`,
        align: 'right',
        render: record => {
          const value = record?.formattedData?.valuesPerStartDate?.[startDate]?.netRevenuePerCurrencyGrowthRateFromThisDate?.[currency] || Infinity;
          return (
            !record.recordConfig.isSectionHeader && (
              <span className={getDiffClassName(value, record, classes)}>
                {isTableDataPendingObj[record.dataKey] ? '-' : getFormattedGrowthRate(value)}
              </span>
            )
          );
        },
      };

      columns.push(netRevenueDiffColumn);
    }

    const gmvColumn = {
      title: <b />,
      // first date has no difference
      colSpan: 0,
      onCell: () => ({ colSpan: 1 }),
      dataIndex: '',
      key: startDate,
      align: 'right',
      ...(!isFirstStartDate ? { className: `${classes.unifiedCell} ${stripedColumnClass}` } : { className: stripedColumnClass }),
      render: record => {
        return (
          <div>
            {
              !record.recordConfig.isSectionHeader && (
                <div className={classes.boldCellsExceptPercentage}>
                  {
                    isTableDataPendingObj[record.dataKey] ?
                      '-' :
                      getFormattedNumber({ value: record?.formattedData?.valuesPerStartDate?.[startDate]?.gmvPerCurrency?.[currency] || 0 })
                  }
                </div>
              )
            }
          </div>
        );
      },
    };
    columns.push(gmvColumn);

    // first date has no diff columns
    if (!isFirstStartDate) {
      const gmvDiffColumn = {
        title: <b />,
        colSpan: 0,
        onCell: () => ({ colSpan: 1 }),
        className: `${stripedColumnClass} ${classes.growthCell}`,
        key: `${startDate}_gmv_growth`,
        align: 'right',
        render: record => {
          const value = record?.formattedData?.valuesPerStartDate?.[startDate]?.gmvPerCurrencyGrowthRateFromThisDate?.[currency] || Infinity;
          return (
            !record.recordConfig.isSectionHeader && (
              <span className={getDiffClassName(value, record, classes)}>
                {isTableDataPendingObj[record.dataKey] ? '-' : getFormattedGrowthRate(value)}
              </span>
            )
          );
        },
      };

      columns.push(gmvDiffColumn);
    }
  });

  // empty column, so it doesn't spread existing columns to full width
  const emptyColum = { title: '', width: '100%', className: 'emptyColumn' };
  columns.push(emptyColum);
  return columns;
}

function getDiffClassName(value, record, classes) {
  if (value > 0) {
    return classes.singlePosDiff;
  }
  if (value < 0) {
    return classes.singleNegDiff;
  }
  return classes.baseDiffPercent;
}

const defaultNumberFormatter = numberFormat({ maxDecimal: 0 });
function getFormattedNumber({ value, divider = DEFAULT_DIVIDER, numberFormatter = defaultNumberFormatter }) {
  if (value === undefined || value === null) return value;
  const dividedValue = value / divider;
  const formatted = numberFormatter.format(dividedValue);
  return formatted === 'NaN' ? '-' : formatted;
}

const growthRateNumberFormatter = numberFormat({ maxDecimal: 0 });
function getFormattedGrowthRate(value) {
  let tempValue = value;
  if (value === undefined) {
    return value;
  }
  if (value === null || value === 0) {
    tempValue = Infinity;
  }
  const formatted = growthRateNumberFormatter.format(tempValue * 100);
  return formatted === 'NaN' ? '-' : formatted;
}
