import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { compose } from 'redux';
import {
  YMaps,
  Map,
} from 'react-yandex-maps';

import warehouseMarker from '@shared/assets/markers/warehouse_primary.png';
import { createMap } from '@shared/utils/common';
import { operationalCountriesSelector as countriesSelector, getCitiesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import { SelectWrapper } from '@shared/components/UI/Form';
import SelectCity from '@shared/containers/Select/City';
import CourierPlanAndCountsTable from './components/CourierPlanAndCountsTable';
import FoodCourierPlanAndCountsTable from './components/FoodCourierPlanAndCountsTable';
import WarehouseInfoTable from './components/WarehouseInfoTable';
import CourierInfoTable from './components/CourierInfoTable';
import OverallStats from './components/OverallStats';
import { ENVIRONMENT } from '@shared/config';
import { getLangKey } from '@shared/i18n';
import {
  REDUX_KEY,
  COUNTRY_IDS,
  GETIR_FOOD_DOMAIN_TYPE,
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
} from '@shared/shared/constants';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators } from './redux/actions';
import {
  getActiveOrderCouriersAndWarehouses,
  getActiveOrderStats,
  getCourierPlanAndCounts,
  getOverallStats,
} from './redux/selectors';
import useStyles from './styles';
import { dedicatedCourierMarker, poolCourierMarker } from './courierMarkers';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';

const INITIAL_CITY_ID = '55999ad00000010001000000';
const INITIAL_COUNTRY_ID = COUNTRY_IDS.TR;

