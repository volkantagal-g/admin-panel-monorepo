import { numberFormat, percentFormat } from '@shared/utils/localization';
import {
  getDiffPercentFieldName,
  getPartialPercentFieldName,
  getFakeUTCDateInLocal,
  getFormattedColumnDate,
} from '../../utils';

export function getDynamicTableColumns({
  dateRanges,
  classes,
  isTableDataPendingObj,
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
    const endDate = endDates[index];
    const localStartDate = getFakeUTCDateInLocal(startDate);
    const localEndDate = getFakeUTCDateInLocal(endDate);

    const dateTitle = getFormattedColumnDate(localStartDate, localEndDate);

    const dateColumn = {
      title: dateTitle,
      // first date has no difference
      colSpan: isFirstStartDate ? 1 : 2,
      onCell: () => ({ colSpan: 1 }),
      dataIndex: '',
      className: isFirstStartDate ? classes.firstStartDate : classes.unifiedCell,
      key: startDate,
      align: 'right',
      render: record => {
        return (
          <div className={classes.boldCellsExceptPercentage}>
            {
              !record.recordConfig.isSectionHeader && (
                <div>{isTableDataPendingObj[record.dataKey] ? '-' : getFormattedNumber(record[startDate], record.recordConfig.numberFormatter)}</div>
              )
            }
            {
              (record.nestLevel ?? 0) !== 0 && (
                <div className={classes.percentageCell}>
                  {isTableDataPendingObj[record.dataKey] ? '-' : getFormattedPercentageNumber(record?.[getPartialPercentFieldName(startDate)])}
                </div>
              )
            }
          </div>
        );
      },
    };
    columns.push(dateColumn);

    if (index === 0) return; // first date has no difference col
    const dateDiffColumn = {
      title: <b />,
      colSpan: 0,
      onCell: () => ({ colSpan: 1 }),
      dataIndex: getDiffPercentFieldName(startDate),
      key: getDiffPercentFieldName(startDate),
      align: 'right',
      render: (value, record) => {
        return (
          !record.recordConfig.isSectionHeader && (
            <span className={getDiffClassName(value, record, classes)}>
              {isTableDataPendingObj[record.dataKey] ? '-' : getFormattedNumber(value)}
            </span>
          )
        );
      },
    };

    columns.push(dateDiffColumn);
  });

  // empty column, so it doesn't spread existing columns to full width
  const emptyColum = { title: '', width: '100%', className: 'emptyColumn' };
  columns.push(emptyColum);
  return columns;
}

function getDiffClassName(value, record, classes) {
  const isTopRow = (record.nestLevel ?? 0) === 0;
  if (value > 0) {
    return isTopRow ? classes.topPosDiff : classes.positiveDiff;
  }
  if (value < 0) {
    return isTopRow ? classes.topNegDiff : classes.negativeDiff;
  }
  return isTopRow ? classes.baseDiffPercent : classes.diffPercent;
}

const defaultNumberFormatter = numberFormat({ maxDecimal: 0 });
function getFormattedNumber(value, customFormatter) {
  if (value === undefined || value === null) return value;
  const formatted = (customFormatter || defaultNumberFormatter).format(value);
  return formatted === 'NaN' ? '-' : formatted;
}

function getFormattedPercentageNumber(value) {
  if (value === undefined || value === null) return value;
  const formatted = percentFormat().format(value / 100);
  return formatted.includes('NaN') ? '-' : formatted;
}
