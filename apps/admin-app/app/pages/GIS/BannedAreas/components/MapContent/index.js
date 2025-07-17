import { Col, Descriptions, Tag, Badge, Button } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import { FeatureGroup, Popup, GeoJSON } from 'react-leaflet';
import { filter, uniqueId, get } from 'lodash';
import { featureCollection, polygon as turfPolygon, point, booleanPointInPolygon } from '@turf/turf';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import confirm from 'antd/lib/modal/confirm';

import { t, getLangKey } from '@shared/i18n';
import { domainTypes, marketVehicleTypes } from '@shared/shared/constantValues';

import { DrawingTool, GeoJsonLayer, WarehouseLayer, Maps } from '@shared/components/GIS/Maps';
import { bannedAreaPageSelector } from '@app/pages/GIS/BannedAreas/redux/selectors';
import { overlayOptions, subregionDomains, tooltipDirection, tooltipOffset, SCHEDULED_BAN_STYLE } from '@app/pages/GIS/BannedAreas/utils/constants';
import { getPolygonsGeojson, getFilteredWarehouses, transformTimeStringToTimeZone } from '@app/pages/GIS/BannedAreas/utils/helper';
import { Creators } from '@app/pages/GIS/BannedAreas/redux/actions';
import MapZoomCenter from './MapZoomCenter';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { getWarehousesSelector } from '@shared/redux/selectors/common';

import { DEFAULT_MAP_OPTIONS, COUNTRY_IDS } from '@shared/shared/constants';
import { formatDate } from '@shared/utils/dateHelper';

import useStyles from './styles';