const FoodLiveMap = () => {
  usePageViewAnalytics({ name: ROUTE.FOOD_LIVE_MAP.name, squad: ROUTE.FOOD_LIVE_MAP.squad });
  const dispatch = useDispatch();
  const classes = useStyles();
  const mapRef = useRef();
  const ymapsRef = useRef();
  const [currentCityId, setCurrentCityId] = useState(INITIAL_CITY_ID);
  const [currentCountryId, setCurrentCountryId] = useState(INITIAL_COUNTRY_ID);
  const countries = useSelector(countriesSelector.getData || []);
  const cities = useSelector(getCitiesSelector.getData || []);

  const activeOrderStats = useSelector(getActiveOrderStats.getData || []);
  const overallStats = useSelector(getOverallStats.getData || []);
  const courierPlanAndCounts = useSelector(getCourierPlanAndCounts.getData || {});
  const [mapLoaded, setMapLoaded] = useState(false);
  const activeOrderCouriersAndWarehouses = useSelector(getActiveOrderCouriersAndWarehouses.getData || {});
  const [selectedCityCouriers, setSelectedCityCouriers] = useState([]);
  const [selectedCityWarehouses, setSelectedCityWarehouses] = useState([]);
  const [selectedMarkerType, setSelectedMarkerType] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [warehousesMap, setWarehousesMap] = useState([]);
  const [couriersMap, setCouriersMap] = useState([]);
  const [mapCenter, setMapCenter] = useState(get(selectedCityWarehouses, [0, 'location', 'coordinates'], [29, 41]).reverse());
  const [cityChangeFlag, setCityChangeFlag] = useState(false);
  const [warehouseMarkerFilterArray, setWarehouseMarkerFilterArray] = useState([
    GETIR_FOOD_DOMAIN_TYPE,
  ]);
  const [courierMarkerFilterArray, setCourierMarkerFilterArray] = useState([
    GETIR_FOOD_DOMAIN_TYPE,
  ]);

  const warehouses = useSelector(getWarehousesSelector.getData || []);
  const { Can, canAccess } = usePermission();

  const closeMarkerInfoTable = () => {
    setSelectedMarkerId(null);
    setSelectedMarkerType(null);
  };

  useEffect(() => {
    dispatch(Creators.initPage());

    dispatch(CommonCreators.getOperationalCountriesRequest());

    dispatch(CommonCreators.getWarehousesRequest({ countryId: INITIAL_COUNTRY_ID }));

    return () => {
      dispatch(Creators.destroyPage());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(CommonCreators.getCitiesRequest({ countryId: currentCountryId }));
  }, [dispatch, currentCountryId]);

  useEffect(() => {
    setCityChangeFlag(true);
    setSelectedMarkerId(null);
    setSelectedMarkerType(null);
    if (canAccess(permKey.PAGE_FOOD_LIVE_MAP_ORDER_COUNTS_AND_REVENUE_COMPONENT)) {
      dispatch(Creators.getOverallStatsRequest({
        selectedCity: currentCityId,
        selectedCountry: currentCountryId,
      }));
    }
    if (canAccess(permKey.PAGE_FOOD_LIVE_MAP_ALL_DOMAINS_COURIER_PLAN_AND_COUNTS_COMPONENT)) {
      dispatch(Creators.getCourierPlanAndCountsRequest());
    }
    else {
      dispatch(Creators.getFoodCourierPlanAndCountsRequest());
    }
    dispatch(Creators.getActiveOrderCouriersAndWarehousesRequest({ cityId: currentCityId }));
    dispatch(Creators.getActiveOrderStatsRequest({ cityId: currentCityId }));
  }, [dispatch, canAccess, currentCountryId, currentCityId]);

  useEffect(() => {
    if (activeOrderCouriersAndWarehouses) {
      setSelectedCityCouriers(get(activeOrderCouriersAndWarehouses, [currentCityId, 'couriers']));
      setSelectedCityWarehouses(get(activeOrderCouriersAndWarehouses, [currentCityId, 'warehouses']));
    }
  }, [dispatch, activeOrderCouriersAndWarehouses, currentCityId]);

  const domainTypeChecker = ({ currentDomainTypes, filterDomainTypes }) => {
    const isChecks = [];

    for (let index = 0; index < filterDomainTypes.length; index += 1) {
      const filterDomainType = filterDomainTypes[index];

      if (filterDomainType === GETIR_10_DOMAIN_TYPE) {
        const isCheckValid = currentDomainTypes.includes(GETIR_10_DOMAIN_TYPE) && !currentDomainTypes.includes(GETIR_MARKET_DOMAIN_TYPE);
        isChecks.push(isCheckValid);
      }

      if (filterDomainType === GETIR_FOOD_DOMAIN_TYPE) {
        const isCheckValid = currentDomainTypes.includes(GETIR_FOOD_DOMAIN_TYPE)
          && !currentDomainTypes.includes(GETIR_10_DOMAIN_TYPE)
          && !currentDomainTypes.includes(GETIR_MARKET_DOMAIN_TYPE);
        isChecks.push(isCheckValid);
      }

      if (filterDomainType === GETIR_MARKET_DOMAIN_TYPE) {
        isChecks.push(currentDomainTypes.includes(GETIR_MARKET_DOMAIN_TYPE));
      }
    }

    return isChecks;
  };

  const checkWarehouseFilter = useCallback(domainTypes => {
    const isChecks = domainTypeChecker({
      currentDomainTypes: domainTypes,
      filterDomainTypes: warehouseMarkerFilterArray,
    });

    return isChecks.some(check => check);
  }, [warehouseMarkerFilterArray]);

  const checkCourierFilter = useCallback(domainTypes => {
    const isChecks = domainTypeChecker({
      currentDomainTypes: domainTypes,
      filterDomainTypes: courierMarkerFilterArray,
    });

    return isChecks.some(check => check);
  }, [courierMarkerFilterArray]);

  const courierMarker = (domainTypes, status) => {
    if (domainTypes.length === 1 && domainTypes[0] === GETIR_FOOD_DOMAIN_TYPE) {
      return dedicatedCourierMarker[status];
    }
    return poolCourierMarker[status];
  };

  useEffect(() => {
    const loadCouriersAndWarehouses = () => {
      if (mapRef && mapRef.current && mapLoaded) {
        const objectManager = ymapsRef.current;
        objectManager.removeAll();
        const objects = [];
        for (let i = 0; i < selectedCityCouriers.length; i += 1) {
          const courier = selectedCityCouriers[i];
          objects.push({
            type: 'Feature',
            id: courier._id,
            domainTypes: courier.domainTypes,
            markerType: 'courier',
            geometry: {
              type: 'Point',
              coordinates: [
                get(courier, ['location', 'coordinates', 1]),
                get(courier, ['location', 'coordinates', 0]),
              ],
            },
            options: {
              draggable: false,
              iconLayout: 'default#image',
              iconImageHref: courierMarker(courier.domainTypes, courier.status),
              iconImageSize: [28, 28],
              iconImageOffset: [-16, -24],
              zIndex: 500,
            },
          });
        }

        for (let i = 0; i < selectedCityWarehouses.length; i += 1) {
          const warehouse = selectedCityWarehouses[i];
          objects.push({
            type: 'Feature',
            id: warehouse._id,
            domainTypes: warehouse.domainTypes,
            markerType: 'warehouse',
            geometry: {
              type: 'Point',
              coordinates: [
                get(warehouse, ['location', 'coordinates', 1]),
                get(warehouse, ['location', 'coordinates', 0]),
              ],
            },
            options: {
              draggable: false,
              iconLayout: 'default#image',
              iconImageHref: warehouseMarker,
              iconImageSize: [16, 16],
              iconImageOffset: [-9, -16],
              zIndex: 600,
            },
          });
        }
        objectManager.add(objects);
        objectManager.objects.events.add('click', e => {
          const overlay = e.get('overlay');
          const id = e.get('objectId');
          const markerType = get(overlay, ['_data', 'markerType']);
          setSelectedMarkerType(markerType);
          setSelectedMarkerId(id);
        });
        objectManager.setFilter(object => {
          if (object.markerType === 'warehouse') {
            return (object.domainTypes && checkWarehouseFilter(object.domainTypes));
          }

          if (object.markerType === 'courier') {
            return (object.domainTypes && checkCourierFilter(object.domainTypes));
          }

          return true;
        });
        mapRef.current.geoObjects.add(objectManager);
      }
    };
    if (selectedCityCouriers && selectedCityWarehouses) {
      setWarehousesMap(createMap(selectedCityWarehouses));
      setCouriersMap(createMap(selectedCityCouriers));
      if (cityChangeFlag) {
        setMapCenter(get(selectedCityWarehouses, [0, 'location', 'coordinates'], [29, 41]).reverse());
        setCityChangeFlag(false);
      }
      loadCouriersAndWarehouses();
    }
  }, [dispatch, selectedCityCouriers, selectedCityWarehouses, mapLoaded, cityChangeFlag, checkWarehouseFilter, checkCourierFilter]);

  const handleCityChange = selectedCityId => {
    setCurrentCityId(selectedCityId);
  };

  const handleCountryChange = selectedCountryId => {
    setCurrentCityId(null);
    setCurrentCountryId(selectedCountryId);
  };

  useEffect(() => {
    const objectManager = ymapsRef.current;
    if (mapRef && mapRef.current) {
      objectManager.setFilter(obj => {
        if (obj.markerType === 'warehouse') {
          return (obj.domainTypes && checkWarehouseFilter(obj.domainTypes));
        }

        if (obj.markerType === 'courier') {
          return (obj.domainTypes && checkCourierFilter(obj.domainTypes));
        }
        return true;
      });
    }
  }, [warehouseMarkerFilterArray, courierMarkerFilterArray, checkWarehouseFilter, checkCourierFilter]);

  useEffect(() => {
    if (currentCityId && ymapsRef.current) {
      const objectManager = ymapsRef.current;
      objectManager.removeAll();
      mapRef.current.geoObjects.add(objectManager);
    }
  }, [currentCityId]);

  const handleWarehouseFilterButtonClick = domainType => {
    const newArray = warehouseMarkerFilterArray.slice();
    if (newArray.includes(domainType)) {
      const ind = newArray.indexOf(domainType);
      newArray.splice(ind, 1);
      setWarehouseMarkerFilterArray(newArray);
    }
    else {
      newArray.push(domainType);
      setWarehouseMarkerFilterArray(newArray);
    }
  };

  const handleCourierFilterButtonClick = domainType => {
    const newArray = courierMarkerFilterArray.slice();
    if (newArray.includes(domainType)) {
      const ind = newArray.indexOf(domainType);
      newArray.splice(ind, 1);
      setCourierMarkerFilterArray(newArray);
    }
    else {
      newArray.push(domainType);
      setCourierMarkerFilterArray(newArray);
    }
  };

  const deleteWarehouseFiltersButtonClicked = () => {
    setWarehouseMarkerFilterArray([]);
  };

  const deleteCourierFiltersButtonClicked = () => {
    setCourierMarkerFilterArray([]);
  };

  return (
    <>
      <div className={classes.selectsWrapper}>
        <div className={classes.selectOuterWrapper}>
          <div className={classes.selectInnerWrapper}>
            <SelectWrapper
              selectKey="countryId"
              value={currentCountryId}
              optionsData={countries}
              optionLabelProp={`name.${getLangKey()}`}
              optionValueProp="_id"
              onChangeCallback={handleCountryChange}
              disabled
            />
          </div>
        </div>
        <div className={classes.selectOuterWrapper}>
          <div className={classes.selectInnerWrapper}>
            <SelectCity
              mode="single"
              value={currentCityId}
              onChange={handleCityChange}
              showArrow={false}
            />
          </div>
        </div>
      </div>
      <div className={classes.mapWrapper}>
        <YMaps
          query={{
            lang: 'tr_TR',
            apikey: ENVIRONMENT.YANDEX_JS_KEY,
          }}
        >
          <Map
            instanceRef={ref => {
              mapRef.current = ref;
            }}
            state={{ center: mapCenter, zoom: 10 }}
            width="100%"
            height="100%"
            onLoad={ymaps => {
              ymapsRef.current = new ymaps.ObjectManager();
              setMapLoaded(true);
            }}
            modules={['ObjectManager']}
            options={{ autoFitToViewport: 'always' }}
          />
        </YMaps>
      </div>
      <Can permKey={permKey.PAGE_FOOD_LIVE_MAP_ORDER_COUNTS_AND_REVENUE_COMPONENT}>
        <OverallStats overallStats={overallStats}>
          <div className={classes.restaurantStatistics}>
            <tr>
              <td>SAR: {activeOrderStats.actives}</td>
              <td> |</td>
              <td>AR: {activeOrderStats.opens}</td>
              <td> |</td>
              <td>ARG: {activeOrderStats.openAndRGs}</td>
              <td> |</td>
              <td>KARG: {activeOrderStats.courierRGToOpenRGRatio}</td>
              <td> |</td>
              <td>YRG: {activeOrderStats.busyOnes} ({activeOrderStats.busyToCourierAndRGRatio})</td>
            </tr>
          </div>
        </OverallStats>
      </Can>
      {canAccess(permKey.PAGE_FOOD_LIVE_MAP_ALL_DOMAINS_COURIER_PLAN_AND_COUNTS_COMPONENT) && (
        <div>
          <CourierPlanAndCountsTable
            onWarehouseFilterButtonClicked={handleWarehouseFilterButtonClick}
            onCourierFilterButtonClicked={handleCourierFilterButtonClick}
            deleteWarehouseFiltersButtonClicked={deleteWarehouseFiltersButtonClicked}
            deleteCourierFiltersButtonClicked={deleteCourierFiltersButtonClicked}
            warehouseMarkerFilterArray={warehouseMarkerFilterArray}
            courierMarkerFilterArray={courierMarkerFilterArray}
            warehouses={warehouses}
            courierPlanAndCounts={courierPlanAndCounts}
            currentCityId={currentCityId}
            currentCountryId={currentCountryId}
            currentCountry={countries.find(country => country._id === currentCountryId)}
            currentCity={cities.find(city => city._id === currentCityId)}
          />
        </div>
      )}
      {!canAccess(permKey.PAGE_FOOD_LIVE_MAP_ALL_DOMAINS_COURIER_PLAN_AND_COUNTS_COMPONENT) && (
        <div>
          <FoodCourierPlanAndCountsTable
            warehouses={warehouses}
            courierPlanAndCounts={courierPlanAndCounts}
            currentCityId={currentCityId}
            currentCountryId={currentCountryId}
            currentCountry={countries.find(country => country._id === currentCountryId)}
            currentCity={cities.find(city => city._id === currentCityId)}
          />
        </div>
      )}
      {
        selectedMarkerType && selectedMarkerType === 'warehouse' &&
        <WarehouseInfoTable warehousesMap={warehousesMap} warehouseId={selectedMarkerId} onClose={closeMarkerInfoTable} />
      }
      {
        selectedMarkerType && selectedMarkerType === 'courier' &&
        (
          <CourierInfoTable
            warehousesMap={warehousesMap}
            couriersMap={couriersMap}
            courierId={selectedMarkerId}
            onClose={closeMarkerInfoTable}
          />
        )
      }
    </>
  );
};

const reduxKey = REDUX_KEY.FOOD.LIVE_MAP;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(FoodLiveMap);
