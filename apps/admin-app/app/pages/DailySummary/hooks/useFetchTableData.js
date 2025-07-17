import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isArray as _isArray, isEmpty as _isEmpty } from 'lodash';

import {
  computedDateRangesSelector,
  getRawTableDataSelector,
  getTableDataSelector,
  lastDataRefreshTimestampSelector,
  lastSuccessfulDateRangesSelector,
  selectedCitiesSelector, selectedCountriesSelector,
} from '../commonRedux/selectors';
import { usePermission } from '@shared/hooks';
import { getSelectedCountryDivision } from '@shared/redux/selectors/countrySelection';

export default function useFetchTableData({
  reducerKey,
  tableKey,
  rowConfigs,
  dataFetcherAction,
  showHeaderRow,
  headerText,
  permKey,
  isVisible = true,
}) {
  const { canAccess } = usePermission();
  const dispatch = useDispatch();

  const rawTableData = useSelector(state => getRawTableDataSelector(state, reducerKey, tableKey));
  const memoizedSelector = useMemo(getTableDataSelector, []);
  const tableData = useSelector(state => memoizedSelector.getData(state, reducerKey, tableKey, rowConfigs, getOnExpand));
  const isTableDataPendingObj = useSelector(state => memoizedSelector.getIsPendingObj(state, reducerKey, tableKey));
  const isTableDataPending = useSelector(state => memoizedSelector.getTotalTablePending(state, reducerKey, tableKey));
  const lastSuccessfulDateRanges = useSelector(state => lastSuccessfulDateRangesSelector(state, reducerKey));
  const computedDateRanges = useSelector(state => computedDateRangesSelector(state, reducerKey));
  const dataRefreshTimestamp = useSelector(state => lastDataRefreshTimestampSelector(state, reducerKey));
  const selectedCities = useSelector(state => selectedCitiesSelector(state, reducerKey));
  const selectedCountries = useSelector(state => selectedCountriesSelector(state, reducerKey));
  const prevDataRefreshTimestamp = useRef(dataRefreshTimestamp);
  const selectedDivision = getSelectedCountryDivision();

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
            ...(_isArray(selectedCities) && !_isEmpty(selectedCities) ? { cities: selectedCities } : undefined),
            ...(selectedDivision ? { division: selectedDivision, selectedDivisionCountries: selectedCountries } : undefined),
          }),
        );
        /* We need this data to calculate the country group average basket amount.
          This is a quick workaround until move all the calculations to the backend.
          Don't use it unless you have a very good reason */
        if (config.shouldFetchExpandableRowDataBeforeExpand) {
          dispatch(
            dataFetcherAction({
              tableKey,
              config: config.onExpandClickConfig,
              dateRanges: computedDateRanges,
              ...(_isArray(selectedCities) && !_isEmpty(selectedCities) ? { cities: selectedCities } : undefined),
              ...(selectedDivision ? { division: selectedDivision?.id, selectedDivisionCountries: selectedCountries } : undefined),
            }),
          );
        }
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
    selectedCities,
    selectedDivision,
    selectedCountries,
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
    getOnExpand,
    hasPermissionToViewData,
    isVisible,
    showHeaderRow,
    headerText,
  };

  function getOnExpand({ record, onExpandClickConfig, expanded, onExpand }) {
    return e => {
      const hasExpandConfig = !!onExpandClickConfig;
      const isExpandRequestPending = isTableDataPendingObj?.[onExpandClickConfig?.dataKey];
      // check if expand data arrived
      const expandChildrenDataExist = rawTableData?.[onExpandClickConfig?.dataKey];

      if (hasExpandConfig && !isExpandRequestPending && !expandChildrenDataExist && !expanded) {
        // fetch on expand
        dispatch(
          dataFetcherAction({
            tableKey,
            config: onExpandClickConfig,
            dateRanges: lastSuccessfulDateRanges,
            ...(_isArray(selectedCities) && !_isEmpty(selectedCities) ? { cities: selectedCities } : undefined),
            ...(selectedDivision ? { division: selectedDivision, selectedDivisionCountries: selectedCountries } : undefined),
          }),
        );
      }
      return onExpand(record, e);
    };
  }
}
