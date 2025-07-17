import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { noop as _noop } from 'lodash';
import { AreaChartOutlined } from '@ant-design/icons';
import { Button, Spin, Tag, Tooltip } from 'antd';

import AntTable from '@shared/components/UI/AntTableV2';

import { getDynamicTableColumns } from './config';
import useStyles from './styles';
import {
  lastSuccessfulDateRangesSelector,
  lastDataRefreshTimestampSelector,
} from '../../commonRedux/selectors';
import { getFormattedTableData, getRowClassName } from './utils';
import { getDayDiff } from '@app/pages/DailySummary/utils';

export function DynamicNestedTable({
  reducerKey,
  isLoading,
  unformattedTableData,
  chartViewStatusSetterAction,
  chartViewStatusMap,
  ...customAntdTableProps
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const lastSuccessfulDateRanges = useSelector(state => lastSuccessfulDateRangesSelector(state, reducerKey));
  const dataRefreshTimestamp = useSelector(state => lastDataRefreshTimestampSelector(state, reducerKey));
  const prevDataRefreshTimestamp = useRef(dataRefreshTimestamp);

  const { tableData, isTableDataPendingObj } = getFormattedTableData({ unformattedTableData });

  useEffect(() => {
    if (dataRefreshTimestamp !== prevDataRefreshTimestamp.current) {
      setExpandedRowKeys([]);
    }
  }, [dataRefreshTimestamp, prevDataRefreshTimestamp]);

  const setChartViewStatus = useCallback(
    (rowDataKey, tableKey, isChecked) => {
      dispatch(chartViewStatusSetterAction({ tableKey, rowDataKey, isChecked }));
    },
    [dispatch, chartViewStatusSetterAction],
  );

  const columns = useMemo(
    () => getDynamicTableColumns({
      dateRanges: lastSuccessfulDateRanges,
      classes,
      isTableDataPendingObj,
      setChartViewStatus,
      chartViewStatusMap,
    }),
    [
      lastSuccessfulDateRanges,
      classes,
      isTableDataPendingObj,
      setChartViewStatus,
      chartViewStatusMap,
    ],
  );

  const firstDateRangeDayDiff = getDayDiff(lastSuccessfulDateRanges?.[0]?.start, lastSuccessfulDateRanges?.[0]?.end);

  return (
    <AntTable
      data={tableData}
      columns={columns}
      className={`${classes.antTable} ${firstDateRangeDayDiff > 1 ? 'multipleDate' : ''}`}
      containerClassName={classes.tableContainer}
      loading={isLoading}
      showFooter={false}
      size="small"
      rowClassName={record => getRowClassName({ record, classes })}
      expandable={{
        expandIcon: getExpandIconColumn,
        indentSize: 25,
        expandedRowKeys,
        onExpand: (isExpanding, record) => {
          if (isExpanding) {
            setExpandedRowKeys(prev => [...prev, record.key]);
          }
          else {
            setExpandedRowKeys(prev => prev.filter(key => key !== record.key));
          }
        },
      }}
      {...customAntdTableProps}
    />
  );

  function getExpandIconColumn({ expanded, onExpand, record }) {
    const { recordConfig = {}, nestLevel, getOnExpand = _noop } = record;
    const { onExpandClickConfig, childRowsConfig = {}, isSectionHeader } = recordConfig;

    const handleOnClick = () => {
      return getOnExpand({
        record,
        onExpandClickConfig,
        expanded,
        onExpand,
      });
    };

    const configDataKey = childRowsConfig.dataKey || recordConfig.dataKey;
    const isPending = isTableDataPendingObj[configDataKey] || false;
    return (
      <div className={classes.nameColumnWrapper}>
        {
          !isSectionHeader && isPending && <Spin size="small" className={classes.spinnerIcon} />
        }
        {
          !isSectionHeader && !isPending && (
            <>
              {
                record.children && (
                  <Button className={classes.expandButton} onClick={handleOnClick()} type="primary" size="small">{expanded ? '-' : '+' }</Button>
                )
              }
              {
                !record.children && nestLevel === 0 && (
                  <Button className={classes.expandButtonDisabled} type="primary" size="small">x</Button>
                )
              }
            </>
          )
        }
        {
          record.recordConfig.chartKey && (
            <>
              <Tag.CheckableTag
                key={record.recordConfig.chartKey}
                className={[
                  classes.chartVisibilityChangeCheckbox,
                  !chartViewStatusMap[record.tableKey]?.[record.recordConfig.chartKey] && classes.chartVisibilityChangeCheckboxNonChecked,
                ]}
                checked={chartViewStatusMap[record.tableKey]?.[record.recordConfig.chartKey]}
                onChange={isChecked => setChartViewStatus(record.recordConfig.chartKey, record.tableKey, isChecked)}
              >
                <AreaChartOutlined />
              </Tag.CheckableTag>
              &nbsp;&nbsp;
            </>
          )
        }
        <Tooltip title={record.tooltip}>
          {record.name}
        </Tooltip>
      </div>
    );
  }
}
