/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useRef, useState } from 'react';
import { YMaps, Map, ZoomControl, ObjectManager } from 'react-yandex-maps';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { get, isEmpty } from 'lodash';
import { Form, Row, Col } from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';

import {
  OverallStats,
  CourierPlanAndCountsTable,
  ArtisanCourierPlanAndCountsTable,
  ActiveOrders,
} from './components';
import useStyles from './styles';
import { SelectWrapper } from '@shared/components/UI/Form';
import { ENVIRONMENT } from '@shared/config';
import {
  REDUX_KEY,
  COUNTRY_IDS,
  GETIR_LOCALS_DOMAIN_TYPE,
  GETIR_FOOD_DOMAIN_TYPE,
  COURIER_STATUS_STEADY,
  COURIER_STATUS_STEADY_RETURN,
  COURIER_RETURN_STATUS_SLOT_VERIFY,
  COURIER_RETURN_STATUS_CANCELED,
  COURIER_STATUS_LONG_BUSY,
  COURIER_STATUS_LONG_CANCELLED,
  COURIER_STATUS_LONG_AVAILABLE,
  WAREHOUSE_ACTIVE_STATE,
  WAREHOUSE_BUSY_STATUS,
} from '@shared/shared/constants';
import { operationalCountriesSelector as countriesSelector, getCitiesSelector, getActiveWarehousesSelector } from '@shared/redux/selectors/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getLangKey } from '@shared/i18n';
import injectSaga from '@shared/utils/injectSaga';
import injectReducer from '@shared/utils/injectReducer';
import { createMap } from '@shared/utils/common';
import saga from './redux/saga';
import reducer from './redux/reducer';
import { Creators as CommonCreators } from '@shared/redux/actions/common';
import { Creators } from './redux/actions';
import {
  getArtisanActiveOrders,
  getCourierPlanAndCounts,
  getFoodCourierPlanAndCounts,
  getCouriers,
  getOverallStats,
  getWarehouseSearchTerm,
  redBasketDataSelector,
} from './redux/selectors';
import { usePageViewAnalytics, usePermission } from '@shared/hooks';

import { ROUTE } from '@app/routes';
import permKey from '@shared/shared/permKey.json';
import { artisanCourierMarkers } from './courierMarkers';
import {
  checkIsDedicatedLocalWarehouse,
  checkIsFoodWarehouse,
  checkIsLocalsWarehouse,
  checkIsReturnCourier,
  checkIsFoodLocalsWarehouse,
  checkIsStatusLongBusy,
  checkIsCourierStatusLongCancelled,
  checkIsStatusSteady,
  checkIsStatusLongAvailable,
} from './utils';
import foodLocalsLowUtilMarker from '@shared/assets/markers/marker_gf_gl_low_util.png';
import foodLocalsHighUtilMarker from '@shared/assets/markers/marker_gf_gl_high_util.png';
import foodLowUtilMarker from '@shared/assets/markers/artisan_food_low_util_warehouse.png';
import foodHighUtilMarker from '@shared/assets/markers/artisan_food_high_util_warehouse.png';
import foodBusyMarker from '@shared/assets/markers/artisan_food_busy_warehouse.png';
import redBasketMarker from '@shared/assets/markers/artisan_courier_redbasket.png';
import warehouseLowUtilization from '@shared/assets/markers/locals_warehouse_low_util.png';
import warehouseLowUtilizationAnimated from '@shared/assets/markers/locals_warehouse_low_util_animated.svg';
import warehouseHighUtilization from '@shared/assets/markers/locals_warehouse_high_util.png';
import warehouseHighUtilizationAnimated from '@shared/assets/markers/locals_warehouse_high_util_animated.svg';
import warehouseBusyMarker from '@shared/assets/markers/artisan_busy_warehouse.png';
import returnWarehouseLowUtilizationMarker from '@shared/assets/markers/locals_return_warehouse_low_util.png';
import returnWarehouseHighUtilizationMarker from '@shared/assets/markers/locals_return_warehouse_high_util.png';
import returnWarehouseBusyMarker from '@shared/assets/markers/locals_return_warehouse_busy.png';
import foodLocalsBusyMarker from '@shared/assets/markers/marker_gf_gl_busy_warehouse.png';

