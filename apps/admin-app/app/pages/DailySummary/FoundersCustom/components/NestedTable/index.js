import { useMemo, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Spin, Tooltip } from 'antd';

import AntTable from '@shared/components/UI/AntTableV2';

import { getDynamicTableColumns } from './config';
import useStyles from './styles';
import {
  lastSuccessfulDateRangesSelector,
  currencySelector,
} from '../../../commonRedux/selectors';
import { getFormattedTableData } from './utils';
import { firstDataFetchTimestampSelector } from '../../redux/selectors';

export default function NestedTable({
  reducerKey,
  isLoading,
  unformattedTableData,
  ...customAntdTableProps
}) {
  const classes = useStyles();
  const lastSuccessfulDateRanges = useSelector(state => lastSuccessfulDateRangesSelector(state, reducerKey));
  const firstDataFetchTimestamp = useSelector(firstDataFetchTimestampSelector);
  const currency = useSelector(state => currencySelector(state, reducerKey));
  const prevFirstDataFetchTimestamp = useRef(firstDataFetchTimestamp);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const { tableData, isTableDataPendingObj, allExpandableRowKeys } = getFormattedTableData({ unformattedTableData });

  const isShowTableLoading = useMemo(() => {
    return isLoading || Object.values(isTableDataPendingObj).some(isPending => isPending);
  }, [isLoading, isTableDataPendingObj]);

  useEffect(() => {
    if (prevFirstDataFetchTimestamp.current !== firstDataFetchTimestamp) {
      setExpandedRowKeys(allExpandableRowKeys);
      prevFirstDataFetchTimestamp.current = firstDataFetchTimestamp;
    }
  }, [firstDataFetchTimestamp, prevFirstDataFetchTimestamp, allExpandableRowKeys]);

  const columns = useMemo(
    () => getDynamicTableColumns({
      dateRanges: lastSuccessfulDateRanges,
      classes,
      isTableDataPendingObj,
      currency: currency?.toLowerCase(),
    }),
    [
      lastSuccessfulDateRanges,
      classes,
      isTableDataPendingObj,
      currency,
    ],
  );

  return (
    <AntTable
      data={tableData}
      columns={columns}
      className={classes.antTable}
      containerClassName={classes.tableContainer}
      loading={isShowTableLoading}
      showFooter={false}
      size="small"
      scroll={{ y: 660 }}
      expandable={{
        expandIcon: getExpandIconColumn,
        expandedRowKeys,
        onExpand: (isExpanding, record) => {
          if (isExpanding) {
            setExpandedRowKeys(prev => [...prev, record.key]);
          }
          else {
            setExpandedRowKeys(prev => prev.filter(key => key !== record.key));
          }
        },
        indentSize: 10,
      }}
      {...customAntdTableProps}
    />
  );

  function getExpandIconColumn({ expanded, onExpand, record }) {
    const { recordConfig = {} } = record;
    const { isSectionHeader } = recordConfig;

    const isPending = false;
    return (
      <div className={classes.nameColumnWrapper}>
        {
          !isSectionHeader && isPending && <Spin size="small" className={classes.spinnerIcon} />
        }
        {
          record.children && !isSectionHeader && !isPending && (
            (
              expanded ?
                <Button className={classes.expandButton} onClick={e => onExpand(record, e)} type="primary" size="small">-</Button> :
                <Button className={classes.expandButton} onClick={e => onExpand(record, e)} type="primary" size="small">+</Button>
            )
          )
        }
        {
          firstDataFetchTimestamp && (
            <Tooltip title={record.tooltip}>
              {record.name}
            </Tooltip>
          )
        }
      </div>
    );
  }
}