function MapContent() {
  const dispatch = useDispatch();
  const mapOptions = useSelector(bannedAreaPageSelector.getMapOptions);
  const bannedAreas = useSelector(bannedAreaPageSelector.getBannedAreas);
  const scheduledBannedAreas = useSelector(bannedAreaPageSelector.getScheduledBannedAreas);
  const isScheduledBanFormShow = useSelector(bannedAreaPageSelector.getIsScheduledBanFormShow);

  const geometry = useSelector(bannedAreaPageSelector.getGeometry);
  const formValues = useSelector(bannedAreaPageSelector.getFormValues);
  const scheduledBanFormValues = useSelector(bannedAreaPageSelector.getscheduledBanFormValues);
  const drawFeatureCollection = useSelector(bannedAreaPageSelector.getFeatureCollection);
  const tempPolygon = useSelector(bannedAreaPageSelector.getTempGeoJson);
  const selectedCountry = useSelector(getSelectedCountryV2);
  const selectedTimeZone = get(selectedCountry, 'timezones.0.timezone');
  const g10Polygons = useSelector(bannedAreaPageSelector.getG10Polygons);
  const gbPolygons = useSelector(bannedAreaPageSelector.getGbPolygons);
  const gsPolygons = useSelector(bannedAreaPageSelector.getGsPolygons);
  const classes = useStyles();
  const warehouses = useSelector(getWarehousesSelector.getData);

  const mapCenterCoordinates = [
    selectedCountry.center.coordinates[1],
    selectedCountry.center.coordinates[0],
  ];

  const [coordinates, setCoordinates] = useState([0, 0]);

  const handlePolygonClick = target => {
    const { lat, lng } = target.latlng;
    setCoordinates([lng, lat]);
  };

  const setDrawFeatureCollection = useCallback(collection => {
    dispatch(Creators.setFeatureCollection({ featureCollection: collection }));
  }, [dispatch]);

  const handleDeactiveBan = useCallback(key => {
    if (isScheduledBanFormShow) {
      return dispatch(Creators.deactivateScheduledBannedAreaRequest({ scheduledBannedAreaId: key }));
    }
    return dispatch(Creators.deactivateBannedAreaRequest({ id: key.id, polygonType: key.polygonType }));
  }, [dispatch, isScheduledBanFormShow]);

  const showConfirm = useCallback(item => {
    confirm({
      title: t('gisBannedAreasPage:CONFIRM_DELETE_BAN'),
      icon: <ExclamationCircleOutlined />,
      content: item.name,
      onOk() {
        handleDeactiveBan(item);
      },
    });
  }, [handleDeactiveBan]);

  const renderBannedAreaPolygons = useCallback(() => {
    const position = point(coordinates);
    const intersectingFeatures = [];

    if (formValues.polygonType) {
      const filteredPolygons = filter(bannedAreas, { type: formValues.polygonType });
      const polygonsGeoJson = featureCollection(filteredPolygons.map(polygon => {
        const geom = polygon.geometry.coordinates;
        return turfPolygon(geom, polygon);
      }));

      polygonsGeoJson.features.map(feature => {
        if (booleanPointInPolygon(position, feature)) {
          intersectingFeatures.push(feature);
        }
        return undefined;
      });
      const popupContent = (
        intersectingFeatures.map(target => {
          return (
            <Descriptions key={target.properties.id} title={t('gisBannedAreasPage:BANNED_AREAS')} column={1} size="small" bordered>
              <Descriptions.Item label={t('global:NAME')}>
                {target.properties.name}
              </Descriptions.Item>
              <Descriptions.Item label="ID">{target.properties.id}</Descriptions.Item>
              <Descriptions.Item label={t('global:CITY')}>{target.properties?.location?.city?.id || 'N/A' } </Descriptions.Item>
              <Descriptions.Item label={t('global:COUNTRY')}>{target.properties?.location?.country?.id || 'N/A' } </Descriptions.Item>
              <Descriptions.Item label={t('global:DOMAIN_TYPES')}>
                {target.properties?.domainTypes.map(domainType => (
                  <Tag key={domainType}>{get(domainTypes, [domainType, getLangKey()])}</Tag>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label={t('gisBannedAreasPage:POLYGON_TYPE')}>{
                t(`gisBannedAreasPage:GETIR_MARKET_BAN_POLYGON_TYPES:${target.properties.type}`)
              }
              </Descriptions.Item>
              {target.properties?.metadata?.vehicleTypes?.length > 0 && (
              <Descriptions.Item label={t('gisBannedAreasPage:VEHICLE_TYPE')}>
                {target.properties?.metadata?.vehicleTypes?.map(vehicleType => (
                  <Tag key={vehicleType}>{get(marketVehicleTypes, [vehicleType, getLangKey()])}</Tag>
                ))}
              </Descriptions.Item>
              )}
              { target.properties?.metadata?.courierIds && (
              <Descriptions.Item label={t('gisBannedAreasPage:COURIER_ID')}>
                {target.properties?.metadata?.courierIds?.map(courierId => (
                  <Tag key={courierId}>{courierId}</Tag>
                ))}
              </Descriptions.Item>
              )}
              <Descriptions.Item label={t('gisBannedAreasPage:CREATE_DATE')}>{formatDate(target.properties.createdAt)}</Descriptions.Item>
              <Descriptions.Item label={t('gisBannedAreasPage:UPDATE_DATE')}>{formatDate(target.properties.updatedAt)}</Descriptions.Item>
              <Descriptions.Item label={t('button:DELETE')}>
                <Button
                  type="primary"
                  className={classes.deleteButton}
                  danger
                  block
                  icon={<DeleteOutlined />}
                  onClick={() => showConfirm({ id: target.properties.id, polygonType: target.properties.type })}
                />
              </Descriptions.Item>
            </Descriptions>
          );
        })
      );

      return (
        <FeatureGroup>
          <Popup className={classes.popupWrapper}>
            <>
              <Badge
                className={classes.badgeWrapper}
                count={intersectingFeatures.length}
                color={intersectingFeatures.length === 1 ? '#1F7E34' : '#DC3644'}
                offset={[10, 10]}
              >{t('gisBannedAreasPage:COUNT_OF_FEATURES')}
              </Badge>
              {popupContent}
            </>
          </Popup>
          <GeoJsonLayer
            geoJson={polygonsGeoJson}
            onClick={handlePolygonClick}
          />
        </FeatureGroup>
      );
    }

    return undefined;
  }, [bannedAreas,
    classes.badgeWrapper,
    classes.deleteButton,
    classes.popupWrapper,
    coordinates,
    formValues.polygonType,
    showConfirm]);

  const renderScheduledBans = useCallback(() => {
    const position = point(coordinates);
    const intersectingFeatures = [];
    if (scheduledBanFormValues.polygonType && isScheduledBanFormShow) {
      const filteredPolygons = filter(
        scheduledBannedAreas.features,
        { properties: { polygonType: scheduledBanFormValues.polygonType } },
      );

      filteredPolygons?.map(feature => {
        if (booleanPointInPolygon(position, feature)) {
          intersectingFeatures.push(feature);
        }
        return undefined;
      });
      return (
        <FeatureGroup>
          <Popup className={classes.popupWrapper}>
            {intersectingFeatures.map(target => {
              const startTime = transformTimeStringToTimeZone(target.properties?.startTime, selectedTimeZone);
              const endTime = transformTimeStringToTimeZone(target.properties?.endTime, selectedTimeZone);
              const { startDate, endDate, activeDays } = target.properties;
              return (
                <Descriptions key={target.properties.id} title={t('gisBannedAreasPage:BANNED_AREAS')} column={1} size="small" bordered>
                  <Descriptions.Item label={t('global:NAME')}>
                    {target.properties.name}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('gisBannedAreasPage:DATE_RANGE')}>
                    {`${startDate} - ${endDate}`}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('gisBannedAreasPage:ACTIVE_DAYS')}>
                    {activeDays.map(day => (
                      <Tag key={day}>{t(`gisBannedAreasPage:WEEK_DAYS.${day}`)}</Tag>
                    ))}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('gisBannedAreasPage:ACTIVE_TIMES')}>
                    {`${startTime} - ${endTime} (${selectedTimeZone})`}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('global:DOMAIN_TYPES')}>
                    {target.properties?.domainTypes.map(domainType => (
                      <Tag key={domainType}>{get(domainTypes, [domainType, getLangKey()])}</Tag>
                    ))}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('gisBannedAreasPage:POLYGON_TYPE')}>{
                    t(`gisBannedAreasPage:GETIR_MARKET_BAN_POLYGON_TYPES:${target.properties.polygonType}`)
                  }
                  </Descriptions.Item>
                  <Descriptions.Item label={t('gisBannedAreasPage:VEHICLE_TYPE')}>
                    {target.properties?.vehicleTypes?.map(vehicleType => (
                      <Tag key={vehicleType}>{get(marketVehicleTypes, [vehicleType, getLangKey()])}</Tag>
                    ))}
                  </Descriptions.Item>
                  <Descriptions.Item label={t('button:DELETE')}>
                    <Button
                      type="primary"
                      className={classes.deleteButton}
                      danger
                      block
                      icon={<DeleteOutlined />}
                      onClick={() => showConfirm(target.properties.id)}
                    />
                  </Descriptions.Item>
                </Descriptions>
              );
            })}
          </Popup>
          <GeoJsonLayer
            geoJson={filteredPolygons}
            style={SCHEDULED_BAN_STYLE}
            onClick={handlePolygonClick}
          />
        </FeatureGroup>
      );
    }
    return undefined;
  }, [classes.deleteButton,
    classes.popupWrapper,
    coordinates,
    isScheduledBanFormShow,
    scheduledBanFormValues.polygonType,
    scheduledBannedAreas.features,
    selectedTimeZone,
    showConfirm]);

  const handleOnCreated = e => {
    if (!e.error) {
      const layer = e.layer.toGeoJSON();
      dispatch(Creators.setGeometry({ geometry: layer.geometry }));
    }
    return undefined;
  };
  const handleOnDrawStart = e => {
    if (geometry) {
      drawFeatureCollection.clearLayers();
      dispatch(Creators.setGeometry({ geometry: null }));
    }
    return e;
  };

  const handleOnEdited = e => {
    if (geometry) {
      const layers = e.layers.toGeoJSON();
      const layer = layers.features[0];
      if (layer?.geometry) {
        dispatch(Creators.setGeometry({ geometry: layer.geometry }));
      }
    }
    return e;
  };

  const renderG10Areas = () => {
    if (mapOptions.isShowG10Areas) {
      const g10PolygonGeoJson = getPolygonsGeojson(g10Polygons);
      const g10Warehouses = getFilteredWarehouses({
        warehouses,
        domainType: subregionDomains.g10,
        city: formValues.cityId || scheduledBanFormValues.cityId,
      });
      return (
        <>
          <GeoJsonLayer
            geoJson={g10PolygonGeoJson}
            style={overlayOptions.g10}
          />
          <WarehouseLayer
            warehouses={g10Warehouses}
            isShowingLabel
            tooltipOffset={tooltipOffset}
            tooltipDirection={tooltipDirection}
          />
        </>
      );
    }
    return undefined;
  };

  const renderGBAreas = () => {
    if (mapOptions.isShowGBAreas) {
      const gbPolygonGeoJson = getPolygonsGeojson(gbPolygons);
      const gbWarehouses = getFilteredWarehouses({
        warehouses,
        domainType: subregionDomains.gb,
        city: formValues.cityId || scheduledBanFormValues.cityId,
      });
      return (
        <>
          <GeoJsonLayer
            geoJson={gbPolygonGeoJson}
            style={overlayOptions.gb}
          />
          <WarehouseLayer
            warehouses={gbWarehouses}
            isShowingLabel
            tooltipOffset={tooltipOffset}
            tooltipDirection={tooltipDirection}
          />
        </>
      );
    }
    return undefined;
  };
  const renderGSAreas = () => {
    if (mapOptions.isShowGSAreas) {
      const gsPolygonGeoJson = getPolygonsGeojson(gsPolygons);
      const gsWarehouses = getFilteredWarehouses({
        warehouses,
        domainType: subregionDomains.gs,
        city: formValues.cityId || scheduledBanFormValues.cityId,
      });
      return (
        <>
          <GeoJsonLayer
            geoJson={gsPolygonGeoJson}
            style={overlayOptions.gs}
          />
          <WarehouseLayer
            warehouses={gsWarehouses}
            isShowingLabel
            tooltipOffset={tooltipOffset}
            tooltipDirection={tooltipDirection}
          />
        </>
      );
    }
    return undefined;
  };

  const memorizedZoomCenterLevel = useCallback(
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

  const handleTempPolygon = useCallback(() => {
    if (tempPolygon !== null) {
      return (
        <GeoJSON
          key={uniqueId()}
          data={tempPolygon}
          interactive
        />
      );
    }
    return undefined;
  }, [tempPolygon]);

  return (
    <Col xs={24} sm={24} md={24} lg={18}>
      <Maps
        center={mapOptions.center}
        currentZoom={mapOptions.zoom}
        flyOnCenterChange={false}
        whenReady={() => dynamicCountryMapCenter()}
      >
        <DrawingTool
          setDrawFeatureCollection={setDrawFeatureCollection}
          editable
          drawPolygon
          drawRectangle
          onCreated={handleOnCreated}
          onDrawStart={handleOnDrawStart}
          onEdited={handleOnEdited}
        />
        {handleTempPolygon()}
        {renderG10Areas()}
        {renderGBAreas()}
        {renderGSAreas()}
        { isScheduledBanFormShow ? renderScheduledBans() : renderBannedAreaPolygons()}
        {memorizedZoomCenterLevel()}
      </Maps>
    </Col>
  );
}

export default MapContent;
