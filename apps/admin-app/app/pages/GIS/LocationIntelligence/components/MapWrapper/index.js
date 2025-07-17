import { useDispatch, useSelector } from 'react-redux';

import { useCallback, useMemo, useRef, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import { polygon as turfPolygon, point, booleanPointInPolygon } from '@turf/turf';
import { Popup } from 'react-map-gl';
import { Descriptions } from 'antd';
import { uniqueId } from 'lodash';

import { useTranslation } from 'react-i18next';

import { Maps, PolygonLayer, WarehouseLayer } from '@shared/containers/GIS/Maps';
import useStyles from './styles';
import AnalysisLegend from '../AnalysisLegend';
import { getPolygonsGeojson, getEvaluatedFeatureCollection, getFilteredWarehouses, getStyledGeojson } from '../../utils/helper';
import { getWarehousesSelector } from '@shared/redux/selectors/common';
import { locationIntelligenceSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const MapWrapper = () => {
  const polygons = useSelector(locationIntelligenceSelector.getPolygons);
  const warehouses = useSelector(getWarehousesSelector.getData);
  const polygonFilters = useSelector(locationIntelligenceSelector.getPolygonFilters);
  const mapOptions = useSelector(locationIntelligenceSelector.getMapOptions);
  const data = useSelector(locationIntelligenceSelector.getStatsData);
  const areAvailableStatsPending = useSelector(locationIntelligenceSelector.isPendingAvailableStats);
  const arePolygonsPending = useSelector(locationIntelligenceSelector.isPendingPolygons);
  const areStatsPending = useSelector(locationIntelligenceSelector.isPendingStats);
  const selectedStyle = useSelector(locationIntelligenceSelector.getSelectedStyle);
  const customStyleProps = useSelector(locationIntelligenceSelector.getCustomStyleProps);
  const mapRef = useRef();
  const dispatch = useDispatch();

  const [popupInfo, setPopupInfo] = useState(null);

  const classes = useStyles();
  const { t } = useTranslation('gisLocationIntelligencePage');

  const memoizedStandartStyledPolygons = useCallback(() => {
    if (data?.features && selectedStyle?.style) {
      const evaluatedData = getEvaluatedFeatureCollection(data);
      const { style } = selectedStyle;
      return (
        <>
          <PolygonLayer
            geojson={evaluatedData}
            isFilled
            isStroked
            fillStyle={style}
          />
          <AnalysisLegend style={style} />
        </>
      );
    }
    return undefined;
  }, [data, selectedStyle]);

  const memoizedCustomStyledPolygons = useCallback(() => {
    if (data?.features && selectedStyle?.style && mapOptions.isShowCustomStyledPolygons) {
      const { colorRange, classificationType, statType } = customStyleProps;
      const evaluatedData = getEvaluatedFeatureCollection(data);
      const renderingData = getStyledGeojson({
        data: evaluatedData,
        colorRange,
        classificationType,
        statType,
      });
      const { style } = selectedStyle;
      return (
        <PolygonLayer
          geojson={renderingData}
          isFilled
          isStroked
          fillStyle={style}
        />
      );
    }
    return undefined;
  }, [customStyleProps, data, mapOptions.isShowCustomStyledPolygons, selectedStyle]);

  const renderPolygons = useMemo(() => {
    if (!mapOptions.isShowCustomStyledPolygons) {
      return (memoizedStandartStyledPolygons());
    }
    return (memoizedCustomStyledPolygons());
  }, [mapOptions.isShowCustomStyledPolygons, memoizedCustomStyledPolygons, memoizedStandartStyledPolygons]);

  const memoizedWarehouseMarkers = useCallback(
    () => {
      if (mapOptions.isShowWarehousesMarker && polygonFilters.city) {
        const filteredWarehouses = getFilteredWarehouses({ warehouses, polygonFilters });
        return (
          <WarehouseLayer
            warehouses={filteredWarehouses}
          />
        );
      }
      return undefined;
    },
    [mapOptions, polygonFilters, warehouses],
  );

  const handleOnClick = useCallback(e => {
    const { lngLat } = e;
    const turfPoint = point([lngLat.lng, lngLat.lat]);
    if (data?.features) {
      const selectedFeature = data.features.find(feature => {
        const polygonCoords = feature.geometry.coordinates[0];
        const polygon = turfPolygon(polygonCoords);
        return booleanPointInPolygon(turfPoint, polygon);
      });
      if (selectedFeature) {
        setPopupInfo({
          longitude: lngLat.lng,
          latitude: lngLat.lat,
          content: selectedFeature.properties,
        });
      }
    }
  }, [data]);

  const renderPopups = useCallback(() => {
    if (popupInfo) {
      const { content } = popupInfo;
      const { id, totalStats } = content;
      return (
        <Popup
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          onClose={() => setPopupInfo(null)}
          maxWidth="400px"
        >
          <Descriptions column={1} size="small" bordered>
            <Descriptions.Item label={t('POLYGON_ID')}>{id}</Descriptions.Item>
            {totalStats.map(prop => (
              <Descriptions.Item
                key={uniqueId()}
                label={t(`STAT_TYPES.${prop.type}`)}
              >
                {prop.type === 'missedOrderRatio' ? `${prop.value} %` : prop.value}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </Popup>
      );
    }

    return undefined;
  }, [popupInfo, t]);

  const renderLivePolygons = useMemo(() => {
    if (polygons) {
      const polygonsGeoJson = getPolygonsGeojson(polygons);
      return (
        <PolygonLayer
          geojson={polygonsGeoJson}
          isStroked
        />
      );
    }
    return undefined;
  }, [polygons]);

  const handleMapEvent = useCallback(event => {
    const { latitude, longitude, zoom } = event.viewState;
    const currentCenter = [latitude, longitude];
    const currentZoom = (zoom);
    dispatch(Creators.setMapCenter({ center: currentCenter }));
    dispatch(Creators.setMapZoom({ zoom: currentZoom }));
  }, [dispatch]);

  return (
    <Maps
      id="map"
      ref={mapRef}
      latitude={mapOptions.center[0]}
      longitude={mapOptions.center[1]}
      zoom={mapOptions.zoom}
      onMapEvents={handleMapEvent}
      onClick={handleOnClick}
    >
      {memoizedWarehouseMarkers()}
      {renderPolygons}
      {renderLivePolygons}
      {renderPopups()}
      { (areAvailableStatsPending || arePolygonsPending || areStatsPending) ? (
        <LoadingOutlined
          className={classes.loadingIcon}
          spin
        />
      ) : undefined}
    </Maps>
  );
};

export default MapWrapper;
