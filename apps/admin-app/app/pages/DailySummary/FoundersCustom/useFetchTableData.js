import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  computedDateRangesSelector,
  getRawTableDataSelector,
  lastDataRefreshTimestampSelector,
} from '../commonRedux/selectors';
import { getTableDataSelector } from './redux/selectors';
import { usePermission } from '@shared/hooks';

export default function useFetchTableData({
  reducerKey,
  tableKey,
  rowConfigs,
  dataFetcherAction,
  showHeaderRow,
  headerText,
  permKey = false,
  isVisible = true,
}) {
  const { canAccess } = usePermission();
  const dispatch = useDispatch();

  const rawTableData = useSelector(state => getRawTableDataSelector(state, reducerKey, tableKey));
  const memoizedTableDataSelector = useMemo(getTableDataSelector, []);
  const tableData = useSelector(state => memoizedTableDataSelector.getData(state, tableKey, rowConfigs));
  const isTableDataPendingObj = useSelector(state => memoizedTableDataSelector.getIsPendingObj(state, tableKey));
  const isTableDataPending = useSelector(state => memoizedTableDataSelector.getTotalTablePending(state, tableKey));
  const computedDateRanges = useSelector(state => computedDateRangesSelector(state, reducerKey));
  const dataRefreshTimestamp = useSelector(state => lastDataRefreshTimestampSelector(state, reducerKey));
  const prevDataRefreshTimestamp = useRef(dataRefreshTimestamp);

  const hasPermissionToViewData = permKey ? canAccess(permKey) : true;

  useEffect(() => {
    // before init page it is null, after initPage action, it should refresh
    if (isVisible && hasPermissionToViewData && dataRefreshTimestamp !== prevDataRefreshTimestamp.current) {
      prevDataRefreshTimestamp.current = dataRefreshTimestamp;
      rowConfigs.forEach(config => {
        if (!config.endpoint) return;
        dispatch(
          dataFetcherAction({
            config,
            tableKey,
            dateRanges: computedDateRanges,
          }),
        );
      });
    }
  }, [
    dispatch,
    rowConfigs,
    tableKey,
    dataFetcherAction,
    computedDateRanges,
    dataRefreshTimestamp,
    prevDataRefreshTimestamp,
    hasPermissionToViewData,
    isVisible,
  ]);

  if (!isVisible || !hasPermissionToViewData) {
    return { isVisible, hasPermissionToViewData };
  }

  return {
    tableData,
    tableKey,
    isTableDataPendingObj,
    isTableDataPending,
    rawTableData,
    hasPermissionToViewData,
    isVisible,
    showHeaderRow,
    headerText,
  };
}
