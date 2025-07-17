import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import {
  getCitiesSelector,
  getFilteredWarehousesSelector,
  slottedOrderActiveDomainTypesSelector,
} from '@shared/redux/selectors/common';
import { CSVDownloader } from '@shared/components/UI/CSVDownloader';

import { createCSVDataFromTableData } from '../../../utils';
import { generateTableColumns } from './config';
import { operationStatsDataForSelectedCitySelector, filtersSelector, operationStatsDataForCitiesSelector } from '../../redux/selectors';
import useStyles from './styles';

const Table = ({ selectedCity, handleCityClick }) => {
  const { t } = useTranslation('operationsLiveMonitoringPage');
  const tableData = useSelector(selectedCity ? operationStatsDataForSelectedCitySelector.getData : operationStatsDataForCitiesSelector.getData);
  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const isWarehousesPending = useSelector(getFilteredWarehousesSelector.getIsPending);
  const isTableDataPending = useSelector(
    selectedCity ? operationStatsDataForSelectedCitySelector.isPending : operationStatsDataForCitiesSelector.isPending,
  );

  const { mainColumnSearchText } = useSelector(filtersSelector);
  const allFilters = useSelector(filtersSelector);
  const slottedOrderActiveDomainTypes = useSelector(slottedOrderActiveDomainTypesSelector.getCurrentCountrySpecificData);
  const isPending = isCitiesPending || isWarehousesPending || isTableDataPending;

  const classes = useStyles();

  const isSlottedOrderCountColumnVisible = !!slottedOrderActiveDomainTypes?.includes(allFilters?.domainType);

  const tableColumns = useMemo(() => {
    return generateTableColumns({ classes, selectedCity, handleCityClick, isSlottedOrderCountColumnVisible }, t);
  }, [classes, handleCityClick, selectedCity, t, isSlottedOrderCountColumnVisible]);

  const filteredTableData = useMemo(() => {
    if (!tableData) return tableData;
    if (!mainColumnSearchText) return tableData;
    return tableData.filter(
      row => row.name.toLowerCase().includes(mainColumnSearchText.toLowerCase()),
    );
  }, [mainColumnSearchText, tableData]);

  const csvData = useMemo(() => {
    return createCSVDataFromTableData({ filteredTableData, tableColumns });
  }, [filteredTableData, tableColumns]);

  return (
    <div className={classes.container}>
      <AntTableV2 data={filteredTableData} columns={tableColumns} loading={isPending} showSorterTooltip={false} bordered className={{}} />
      <div>
        <CSVDownloader
          showIcon
          jsonData={csvData}
          fileName={getCSVFilename()}
          tooltipTitle={t('DOWNLOAD_AS_CSV')}
          style={{ marginLeft: 'auto', marginRight: '1rem', display: 'block' }}
        />
      </div>
    </div>
  );

  function getCSVFilename() {
    const now = moment().format('YYYY_MM_DD_HH_mm');
    const { domainType, integrationType } = allFilters;
    const pageTitleStr = t('PAGE_TITLE.LIVE_MONITORING.OPERATIONS').replace(/ /g, '_');
    const selectedCityStr = selectedCity ? `_selectedCity_${selectedCity}` : '';
    const domainStr = domainType ? `_domainType_${domainType}` : '';
    const integrationStr = integrationType ? `_integrationType_${integrationType}` : '';
    return `${pageTitleStr}${selectedCityStr}${domainStr}${integrationStr}_${now}.csv`;
  }
};

export default Table;
