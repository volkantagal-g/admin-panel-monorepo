import moment from 'moment';
import { useCallback, useState, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu, Row } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';

import AntTableV2 from '@shared/components/UI/AntTableV2';
import { getCitiesSelector, getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { courierStatusDataSelector, filteredData, filtersSelector } from '../../redux/selectors';
import { generateTableColumns } from './config';
import useStyles from './styles';
import { isMobile } from '@shared/utils/common';
import { CSVDownloader } from '@shared/components/UI/CSVDownloader';
import { createCSVDataFromTableData } from '../../../utils';
import { TEST_ID } from '@app/pages/LiveMonitoring/CourierLiveMonitoring/constants';
import { Creators } from '../../redux/actions';

const CourierLiveMonitoringTable = ({ selectedCity, url }) => {
  const { t } = useTranslation(['global', 'courierLiveMonitoringPage']);
  const navigate = useNavigate();
  const classes = useStyles();
  const filters = useSelector(filtersSelector);
  const dispatch = useDispatch();

  const isCitiesPending = useSelector(getCitiesSelector.getIsPending);
  const isWarehousePending = useSelector(getFilteredWarehousesSelector.getIsPending);
  const isCourierStatusPending = useSelector(courierStatusDataSelector.getIsPending);
  const isPending = isCitiesPending || isCourierStatusPending || isWarehousePending;
  const data = useSelector(filteredData);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const searchInputRef = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const tableProps = useMemo(() => {
    return {
      searchText,
      searchedColumn,
      handleSearch,
      handleReset,
      searchInputRef,
    };
  }, [searchText, searchedColumn]);

  const handleCityClick = useCallback(
    cityId => {
      navigate(`${url}?selectedCity=${cityId}`);
    },
    [navigate, url],
  );

  const columns = useMemo(() => {
    return generateTableColumns({ ...tableProps, handleCityClick, classes, selectedCity }, t);
  }, [classes, handleCityClick, selectedCity, tableProps, t]);

  const csvData = useMemo(() => {
    return createCSVDataFromTableData({ filteredTableData: data, tableColumns: columns });
  }, [data, columns]);

  const csvDownloadMenu = (
    <Menu>
      <Menu.Item key="filteredAndCityBasedCsvExportData">
        <CSVDownloader
          type="text"
          jsonData={csvData}
          buttonText={t('courierLiveMonitoringPage:FILTERED_AND_CITY_BASED_CSV_EXPORT')}
          fileName={getCSVFilename()}
          tooltipTitle={t('DOWNLOAD_AS_CSV')}
        />
      </Menu.Item>

      {!(filters.selectedCity) && (
        <Menu.Item key="allWarehousesBasedCsvExportData">
          <Button
            type="text"
            onClick={() => {
              dispatch(Creators.downloadCourierStatusCountsForAllWarehousesCSVRequest({ t }));
            }}
          >
            {t('courierLiveMonitoringPage:ALL_WAREHOUSES_BASED_CSV_EXPORT')}
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div>
      <Row className={classes.csvButtonRow} justify="end">
        <Dropdown overlay={csvDownloadMenu} trigger={['click']}>
          <Button icon={<CloudDownloadOutlined />}>
            {t('courierLiveMonitoringPage:DOWNLOAD_CSV_BUTTON_LABEL')}
          </Button>
        </Dropdown>
      </Row>

      <AntTableV2
        data={data}
        columns={generateTableColumns({ ...tableProps, handleCityClick, classes, selectedCity }, t)}
        loading={isPending}
        size="small"
        bordered
        scroll={{ x: isMobile() ? 300 : undefined, y: isMobile() ? 480 : 720 }}
        showFooter={false}
        className={classes.table}
        data-testid={TEST_ID.COURIER_STATUS_MONITORING}
      />
    </div>
  );

  function getCSVFilename() {
    const now = moment().format('YYYY_MM_DD_HH_mm');
    const { domainType } = filters;
    const pageTitleStr = t('global:PAGE_TITLE.COURIER_LIVE_MONITORING').replace(/ /g, '_');
    const selectedCityStr = selectedCity ? `_selectedCity_${selectedCity}` : '';
    const domainStr = domainType ? `_domainType_${domainType}` : '';
    return `${pageTitleStr}${selectedCityStr}${domainStr}_${now}.csv`;
  }
};

export default CourierLiveMonitoringTable;
