import { useState, useEffect } from 'react';
import { YMaps, Map, Polygon, ZoomControl } from 'react-yandex-maps';
import { useSelector, useDispatch } from 'react-redux';

import { getLangKey } from '@shared/i18n';
import { ENVIRONMENT } from '@shared/config';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';

import useStyles from './styles';
import {
  getMapState,
  getPolygonsSelector,
  filtersSelector,
  couriersDataSelector,
  getTestWarehousesMap,
} from '../../redux/selectors';
import { Creators } from '../../redux/actions';
import WarehouseMarkers from '../WarehouseMarkers';
import CourierMarkers from '../CourierMarkers';
import FailedOrderMarkers from '../FailedOrderMarkers';
import { DEFAULT_MAP_COORDINATES } from '@shared/shared/constants';
import { isMobile } from '@shared/utils/common';
import useWindowSize from '@shared/shared/hooks/useWindowSize';
import AnalyticsService from '@shared/services/analytics';
import { LIVE_MAP_EVENTS } from '@app/pages/GetirMarket/LiveMap/mixPanelEvents';
import { warehouseStatuses, courierStatuses, domainTypes } from '@shared/shared/constantValues';

const getReverseCoord = coords => [coords[1], coords[0]];

const reverseCoordinates = coordinates => {
  const tempCoordinates = [];
  coordinates[0].forEach(coord => {
    tempCoordinates.push([coord[1], coord[0]]);
  });
  return [tempCoordinates];
};

export default function TheMap() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const polygons = useSelector(getPolygonsSelector.getData);
  const mapState = useSelector(getMapState);
  const warehousesData = useSelector(getFilteredWarehousesSelector.getData);
  const testWarehousesMap = useSelector(getTestWarehousesMap);
  const selectedCity = useSelector(filtersSelector.getCity);
  const selectedDomainType = useSelector(filtersSelector.getDomainType);
  const couriers = useSelector(couriersDataSelector.getData);

  const isDeviceMobile = isMobile();

  const { height: windowInnerHeight } = useWindowSize();
  const HEADER_HEIGHT = 30;
  const mapHeight = isDeviceMobile ? '100%' : windowInnerHeight - HEADER_HEIGHT;

  const [mapCoordinates, setMapCoordinates] = useState(getReverseCoord(DEFAULT_MAP_COORDINATES));

  const defaultState = { center: mapCoordinates, zoom: mapState.zoomLevel };

  const renderPolygons = () => {
    const returnArr = [];
    (polygons || []).forEach(polygonObject => {
      const { warehouse: polygonWarehouse } = polygonObject;
      if (!testWarehousesMap[polygonWarehouse]) {
        returnArr.push(<Polygon
          key={polygonObject.id}
          geometry={reverseCoordinates(polygonObject.geometry.coordinates)}
          options={{ fill: false, strokeColor: '#000', cursor: 'arrow' }}
        />);
      }
    });
    return returnArr;
  };

  const handlePlaceMarkClick = (event, type) => {
    const data = {
      ...event,
      type,
    };
    dispatch(Creators.setSelectedPlaceMark({ data }));

    const status = type === 'warehouse' ? warehouseStatuses[event.status]?.en : courierStatuses[event.status]?.en;
    const services = event.domainTypes.map(service => domainTypes[service]?.en);
    AnalyticsService.track(LIVE_MAP_EVENTS.MARKER.CLICK, { marker_type: type, status, service: services });
  };

  const handleFailedOrderClick = (event, type) => {
    dispatch(Creators.setSelectedPlaceMark({ data: { ...event, type } }));

    const services = [domainTypes[event.domainType]?.en];
    AnalyticsService.track(LIVE_MAP_EVENTS.MARKER.CLICK, { marker_type: type, services });
  };

  useEffect(() => {
    setMapCoordinates(getReverseCoord(mapState.coordinates));
  }, [mapState]);

  return (
    <YMaps
      query={{
        lang: getLangKey() === 'tr' ? 'tr_TR' : 'en_US',
        apikey: ENVIRONMENT.YANDEX_JS_KEY,
      }}
    >
      <div className={classes.theMapContainer}>
        <Map width="100%" height={mapHeight} state={defaultState} options={{ autoFitToViewport: 'always' }}>
          {renderPolygons()}
          <WarehouseMarkers
            warehousesData={warehousesData}
            selectedDomainType={selectedDomainType}
            selectedCity={selectedCity}
            getReverseCoord={getReverseCoord}
            handlePlaceMarkClick={handlePlaceMarkClick}
          />
          <CourierMarkers
            couriers={couriers}
            selectedDomainType={selectedDomainType}
            handlePlaceMarkClick={handlePlaceMarkClick}
            getReverseCoord={getReverseCoord}
          />
          <FailedOrderMarkers
            selectedDomainType={selectedDomainType}
            handleFailedOrderClick={handleFailedOrderClick}
          />
          {
            !isDeviceMobile && (
              <ZoomControl options={{ float: 'right' }} />
            )
          }
        </Map>
      </div>
    </YMaps>
  );
}
