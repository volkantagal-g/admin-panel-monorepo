import { useState, useCallback } from 'react';
import { Col, Drawer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { featureCollection, polygon as turfPolygon } from '@turf/turf';

import { Maps, WarehouseLayer, GeoJsonLayer } from '@shared/components/GIS/Maps';
import useStyles from './styles';
import { polygonsMapSelector } from '../../redux/selectors';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';
import { getFilteredWarehouses } from '../../utils';
import { Creators } from '../../redux/actions';
import MapZoomCenter from './MapZoomCenter';
import { DEFAULT_MAP_OPTIONS, COUNTRY_IDS } from '@shared/shared/constants';

function MapWrapper() {
  const dispatch = useDispatch();
  const polygons = useSelector(polygonsMapSelector.getData);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const mapOptions = useSelector(polygonsMapSelector.getMapOptions);
  const pageFilters = useSelector(polygonsMapSelector.getFilters);
  const selectedCountry = useSelector(getSelectedCountry);

  const classes = useStyles();

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [drawerContent, setDrawerContent] = useState('');

  const mapCenterCoordinates = [
    selectedCountry.center.coordinates[1],
    selectedCountry.center.coordinates[0],
  ];

  const handleCloseButtonClick = () => {
    setIsDrawerVisible(false);
  };

  const handlePolygonClick = polygonData => {
    const target = polygonData.target.feature;
    setIsDrawerVisible(true);
    setDrawerContent(target.properties);
  };

  const renderPolygons = useCallback(() => {
    const polygonsGeoJson = featureCollection(polygons.map(polygon => {
      const geom = polygon?.geometry?.coordinates;
      return turfPolygon(geom, polygon);
    }));
    return (
      <GeoJsonLayer
        onClick={handlePolygonClick}
        geoJson={polygonsGeoJson}
      />
    );
  }, [polygons]);

  const memoizedWarehouseMarkers = useCallback(
    () => {
      if (mapOptions.isShowWarehousesMarker && pageFilters.city) {
        const filteredWarehouses = getFilteredWarehouses({ warehouses, pageFilters });
        return (
          <WarehouseLayer
            warehouses={filteredWarehouses}
          />
        );
      }
      return undefined;
    },
    [mapOptions, pageFilters, warehouses],
  );

  const memorizedZoomLevel = useCallback(
    () => {
      if (mapOptions.zoom) {
        return (
          <MapZoomCenter />
        );
      }
      return undefined;
    },
    [mapOptions],
  );

  const handleSetMapCenter = mapObj => {
    dispatch(Creators.setMapCenter(mapObj));
  };

  const dynamicCountryMapCenter = () => {
    return (
      selectedCountry._id === COUNTRY_IDS.TR ?
        handleSetMapCenter({ center: DEFAULT_MAP_OPTIONS.CENTER }) :
        handleSetMapCenter({ center: mapCenterCoordinates })
    );
  };

  return (
    <>
      <Col xs={24} sm={24} md={18} lg={18}>
        <Maps
          classname={classes.mapWrapper}
          center={mapOptions.center}
          currentZoom={mapOptions.zoom}
          flyOnCenterChange={false}
          whenReady={() => dynamicCountryMapCenter()}
        >
          {renderPolygons()}
          {memoizedWarehouseMarkers()}
          {memorizedZoomLevel()}
        </Maps>
      </Col>
      <Drawer
        className={classes.drawerWrapper}
        placement="right"
        closable
        onClose={handleCloseButtonClick}
        visible={isDrawerVisible}
      >
        <pre>
          {JSON.stringify(drawerContent, undefined, 4)}
        </pre>
      </Drawer>
    </>
  );
}

export default MapWrapper;