import {
  ANIMATED_MARKER_SIZE,
  DEFAULT_COURIER_VEHICLE_TYPE,
  DEFAULT_MARKER_SIZE,
  LOCALS_WAREHOUSE_UTILIZATION_THRESHOLD,
  MEDIUM_MARKER_SIZE,
  DEFAULT_FOOD_WH_MARKER_SIZE,
} from './constants';
import useDebounce from '@shared/shared/hooks/useDebounce';

const { useForm } = Form;

const INITIAL_CITY_ID = '55999ad00000010001000000';

const ArtisanOrderLiveMap = () => {
  const dispatch = useDispatch();
  const { Can, canAccess } = usePermission();
  const mapRef = useRef();
  const objectManagerRef = useRef();
  const [currentCityId, setCurrentCityId] = useState(INITIAL_CITY_ID);
  const classes = useStyles();
  const [form] = useForm();

  usePageViewAnalytics({ name: ROUTE.ARTISAN_ORDER_LIVE_MAP.name, squad: ROUTE.ARTISAN_ORDER_LIVE_MAP.squad });

  const defaultSelectedCountry = getSelectedCountry();
  const countries = useSelector(countriesSelector.getData || []);
  const cities = useSelector(getCitiesSelector.getData);
  const overallStats = useSelector(getOverallStats.getData || []);
  const courierPlanAndCounts = useSelector(getCourierPlanAndCounts.getData || {});
  const foodCourierPlanAndCounts = useSelector(getFoodCourierPlanAndCounts.getData || {});
  const [mapLoaded, setMapLoaded] = useState(false);
  const warehouses = useSelector(getActiveWarehousesSelector.getData || []);
  const [selectedCityCouriers, setSelectedCityCouriers] = useState([]);
  const [selectedCityWarehouses, setSelectedCityWarehouses] = useState([]);
  const [selectedMarkerType, setSelectedMarkerType] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [warehousesMap, setWarehousesMap] = useState([]);
  const [couriersMap, setCouriersMap] = useState([]);
  const [cityChangeFlag, setCityChangeFlag] = useState(false);
  const [mapCenter, setMapCenter] = useState([41, 29]);
  const couriers = useSelector(getCouriers.getData);
  const redBasket = useSelector(redBasketDataSelector.getData);
  const artisanActiveOrders = useSelector(getArtisanActiveOrders.getData);
  const [selectedWarehouses, setSelectedWarehouses] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isDedicatedMarkersVisible, setIsDedicatedMarkersVisible] = useState(true);
  const [isPoolMarkersVisible, setIsPoolMarkersVisible] = useState(false);
  const warehouseSearchTerm = useSelector(getWarehouseSearchTerm.getData || []);
  const [features, setFeatures] = useState([]);
  const [selectedCourierVehicleTypes, setSelectedCourierVehicleTypes] = useState(DEFAULT_COURIER_VEHICLE_TYPE);
  const [isActiveAllWarehouses, setIsActiveAllWarehouses] = useState(false);
  const [isReturnMarkersVisible, setIsReturnMarkersVisible] = useState(true);
  const [isGFOrderMarkersVisible, setIsGFOrderMarkersVisible] = useState(true);
  const [isGLOrderMarkersVisible, setIsGLOrderMarkersVisible] = useState(true);
  const [isGLWarehouseMarkersVisible, setIsGLWarehouseMarkersVisible] = useState(true);
  const [isGLAndGFWarehouseMarkersVisible, setIsGLAndGFWarehouseMarkersVisible] = useState(true);
  const [isGFWarehouseMarkersVisible, setIsGFWarehouseMarkersVisible] = useState(false);

  const defaultState = { center: mapCenter, zoom: 11 };
  const layout = { wrapperCol: { span: 16 } };

  const formik = useFormik({
    initialValues: {
      cityId: INITIAL_CITY_ID,
      countryId: get(defaultSelectedCountry, '_id', COUNTRY_IDS.TR),
    },
    enableReinitialize: true,
  });
  const { values, setFieldValue } = formik;

  const handleCityChange = selectedCityId => {
    setFieldValue('cityId', selectedCityId);
    setCurrentCityId(selectedCityId);
  };

  const handleSetSelectedCourierVehicleTypes = selectedVehicleType => {
    const isVehicleTypeSelectedBefore = selectedCourierVehicleTypes.includes(selectedVehicleType);
    if (!isVehicleTypeSelectedBefore) {
      setSelectedCourierVehicleTypes([
        ...selectedCourierVehicleTypes,
        selectedVehicleType,
      ]);
      return;
    }
    setSelectedCourierVehicleTypes(previousVehicleTypes => {
      return previousVehicleTypes.filter(vehicleType => vehicleType !== selectedVehicleType);
    });
  };

  const handleSetSelectedAllWarehouses = () => {
    if (!isActiveAllWarehouses) {
      const object = [];
      selectedCityWarehouses.map(warehouse => object.push(warehouse._id));
      setSelectedWarehouses(object);
      setIsActiveAllWarehouses(true);
      return;
    }
    setSelectedWarehouses([]);
    setIsActiveAllWarehouses(false);
  };

  const closeMarkerInfoTable = () => {
    setSelectedMarkerId(null);
    setSelectedMarkerType(null);
  };

  const filterWarehouses = useCallback(() => {
    const filteredWarehouse = warehouses.filter(({ city }) => {
      if (isEmpty(city)) {
        return false;
      }
      return city._id === currentCityId;
    });
    return filteredWarehouse;
  }, [currentCityId, warehouses]);

  const courierMarker = useCallback(courier => {
    const { status, statusLastChangedAt, fleetVehicleType, _id, artisanOrder, foodOrder } = courier;
    const { courierVerifyAfterCheckoutDate } = artisanActiveOrders.find(order => (order?.courier?.id === _id && artisanOrder === order?._id)) || {};

    if (statusLastChangedAt) {
      const statusTime = moment(statusLastChangedAt);

      if (checkIsCourierStatusLongCancelled(status, statusTime)) {
        if (status === COURIER_RETURN_STATUS_CANCELED) {
          return artisanCourierMarkers[fleetVehicleType][COURIER_RETURN_STATUS_CANCELED];
        }
        return artisanCourierMarkers[fleetVehicleType][COURIER_STATUS_LONG_CANCELLED];
      }

      if (checkIsStatusLongBusy(status, statusTime)) {
        return artisanCourierMarkers[fleetVehicleType][COURIER_STATUS_LONG_BUSY];
      }

      if (checkIsStatusLongAvailable(status, statusTime)) {
        return artisanCourierMarkers[fleetVehicleType][COURIER_STATUS_LONG_AVAILABLE];
      }

      if (checkIsStatusSteady(status, statusTime, courierVerifyAfterCheckoutDate, foodOrder)) {
        if (status >= COURIER_RETURN_STATUS_SLOT_VERIFY && status <= COURIER_RETURN_STATUS_CANCELED) {
          return artisanCourierMarkers[fleetVehicleType][COURIER_STATUS_STEADY_RETURN];
        }
        return artisanCourierMarkers[fleetVehicleType][COURIER_STATUS_STEADY];
      }
    }
    return artisanCourierMarkers[fleetVehicleType][status];
  }, [artisanActiveOrders]);

  const getIconImageSize = useCallback((warehouseId, isSearchedWarehouse, isFoodWarehouse = false) => {
    const isSelectedWarehouse = selectedWarehouses.includes(warehouseId);
    if (isSelectedWarehouse) return MEDIUM_MARKER_SIZE;
    if (isSearchedWarehouse) return ANIMATED_MARKER_SIZE;
    if (isFoodWarehouse) return DEFAULT_FOOD_WH_MARKER_SIZE;
    return DEFAULT_MARKER_SIZE;
  }, [selectedWarehouses]);

  const warehouseMarkerAndSize = useCallback((
    warehouseId,
    warehouseName,
    isAcceptReturns,
    isFoodLocalsWarehouse,
    isFoodWarehouse,
  ) => {
    const isSearchedWarehouse = warehouseName && warehouseSearchTerm && warehouseName.toLowerCase().includes(warehouseSearchTerm);
    const targetWarehouseUtilization = get(
      courierPlanAndCounts,
      ['data', currentCityId, 'domainType', GETIR_LOCALS_DOMAIN_TYPE, 'warehousesMap', warehouseId],
      { utilization: 0 },
    );
    const targetFoodLocalsWarehouseUtilization = get(
      courierPlanAndCounts,
      ['data', currentCityId, 'domainType', GETIR_FOOD_DOMAIN_TYPE, 'warehousesMap', warehouseId],
      { utilization: 0 },
    );
    const targetFoodWarehouseUtilization = get(
      foodCourierPlanAndCounts,
      ['data', currentCityId, 'domainType', GETIR_FOOD_DOMAIN_TYPE, 'warehousesMap', warehouseId],
      { utilization: 0 },
    );

    const isUtilHigh = targetWarehouseUtilization.utilization >= LOCALS_WAREHOUSE_UTILIZATION_THRESHOLD;
    const isFoodLocalsUtilHigh = targetFoodLocalsWarehouseUtilization.utilization >= LOCALS_WAREHOUSE_UTILIZATION_THRESHOLD;
    const isFoodUtilHigh = targetFoodWarehouseUtilization.utilization >= LOCALS_WAREHOUSE_UTILIZATION_THRESHOLD;

    const isWarehouseBusy = warehousesMap[warehouseId]?.status === WAREHOUSE_BUSY_STATUS;

    const busyMarkerHref = isWarehouseBusy && warehouseBusyMarker;
    const returnBusyMarkerHref = isWarehouseBusy && returnWarehouseBusyMarker;
    const foodLocalsBusyMarkerHref = isWarehouseBusy && foodLocalsBusyMarker;
    const foodBusyMarkerHref = isWarehouseBusy && foodBusyMarker;

    if (isFoodLocalsWarehouse) {
      return {
        iconImageHref: foodLocalsBusyMarkerHref || (isFoodLocalsUtilHigh ? foodLocalsHighUtilMarker : foodLocalsLowUtilMarker),
        iconImageSize: getIconImageSize(warehouseId, isSearchedWarehouse),
      };
    }
    if (isFoodWarehouse) {
      return {
        iconImageHref: foodBusyMarkerHref || (isFoodUtilHigh ? foodHighUtilMarker : foodLowUtilMarker),
        iconImageSize: getIconImageSize(warehouseId, isSearchedWarehouse, true),
      };
    }
    if (isAcceptReturns) {
      return {
        iconImageHref: returnBusyMarkerHref || (isUtilHigh ? returnWarehouseHighUtilizationMarker : returnWarehouseLowUtilizationMarker),
        iconImageSize: getIconImageSize(warehouseId, isSearchedWarehouse),
      };
    }
    if (isSearchedWarehouse) {
      return {
        iconImageHref: busyMarkerHref || (isUtilHigh ? warehouseHighUtilizationAnimated : warehouseLowUtilizationAnimated),
        iconImageSize: getIconImageSize(warehouseId, isSearchedWarehouse),
      };
    }
    return {
      iconImageHref: busyMarkerHref || (isUtilHigh ? warehouseHighUtilization : warehouseLowUtilization),
      iconImageSize: getIconImageSize(warehouseId, isSearchedWarehouse),
    };
  }, [courierPlanAndCounts, currentCityId, foodCourierPlanAndCounts, getIconImageSize, warehouseSearchTerm, warehousesMap]);

  const checkIsWarehouseVisible = useCallback(warehouse => {
    const { domainTypes, state } = warehouse;
    if (checkIsDedicatedLocalWarehouse(domainTypes) && state === WAREHOUSE_ACTIVE_STATE) {
      if (!isGLWarehouseMarkersVisible && !isGFWarehouseMarkersVisible && !isGLAndGFWarehouseMarkersVisible) return false;
      if (!isGLWarehouseMarkersVisible && checkIsLocalsWarehouse(domainTypes)) return false;
      if (!isGLAndGFWarehouseMarkersVisible && checkIsFoodLocalsWarehouse(domainTypes)) return false;
      if (!isGFWarehouseMarkersVisible && checkIsFoodWarehouse(domainTypes)) return false;
      return true;
    }
    return false;
  }, [isGFWarehouseMarkersVisible, isGLWarehouseMarkersVisible, isGLAndGFWarehouseMarkersVisible]);

  const getWarehouseMarkers = useCallback(objects => {
    for (let i = 0; i < selectedCityWarehouses.length; i += 1) {
      const warehouse = selectedCityWarehouses[i];

      if (checkIsWarehouseVisible(warehouse)) {
        objects.push({
          type: 'Feature',
          id: warehouse._id,
          domainTypes: warehouse.domainTypes,
          markerType: 'warehouse',
          properties: {
            objectId: warehouse._id,
            hintContent: warehouse.name,
          },
          geometry: {
            type: 'Point',
            coordinates: [get(warehouse, ['location', 'coordinates', 1]),
              get(warehouse, ['location', 'coordinates', 0])],
          },
          options: {
            draggable: false,
            iconLayout: 'default#image',
            iconImageOffset: [-9, -16],
            zIndex: 600,
            ...warehouseMarkerAndSize(
              warehouse._id,
              warehouse.name,
              warehouse?.acceptReturns,
              checkIsFoodLocalsWarehouse(warehouse.domainTypes),
              checkIsFoodWarehouse(warehouse.domainTypes),
            ),
          },
        });
      }
    }
  }, [checkIsWarehouseVisible, selectedCityWarehouses, warehouseMarkerAndSize]);

  const checkIsCourierVisible = useCallback(courier => {
    const { domainTypes, fleetVehicleType, _id, statusLastChangedAt, status, warehouse, artisanOrder, foodOrder } = courier;
    const { courierVerifyAfterCheckoutDate } = artisanActiveOrders.find(order => (order?.courier?.id === _id && artisanOrder === order?._id)) || {};
    const isSelectedVehicleTypeEmpty = isEmpty(selectedCourierVehicleTypes);
    const isSelectedVehicleTypeIncludesFleetVehicleType = !isSelectedVehicleTypeEmpty && selectedCourierVehicleTypes.includes(fleetVehicleType);
    const isSteadyCourier = checkIsStatusSteady(status, moment(statusLastChangedAt), courierVerifyAfterCheckoutDate, foodOrder);
    const isLongBusy = checkIsStatusLongBusy(status, moment(statusLastChangedAt));
    const isLongAvailable = checkIsStatusLongAvailable(status, moment(statusLastChangedAt));
    const isWarehouseSelected = selectedWarehouses.includes(warehouse);

    if (!isGLWarehouseMarkersVisible && !isGFWarehouseMarkersVisible && !isGLAndGFWarehouseMarkersVisible) return false;
    if (!isGLWarehouseMarkersVisible && checkIsLocalsWarehouse(domainTypes)) return false;
    if (!isGLAndGFWarehouseMarkersVisible && checkIsFoodLocalsWarehouse(domainTypes)) return false;
    if (!isGFWarehouseMarkersVisible && checkIsFoodWarehouse(domainTypes)) return false;

    if (!isPoolMarkersVisible && !isDedicatedMarkersVisible) return false;
    if (!isDedicatedMarkersVisible && checkIsDedicatedLocalWarehouse(domainTypes)) return false;
    if (!isPoolMarkersVisible && !checkIsDedicatedLocalWarehouse(domainTypes)) return false;

    if (!isGLOrderMarkersVisible && !isGFOrderMarkersVisible && !isReturnMarkersVisible) return false;
    if (checkIsReturnCourier(status) && !isReturnMarkersVisible) return false;
    if (!isGLOrderMarkersVisible && artisanOrder) return false;
    if (!isGFOrderMarkersVisible && foodOrder) return false;

    if (!isSelectedVehicleTypeIncludesFleetVehicleType) return false;
    if (!checkIsDedicatedLocalWarehouse(domainTypes) && !(artisanOrder || foodOrder)) return false;
    if (isWarehouseSelected && checkIsDedicatedLocalWarehouse(domainTypes)) return true;
    if (isSteadyCourier || isLongBusy || isLongAvailable) return true;

    return false;
  }, [artisanActiveOrders, selectedCourierVehicleTypes, selectedWarehouses,
    isGLWarehouseMarkersVisible, isGFWarehouseMarkersVisible, isPoolMarkersVisible,
    isDedicatedMarkersVisible, isGLOrderMarkersVisible, isGFOrderMarkersVisible,
    isReturnMarkersVisible, isGLAndGFWarehouseMarkersVisible]);

  const getCourierMarkers = useCallback(objects => {
    for (let i = 0; i < selectedCityCouriers.length; i += 1) {
      const courier = selectedCityCouriers[i];
      if (checkIsCourierVisible(courier)) {
        objects.push({
          type: 'Feature',
          id: courier._id,
          domainTypes: courier.domainTypes,
          markerType: 'courier',
          warehouse: courier.warehouse,
          courierStatus: courier.status,
          statusLastChangedAt: courier.statusLastChangedAt,
          geometry: {
            type: 'Point',
            coordinates: [get(courier, ['location', 'coordinates', 1]),
              get(courier, ['location', 'coordinates', 0])],
          },
          options: {
            draggable: false,
            iconLayout: 'default#image',
            iconImageHref: courierMarker(courier),
            iconImageSize: [28, 28],
            iconImageOffset: [-16, -24],
            zIndex: 500,
          },
        });
      }
    }
  }, [checkIsCourierVisible, courierMarker, selectedCityCouriers]);

  const getRedBasketMarkers = useCallback(objects => {
    for (let i = 0; i < redBasket.length; i += 1) {
      const order = redBasket[i];
      objects.push({
        type: 'Feature',
        id: order.id,
        domainTypes: order.domainTypes,
        markerType: 'redBasket',
        geometry: {
          type: 'Point',
          coordinates: [get(order, ['deliveryAddress', 'location', 'coordinates', 1]),
            get(order, ['deliveryAddress', 'location', 'coordinates', 0])],
        },
        options: {
          draggable: false,
          iconLayout: 'default#image',
          iconImageHref: redBasketMarker,
          iconImageSize: MEDIUM_MARKER_SIZE,
          iconImageOffset: [-9, -16],
          zIndex: 600,
        },
      });
    }
  }, [redBasket]);

  const loadMarkers = useCallback(() => {
    if (mapRef && mapRef.current && mapLoaded && objectManagerRef && objectManagerRef.current) {
      const objects = [];
      getCourierMarkers(objects);
      getWarehouseMarkers(objects);
      getRedBasketMarkers(objects);

      setFeatures(objects);

      const objectManager = objectManagerRef.current;
      objectManager.objects.events._clearType('click');
      objectManager.objects.events.add('click', e => {
        const overlay = e.get('overlay');
        const id = e.get('objectId');
        const markerType = get(overlay, ['_data', 'markerType']);
        setSelectedMarkerType(markerType);
        setSelectedMarkerId(id);
        if (markerType === 'warehouse') {
          const doesExists = selectedWarehouses.find(x => x === id);
          const newSelectedWarehouses = doesExists ?
            selectedWarehouses.filter(x => x !== id) :
            [...selectedWarehouses, id];
          setSelectedWarehouses(newSelectedWarehouses);
        }
      });

      setTimeout(() => {
        objectManager._objectControllerAddon.getController()._refresh();
      }, 500);
    }
  }, [getCourierMarkers, getRedBasketMarkers, getWarehouseMarkers, mapLoaded, selectedWarehouses]);

  const setAnimatedWarehouseMarkers = useCallback(() => {
    if (mapRef && mapRef.current && mapLoaded && objectManagerRef && objectManagerRef.current) {
      const objectManager = objectManagerRef.current;
      window.objectManager = objectManager;
      selectedCityWarehouses.map(({ _id, name, acceptReturns, domainTypes }) => {
        const currentObject = objectManager.objects.getById(_id);
        if (!currentObject) {
          return null;
        }
        const { iconImageHref, iconImageSize } = currentObject.options;
        const imageAndSize = warehouseMarkerAndSize(
          _id,
          name,
          acceptReturns,
          checkIsFoodLocalsWarehouse(domainTypes),
          checkIsFoodWarehouse(domainTypes),
        );
        if (iconImageHref === imageAndSize.iconImageHref && iconImageSize === imageAndSize.iconImageSize) {
          return null;
        }
        objectManager.objects.setObjectOptions(_id, imageAndSize);
        return null;
      });
    }
  }, [mapLoaded, selectedCityWarehouses, warehouseMarkerAndSize]);

  const getSelectedRedBasket = orderId => redBasket.find(basket => basket.id === orderId);

  useEffect(() => {
    dispatch(Creators.initPage());
    dispatch(CommonCreators.getOperationalCountriesRequest());
    dispatch(CommonCreators.getActiveWarehousesRequest({ countryId: values.countryId }));
    dispatch(Creators.getRedBasket());
    dispatch(Creators.getCouriersRequest({
      city: values.cityId,
      country: values.countryId,
      fields: ['_id', 'name', 'courierType', 'domainTypes', 'gsm', 'location', 'warehouse', 'status', 'updatedAt',
        'statusLastChangedAt', 'marketOrder', 'artisanOrder', 'foodOrder', 'fleetVehicleType', 'assignmentType'],
    }));
    return () => {
      dispatch(Creators.destroyPage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(Creators.updateRedBasket({ redBasketData: redBasket }));
  }, [dispatch, redBasket, selectedMarkerId, selectedMarkerType]);

  useEffect(() => {
    if (values.cityId && canAccess(permKey.PAGE_ARTISAN_LIVE_MAP_ACTIVE_ORDERS_COMPONENT)) {
      dispatch(Creators.getArtisanActiveOrdersRequest({ cityId: values.cityId }));
    }
  }, [canAccess, dispatch, values.cityId]);

  useEffect(() => {
    setSelectedMarkerId(null);
    setSelectedMarkerType(null);
    form.setFieldsValue(values);
  }, [form, values, cities, countries]);

  useEffect(() => {
    if (values.countryId) {
      dispatch(CommonCreators.getCitiesRequest({ countryId: values.countryId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCityChangeFlag(true);
    setSelectedMarkerId(null);
    setSelectedMarkerType(null);
    setFieldValue('cityId', get(cities[0], '_id', ''));
    setCurrentCityId(get(cities[0], '_id', ''));
  }, [cities, setFieldValue]);

  useEffect(() => {
    setCityChangeFlag(true);
    setSelectedMarkerId(null);
    setSelectedMarkerType(null);
    if (canAccess(permKey.PAGE_ARTISAN_LIVE_MAP_ORDER_COUNTS_AND_REVENUE_COMPONENT)) {
      if (values && values.cityId && values.countryId) {
        dispatch(Creators.getOverallStatsRequest({
          selectedCity: values.cityId,
          selectedCountry: values.countryId,
        }));
      }
    }
    if (canAccess(permKey.PAGE_ARTISAN_LIVE_MAP_ALL_DOMAINS_COURIER_PLAN_AND_COUNTS_COMPONENT)) {
      dispatch(Creators.getCourierPlanAndCountsRequest());
    }
    if (canAccess(permKey.PAGE_FOOD_LIVE_MAP_ALL_DOMAINS_COURIER_PLAN_AND_COUNTS_COMPONENT)) {
      dispatch(Creators.getFoodCourierPlanAndCountsRequest());
    }
    else {
      dispatch(Creators.getArtisanCourierPlanAndCountsRequest());
    }

    if (values && values.cityId) {
      dispatch(Creators.getActiveOrderStatsRequest({ cityId: values.cityId }));
    }
  }, [canAccess, currentCityId, dispatch, values, values.cityId]);

  useEffect(() => {
    if (couriers) {
      const filteredWarehouses = new Set(filterWarehouses().map(x => x._id));
      const filteredCouriers = couriers.filter(({ warehouse }) => filteredWarehouses.has(warehouse));
      setSelectedCityCouriers(filteredCouriers);
    }
  }, [currentCityId, couriers, warehouses, filterWarehouses]);

  useEffect(() => {
    if (warehouses) {
      const filteredWarehouses = filterWarehouses();
      setSelectedCityWarehouses(filteredWarehouses);
      setWarehousesMap(createMap(filteredWarehouses));
    }
  }, [currentCityId, filterWarehouses, warehouses]);

  useEffect(() => {
    if (selectedCityCouriers && selectedCityWarehouses) {
      setCouriersMap(createMap(selectedCityCouriers));
      if (cityChangeFlag) {
        const targetCityCoordinates = get(selectedCityWarehouses, [0, 'location', 'coordinates'], [29, 41]);
        setMapCenter([targetCityCoordinates[1], targetCityCoordinates[0]]);
        setCityChangeFlag(false);
      }
      loadMarkers();
    }
  }, [selectedCityCouriers, selectedCityWarehouses, mapLoaded, cityChangeFlag, loadMarkers]);

  useEffect(() => {
    if (currentCityId && objectManagerRef.current) {
      const objectManager = objectManagerRef.current;
      objectManager.removeAll();
      mapRef.current.geoObjects.add(objectManager);
    }
  }, [currentCityId]);

  useEffect(() => {
    if (cities.length > 0 && !isEmpty(courierPlanAndCounts)) {
      const tempCitiesData = [];
      cities.forEach(city => {
        if (courierPlanAndCounts.data.hasOwnProperty(city.id)) {
          tempCitiesData.push(city);
        }
      });
      setFilteredCities(tempCitiesData);
    }
    else {
      setFilteredCities(cities);
    }
  }, [cities, courierPlanAndCounts]);

  useEffect(() => {
    setAnimatedWarehouseMarkers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useDebounce(warehouseSearchTerm, 1000)]);

  useEffect(() => {
    setAnimatedWarehouseMarkers();
    loadMarkers();
  }, [loadMarkers, selectedWarehouses, setAnimatedWarehouseMarkers]);

  return (
    <>
      <div className={classes.wrapperOuterContainer}>
        <Form form={form} {...layout}>
          <Row>
            <Col span={12}>
              <SelectWrapper
                selectKey="cityId"
                value={values.cityId}
                optionsData={filteredCities}
                optionLabelProp={`name.${getLangKey()}`}
                optionValueProp="_id"
                onChangeCallback={handleCityChange}
              />
            </Col>
          </Row>
        </Form>
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
            width="100%"
            height="100%"
            defaultState={{ ...defaultState }}
            state={{ ...defaultState }}
            onLoad={() => {
              setMapLoaded(true);
            }}
            modules={['objectManager.addon.objectsHint', 'templateLayoutFactory']}
            options={{ autoFitToViewport: 'always' }}
          >
            <ObjectManager
              instanceRef={ref => {
                objectManagerRef.current = ref;
              }}
              features={{ type: 'FeatureCollection', features }}
              defaultFeatures={{ type: 'FeatureCollection', features }}
            />
            <ZoomControl options={{ float: 'right' }} />
          </Map>
        </YMaps>
      </div>
      <Can permKey={permKey.PAGE_ARTISAN_LIVE_MAP_ORDER_COUNTS_AND_REVENUE_COMPONENT}>
        <OverallStats
          overallStats={overallStats}
          currentCityId={values.cityId}
          currentCountryId={values.countryId}
        >
          <ActiveOrders />
        </OverallStats>
      </Can>
      {canAccess(permKey.PAGE_ARTISAN_LIVE_MAP_ALL_DOMAINS_COURIER_PLAN_AND_COUNTS_COMPONENT) && (
        <div>
          <CourierPlanAndCountsTable
            warehouses={warehouses}
            selectedCityWarehouses={selectedCityWarehouses}
            courierPlanAndCounts={courierPlanAndCounts}
            foodCourierPlanAndCounts={foodCourierPlanAndCounts}
            currentCityId={values.cityId}
            currentCountryId={values.countryId}
            couriers={selectedCityCouriers}
            activeOrders={artisanActiveOrders}
            isDedicatedMarkersVisible={isDedicatedMarkersVisible}
            setIsDedicatedMarkersVisible={setIsDedicatedMarkersVisible}
            isPoolMarkersVisible={isPoolMarkersVisible}
            setIsPoolMarkersVisible={setIsPoolMarkersVisible}
            isReturnMarkersVisible={isReturnMarkersVisible}
            isGFOrderMarkersVisible={isGFOrderMarkersVisible}
            isGLOrderMarkersVisible={isGLOrderMarkersVisible}
            setIsReturnMarkersVisible={setIsReturnMarkersVisible}
            setIsGFOrderMarkersVisible={setIsGFOrderMarkersVisible}
            setIsGLOrderMarkersVisible={setIsGLOrderMarkersVisible}
            isGLWarehouseMarkersVisible={isGLWarehouseMarkersVisible}
            isGFWarehouseMarkersVisible={isGFWarehouseMarkersVisible}
            isGLAndGFWarehouseMarkersVisible={isGLAndGFWarehouseMarkersVisible}
            setIsGLWarehouseMarkersVisible={setIsGLWarehouseMarkersVisible}
            setIsGFWarehouseMarkersVisible={setIsGFWarehouseMarkersVisible}
            setIsGLAndGFWarehouseMarkersVisible={setIsGLAndGFWarehouseMarkersVisible}
            selectedMarkerId={selectedMarkerId}
            selectedMarkerType={selectedMarkerType}
            redBasketOrder={getSelectedRedBasket(selectedMarkerId)}
            warehousesMap={warehousesMap}
            couriersMap={couriersMap}
            onCloseInfoTable={closeMarkerInfoTable}
            selectedCourierVehicleTypes={selectedCourierVehicleTypes}
            setSelectedCourierVehicleTypes={handleSetSelectedCourierVehicleTypes}
            setSelectedAllWarehouses={handleSetSelectedAllWarehouses}
            isActiveAllWarehouses={isActiveAllWarehouses}
          />
        </div>
      )}
      {!canAccess(permKey.PAGE_ARTISAN_LIVE_MAP_ALL_DOMAINS_COURIER_PLAN_AND_COUNTS_COMPONENT) && (
      <div>
        <ArtisanCourierPlanAndCountsTable
          warehouses={warehouses}
          courierPlanAndCounts={courierPlanAndCounts}
          currentCityId={values.cityId}
          currentCountryId={values.countryId}
        />
      </div>
      )}
    </>
  );
};

const reduxKey = REDUX_KEY.ARTISAN.LIVE_MAP;
const withSaga = injectSaga({ key: reduxKey, saga });
const withReducer = injectReducer({ key: reduxKey, reducer });

export default compose(withReducer, withSaga)(ArtisanOrderLiveMap);
