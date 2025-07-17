import { useState, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Switch, Collapse } from 'antd';
import { useDispatch } from 'react-redux';

import useStyles from './styles';
import WarehousesStats from '../WarehousesStats';
import ArtisanActiveOrders from '../ArtisanActiveOrders';
import ArtisanActiveReturns from '../ArtisanActiveReturns';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import WarehouseInfoTable from '../WarehouseInfoTable';
import CourierInfoTable from '../CourierInfoTable';
import RedBasketInfoTable from '../RedBasketInfoTable';
import TotalCourierCountsTable from '../TotalCourierCountsTable';
import TotalCourierCountsByLocationTable from '../TotalCourierCountsByLocationTable';
import { VEHICLE_TYPE, GETIR_FOOD_DOMAIN_TYPE, COUNTRY_CODES } from '@shared/shared/constants';

const { Panel } = Collapse;

const CourierPlanAndCountsTable = props => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { canAccess } = usePermission();
  const classes = useStyles();
  const {
    couriers,
    courierPlanAndCounts,
    foodCourierPlanAndCounts,
    warehouses,
    currentCityId,
    activeOrders,
    selectedCityWarehouses,
    isDedicatedMarkersVisible,
    setIsDedicatedMarkersVisible,
    isPoolMarkersVisible,
    setIsPoolMarkersVisible,
    isReturnMarkersVisible,
    isGFOrderMarkersVisible,
    isGLOrderMarkersVisible,
    setIsReturnMarkersVisible,
    setIsGFOrderMarkersVisible,
    setIsGLOrderMarkersVisible,
    isGLWarehouseMarkersVisible,
    isGFWarehouseMarkersVisible,
    isGLAndGFWarehouseMarkersVisible,
    setIsGLWarehouseMarkersVisible,
    setIsGFWarehouseMarkersVisible,
    setIsGLAndGFWarehouseMarkersVisible,
    selectedMarkerId,
    selectedMarkerType,
    redBasketOrder,
    warehousesMap,
    couriersMap,
    onCloseInfoTable,
    currentCountryId,
    selectedCourierVehicleTypes,
    setSelectedCourierVehicleTypes,
    setSelectedAllWarehouses,
    isActiveAllWarehouses,
  } = props;
  const [expandableKeys, setExpandableKeys] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isStatusTotalsVisible, setIsStatusTotalsVisible] = useState(false);
  const [isReturnStatusTotalsVisible, setIsReturnStatusTotalsVisible] = useState(false);
  const [collapseText, setCollapseText] = useState('');

  const arrangedData = useMemo(() => {
    if (!isEmpty(courierPlanAndCounts) && currentCityId && currentCountryId) {
      const countryCode = COUNTRY_CODES[currentCountryId];
      const foodTotalRow = foodCourierPlanAndCounts?.data?.total?.domainType?.[GETIR_FOOD_DOMAIN_TYPE] || {};
      const foodCityRow = foodCourierPlanAndCounts?.data?.currentCityId?.domainType?.[GETIR_FOOD_DOMAIN_TYPE] || {};
      const foodCountryRow = foodCourierPlanAndCounts?.data?.byCountryCodes?.[countryCode]?.domainType?.[GETIR_FOOD_DOMAIN_TYPE] || {};
      Object.assign(courierPlanAndCounts.data.total.domainType, { food: foodTotalRow });
      Object.assign(courierPlanAndCounts.data.byCountryCodes?.[countryCode]?.domainType, { food: foodCountryRow });
      Object.assign(courierPlanAndCounts.data[currentCityId]?.domainType, { food: foodCityRow });
    }
    return courierPlanAndCounts;
  }, [courierPlanAndCounts, foodCourierPlanAndCounts, currentCityId, currentCountryId]);

  const handleTermChange = event => {
    if (searchTerm.length === 0 && isEmpty(event.target.value.trim())) {
      return;
    }
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    dispatch(Creators.setWarehouseSearchTerm({ searchValue }));
  };

  const handleCollapseTable = key => {
    setCollapseText(key.length > 0 ? t('artisanLiveMapPage:HIDE_TABLE') : t('artisanLiveMapPage:SHOW_TABLE'));
  };

  return (
    <Collapse
      defaultActiveKey={['1']}
      className={classes.collapseContainer}
      onChange={handleCollapseTable}
    >
      <Panel header={collapseText || t('artisanLiveMapPage:HIDE_TABLE')} key="1">
        <div className={classes.courierCountsContainer}>
          <div id="courierMapContainer" className={classes.courierCountsWrapper}>
            <span className={classes.filtersSpan}>{t('artisanLiveMapPage:WAREHOUSE')}</span>
            <hr className={classes.customizeHr} />
            <div className={classes.domainFilterWrapper}>
              <span className={classes.subFilterText}>{t('artisanLiveMapPage:LOCALS_WAREHOUSE')}</span>
              <Switch
                type={isGLWarehouseMarkersVisible ? 'primary' : 'default'}
                onClick={() => setIsGLWarehouseMarkersVisible(!isGLWarehouseMarkersVisible)}
                className={classes.domainFilterButtons}
                size="small"
                defaultChecked
              />
            </div>
            <div className={classes.domainFilterWrapper}>
              <span className={classes.subFilterText}>{t('artisanLiveMapPage:LOCALS_AND_FOOD_WAREHOUSE')}</span>
              <Switch
                type={isGLAndGFWarehouseMarkersVisible ? 'primary' : 'default'}
                onClick={() => setIsGLAndGFWarehouseMarkersVisible(!isGLAndGFWarehouseMarkersVisible)}
                className={classes.domainFilterButtons}
                size="small"
                defaultChecked
              />
            </div>
            <div className={classes.domainFilterWrapper}>
              <span className={classes.subFilterText}>{t('artisanLiveMapPage:FOOD_WAREHOUSE')}</span>
              <Switch
                type={isGFWarehouseMarkersVisible ? 'primary' : 'default'}
                onClick={() => setIsGFWarehouseMarkersVisible(!isGFWarehouseMarkersVisible)}
                className={classes.domainFilterButtons}
                size="small"
              />
            </div>
            <span className={classes.filtersSpan}>{t('artisanLiveMapPage:COURIER')}</span>
            <hr className={classes.customizeHr} />
            <div className={classes.domainFilterWrapper}>
              <span className={classes.subFilterText}>{t('artisanLiveMapPage:DEDICATED_COURIERS')}</span>
              <Switch
                type={isDedicatedMarkersVisible ? 'primary' : 'default'}
                onClick={() => setIsDedicatedMarkersVisible(!isDedicatedMarkersVisible)}
                className={classes.domainFilterButtons}
                size="small"
                defaultChecked
              />
            </div>
            <div className={classes.domainFilterWrapper}>
              <span className={classes.subFilterText}>{t('artisanLiveMapPage:POOL_COURIERS')}</span>
              <Switch
                type={isPoolMarkersVisible ? 'primary' : 'default'}
                onClick={() => setIsPoolMarkersVisible(!isPoolMarkersVisible)}
                className={classes.domainFilterButtons}
                size="small"
              />
            </div>
            <span className={classes.filtersSpan}>{t('artisanLiveMapPage:VEHICLE_TYPE')}</span>
            <hr className={classes.customizeHr} />
            <div className={classes.vehicleFilterWrapper}>
              <div className={classes.vehicleFilterButtonsWrapper}>
                <span className={classes.subFilterText}>{t('artisanLiveMapPage:MOTO')}</span>
                <Switch
                  type={selectedCourierVehicleTypes.includes(VEHICLE_TYPE.MOTO) ? 'primary' : 'default'}
                  onClick={() => setSelectedCourierVehicleTypes(VEHICLE_TYPE.MOTO)}
                  className={classes.vehicleFilterButtons}
                  size="small"
                  defaultChecked
                />
              </div>
              <div className={classes.vehicleFilterButtonsWrapper}>
                <span className={classes.subFilterText}>{t('artisanLiveMapPage:MOTO_50CC')}</span>
                <Switch
                  type={selectedCourierVehicleTypes.includes(VEHICLE_TYPE.MOTO_50CC) ? 'primary' : 'default'}
                  onClick={() => setSelectedCourierVehicleTypes(VEHICLE_TYPE.MOTO_50CC)}
                  className={classes.vehicleFilterButtons}
                  size="small"
                  defaultChecked
                />
              </div>
              <div className={classes.vehicleFilterButtonsWrapper}>
                <span className={classes.subFilterText}>{t('artisanLiveMapPage:VAN')}</span>
                <Switch
                  type={selectedCourierVehicleTypes.includes(VEHICLE_TYPE.VAN) ? 'primary' : 'default'}
                  onClick={() => setSelectedCourierVehicleTypes(VEHICLE_TYPE.VAN)}
                  className={classes.vehicleFilterButtons}
                  size="small"
                  defaultChecked
                />
              </div>
            </div>
            <span className={classes.filtersSpan}>{t('artisanLiveMapPage:ORDER')}</span>
            <hr className={classes.customizeHr} />
            <div className={classes.courierFilterWrapper}>
              <div className={classes.courierFilterButtonsWrapper}>
                <span className={classes.subFilterText}>{t('artisanLiveMapPage:LOCALS_ORDER')}</span>
                <Switch
                  type={isGLOrderMarkersVisible ? 'primary' : 'default'}
                  onClick={() => setIsGLOrderMarkersVisible(!isGLOrderMarkersVisible)}
                  className={classes.courierFilterButtons}
                  size="small"
                  defaultChecked
                />
              </div>
              <div className={classes.courierFilterButtonsWrapper}>
                <span className={classes.subFilterText}>{t('artisanLiveMapPage:FOOD_ORDER')}</span>
                <Switch
                  type={isGFOrderMarkersVisible ? 'primary' : 'default'}
                  onClick={() => setIsGFOrderMarkersVisible(!isGFOrderMarkersVisible)}
                  className={classes.courierFilterButtons}
                  size="small"
                  defaultChecked
                />
              </div>
              <div className={classes.courierFilterButtonsWrapper}>
                <span className={classes.subFilterText}>{t('artisanLiveMapPage:RETURN')}</span>
                <Switch
                  type={isReturnMarkersVisible ? 'primary' : 'default'}
                  onClick={() => setIsReturnMarkersVisible(!isReturnMarkersVisible)}
                  className={classes.courierFilterButtons}
                  size="small"
                  defaultChecked
                />
              </div>
            </div>
            <hr className={classes.customizeHr} />
            <div className={classes.vehicleFilterWrapper}>
              <div className={classes.vehicleFilterButtonsWrapper}>
                <span className={classes.subFilterText}>{t('artisanLiveMapPage:SHOW_ALL_WAREHOUSES')}</span>
                <Switch
                  type={isActiveAllWarehouses ? 'primary' : 'default'}
                  onClick={setSelectedAllWarehouses}
                  className={classes.vehicleFilterButtons}
                  size="small"
                />
              </div>
            </div>
            <hr className={classes.customizeHr} />
            <div>
              <input
                className={classes.searchBox}
                placeholder={t('global:WAREHOUSE')}
                type="text"
                value={searchTerm}
                onInput={handleTermChange}
              />
            </div>
            <TotalCourierCountsTable
              courierPlanAndCounts={arrangedData}
              warehouses={warehouses}
              currentCityId={currentCityId}
              searchTerm={searchTerm}
              expandableKeys={expandableKeys}
              setExpandableKeys={setExpandableKeys}
              selectedCourierVehicleTypes={selectedCourierVehicleTypes}
            />
            <hr />
            <TotalCourierCountsByLocationTable
              courierPlanAndCounts={arrangedData}
              warehouses={warehouses}
              searchTerm={searchTerm}
              expandableKeys={expandableKeys}
              setExpandableKeys={setExpandableKeys}
              currentCountryId={currentCountryId}
              selectedCourierVehicleTypes={selectedCourierVehicleTypes}
            />
            <WarehousesStats warehouses={selectedCityWarehouses} couriers={couriers} currentCityId={currentCityId} />
            {canAccess(permKey.PAGE_ARTISAN_LIVE_MAP_ACTIVE_ORDERS_COMPONENT) && (
              <ArtisanActiveOrders
                activeOrders={activeOrders}
                isStatusTotalsVisible={isStatusTotalsVisible}
                setIsStatusTotalsVisible={setIsStatusTotalsVisible}
              />
            )}
            {canAccess(permKey.PAGE_ARTISAN_LIVE_MAP_ACTIVE_ORDERS_COMPONENT) && (
              <ArtisanActiveReturns
                couriers={couriers}
                isReturnStatusTotalsVisible={isReturnStatusTotalsVisible}
                setIsReturnStatusTotalsVisible={setIsReturnStatusTotalsVisible}
              />
            )}
          </div>
          {selectedMarkerType && selectedMarkerType === 'warehouse' &&
            <WarehouseInfoTable warehousesMap={warehousesMap} warehouseId={selectedMarkerId} onClose={onCloseInfoTable} />}
          {selectedMarkerType && selectedMarkerType === 'courier' && (
            <CourierInfoTable
              warehousesMap={warehousesMap}
              couriersMap={couriersMap}
              courierId={selectedMarkerId}
              onClose={onCloseInfoTable}
              activeOrders={activeOrders}
            />
          )}
          {selectedMarkerType && selectedMarkerType === 'redBasket' && redBasketOrder && (
            <RedBasketInfoTable
              order={redBasketOrder}
              onClose={onCloseInfoTable}
            />
          )}
        </div>
      </Panel>
    </Collapse>
  );
};

export default CourierPlanAndCountsTable;
