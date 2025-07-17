import _ from 'lodash';
import { useState, useEffect, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Tabs } from 'antd';

import { getLangKey } from '@shared/i18n';

import { getCitiesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import {
  getFilteredCourierCountsDataSelector,
  getFilteredCourierCountsIsPendingSelector,
  filtersSelector,
  getSelectedDivisionSelector,
} from '../../redux/selectors';
import ErrorFallback from '../ErrorFallback';
import CollapseButton from './components/CollapseButton';
import CourierCountWrapper from './components/CourierCountWrapper';
import WarehouseSearch from './components/WarehouseSearch';
import { isMobile } from '@shared/utils/common';
import CouriersTypePanel from './components/CouriersTypePanel';

import useStyles from './styles';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '@app/pages/GetirMarket/LiveMap/mixPanelEvents';

const { TabPane } = Tabs;

const CourierStatsPanel = () => {
  const cities = useSelector(getCitiesSelector.getData);
  const selectedCity = useSelector(filtersSelector.getCity);
  const citiesIsPending = useSelector(getCitiesSelector.getIsPending);
  const warehousesIsPending = useSelector(getWarehousesSelector.getIsPending);
  const courierCountsIsPending = useSelector(getFilteredCourierCountsIsPendingSelector);
  const selectedDivision = useSelector(getSelectedDivisionSelector);
  const selectedDivisionName = _.get(selectedDivision, `name[${getLangKey()}]`, '');
  const courierCountsData = useSelector(getFilteredCourierCountsDataSelector);

  const classes = useStyles();
  const { t } = useTranslation('getirMarketLiveMapPage');

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const isPending = courierCountsIsPending || warehousesIsPending || citiesIsPending;

  const selectedCountry = getSelectedCountry();
  const selectedCountryName = selectedCountry?.name[getLangKey()] || t('SELECTED_COUNTRY');

  const handleCollapseButtonClick = () => {
    setIsCollapsed(!isCollapsed);
    AnalyticsService.track(LIVE_MAP_EVENTS.BUTTON_CLICK, {
      button: LIVE_MAP_EVENTS.COURIER_COUNTS_TABLE.COLLAPSE,
      tableName: LIVE_MAP_EVENTS.COURIER_COUNTS_TABLE.NAME,
    });
  };

  const onExpandClick = rowKey => {
    if (!expandedRowKeys) return;

    if (expandedRowKeys.includes(rowKey)) {
      setExpandedRowKeys([]);
    }
    else {
      setExpandedRowKeys([rowKey]);
    }
  };

  useEffect(() => {
    if (selectedCity && cities.length) {
      const foundCity = cities.find(city => city._id === selectedCity);
      setSelectedCityName(foundCity?.name[getLangKey()] || t('SELECTED_CITY'));
    }
  }, [cities, selectedCity, t]);

  const expandAllRows = useCallback(() => {
    const newKeys = courierCountsData?.selectedCityData?.table.map(rowData => rowData.key);
    if (newKeys) {
      setExpandedRowKeys(newKeys);
    }
  }, [courierCountsData?.selectedCityData?.table]);

  const collapseAllRows = useCallback(() => {
    setExpandedRowKeys([]);
  }, []);

  return (
    <div className={isCollapsed ? `${classes.wrapper} ${classes.collapsed}` : classes.wrapper}>
      <CollapseButton isCollapsed={isCollapsed} onCollapseClick={handleCollapseButtonClick} />
      <div className={classes.courierCountAreaWrapper}>
        <div className={classes.innerWrapper}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {/* MOBILE */}
            {isMobile() ? (
              <Tabs defaultActiveKey="1" size="small" tabBarGutter={8}>
                <TabPane tab={selectedCityName} key="CITY">
                  <CourierCountWrapper
                    key="CITY_COURIER_COUNTS"
                    wrapperKey="city"
                    headerTitle={t('CITY_COURIER_COUNTS')}
                    headerCounts={courierCountsData?.selectedCityData?.headerData}
                    tableData={courierCountsData?.selectedCityData?.table || []}
                    search={<WarehouseSearch expandTableRows={expandAllRows} collapseTableRows={collapseAllRows} />}
                    loading={isPending}
                    expandedRowKeys={expandedRowKeys}
                    onExpandClick={onExpandClick}
                    sortable
                  />
                  <CouriersTypePanel />
                </TabPane>
                <TabPane tab={selectedCountryName} key="COUNTRY">
                  <CourierCountWrapper
                    key="COUNTRY_COURIER_COUNTS"
                    wrapperKey="country"
                    headerTitle={t('COUNTRY_COURIER_COUNTS')}
                    headerCounts={courierCountsData?.countryData?.headerData}
                    tableData={courierCountsData?.countryData?.table}
                    loading={isPending}
                  />
                </TabPane>
                {selectedDivision && (
                  <TabPane tab={selectedDivisionName} key="DIVISION">
                    <CourierCountWrapper
                      key="DIVISION_COURIER_COUNTS"
                      headerTitle={t('DIVISION_COURIER_COUNTS')}
                      headerCounts={courierCountsData?.divisionData?.headerData}
                      tableData={courierCountsData?.divisionData?.table}
                      loading={isPending}
                    />
                  </TabPane>
                )}
              </Tabs>
            ) : (
              // DESKTOP
              <>
                <CourierCountWrapper
                  key="CITY_COURIER_COUNTS"
                  wrapperKey="city"
                  headerTitle={t('CITY_COURIER_COUNTS')}
                  headerCounts={courierCountsData?.selectedCityData?.headerData}
                  tableData={courierCountsData?.selectedCityData?.table}
                  search={<WarehouseSearch expandTableRows={expandAllRows} collapseTableRows={collapseAllRows} />}
                  loading={isPending}
                  expandedRowKeys={expandedRowKeys}
                  onExpandClick={onExpandClick}
                  sortable
                />
                <CouriersTypePanel />
                <CourierCountWrapper
                  key="COUNTRY_COURIER_COUNTS"
                  headerTitle={t('COUNTRY_COURIER_COUNTS')}
                  headerCounts={courierCountsData?.countryData?.headerData}
                  tableData={courierCountsData?.countryData?.table}
                  loading={isPending}
                  wrapperKey="country"
                />
                {selectedDivision && (
                  <CourierCountWrapper
                    key="DIVISION_COURIER_COUNTS"
                    headerTitle={t('DIVISION_COURIER_COUNTS')}
                    headerCounts={courierCountsData?.divisionData?.headerData}
                    tableData={courierCountsData?.divisionData?.table}
                    loading={isPending}
                  />
                )}
              </>
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default memo(CourierStatsPanel);
