import { CheckOutlined } from '@ant-design/icons';

import { Button, Card, Col, Modal, Space, Typography, Input } from 'antd';
import { get, isEmpty, isObject } from 'lodash';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import useClipboard from '@shared/shared/hooks/useClipboard';
import { getCitiesSelector, getWarehousesSelector } from '@shared/redux/selectors/common';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';
import { Creators } from '../../redux/actions';
import { polygonsMapSelector } from '../../redux/selectors';
import FilterForm from '../FilterForm';
import useStyles from './styles';
import { checkWarehouseUniqueness, validateWarehouse } from './utils';
import { banPolygonTypesForMaps } from '../../utils';
import { DELIVERY_SLOTS_GETIR_MARKET_POLYGON_TYPE, GORILLAS_ONLY_POLYGON_TYPE } from '@shared/shared/constants';

const { Text } = Typography;

const { TextArea } = Input;

function Filter() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { Can } = usePermission();

  const polygons = useSelector(polygonsMapSelector.getData);
  const cities = useSelector(getCitiesSelector.getData);
  const warehouseMap = useSelector(getWarehousesSelector.getWarehousesMap);
  const warehousesPending = useSelector(getWarehousesSelector.getIsPending);
  const gorillasWhMap = useSelector(polygonsMapSelector.getGorillasWarehouses);
  const pageFilters = useSelector(polygonsMapSelector.getFilters);
  const deliveryFeeConfig = useSelector(polygonsMapSelector.getDeliveryFeeConfig);

  const allOptionForCities = {
    _id: '',
    name: { tr: 'Bütün şehirleri seç', en: 'Select All Cities' },
  };
  const [geoJSON, setGeoJSON] = useState('');
  const [isDefaultConfigApplied, setIsDefaultConfigApplied] = useState(false);

  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState();
  const [isCopied, setCopied] = useClipboard(geoJSON, { successDuration: 2000 });

  const handleGetPolygons = () => {
    dispatch(Creators.getPolygonsRequest());
  };

  const classes = useStyles();

  const handleGeoJSONGetButtonClick = () => {
    const tempGeoJSON = {};
    tempGeoJSON.type = 'FeatureCollection';
    tempGeoJSON.features = [];

    if (polygons.length) {
      polygons.forEach(p => {
        const feature = {
          type: 'Feature',
          properties: banPolygonTypesForMaps.includes(p.polygonType) ?
            {
              region: p.region,
              domainTypes: p.domainTypes,
              polygonType: p.polygonType,
              updatedAt: p.updatedAt,
            } :
            {
              centerLon: p.location?.centerGeometry?.coordinates === null ? undefined : p.location?.centerGeometry?.coordinates[0],
              centerLat: p.location?.centerGeometry?.coordinates === null ? undefined : p.location?.centerGeometry?.coordinates[1],
              region: p.location?.region?.id,
            },
          geometry: p.geometry,
        };
        if (p.id) {
          feature.properties._id = p.id;
        }
        if (p?.metadata?.warehouse) {
          feature.properties.warehouse = p.metadata?.warehouse?.id;
        }
        if (p?.metadata?.gorillasWarehouseId) {
          feature.properties.gorillasWarehouseId = p.metadata.gorillasWarehouseId;
        }
        if (p?.metadata?.everyDayDeliveryHours) {
          if (pageFilters.polygonType === DELIVERY_SLOTS_GETIR_MARKET_POLYGON_TYPE) {
            if (isDefaultConfigApplied) {
              feature.properties.everyDayDeliveryHours = JSON.stringify(deliveryFeeConfig.value);
            }
            else {
              feature.properties.everyDayDeliveryHours = JSON.stringify(p.metadata.everyDayDeliveryHours);
            }
          }
        }
        feature.properties.isActive = true;
        tempGeoJSON.features.push(feature);
      });
    }
    setGeoJSON(JSON.stringify(tempGeoJSON, undefined, 2));
  };

  const handleGeoJSONAddButtonClick = () => {
    if (!geoJSON.length) {
      return;
    }
    setIsFormDisabled(true);
  };

  const handleGeoJSONCancelButtonClick = () => {
    // reset the geoJson text on cancel
    handleGeoJSONGetButtonClick();
    setIsFormDisabled(false);
  };

  const handleGeoJSONChange = event => {
    const tempValue = event.target.value;
    setGeoJSON(tempValue);
  };

  const handleGeoJSONBlur = event => {
    const tempValue = event.target.value;
    if (!isObject(tempValue)) {
      // @TODO could be a notification
      return;
    }
    setGeoJSON(tempValue);
  };

  const handleGeoJSONSaveButtonClick = () => {
    if (!geoJSON.length) {
      return;
    }

    setIsModalVisible(true);
  };

  const updateRequest = () => {
    const requestBody = {
      geoJSON: { features: [] },
      domainTypes: [pageFilters.domainType],
      subregionIntervalType: pageFilters.subregionIntervalType,
      city: pageFilters.city,
    };

    const tempGeoJSON = JSON.parse(geoJSON);
    const prevWarehouse = {};
    try {
      tempGeoJSON.features.forEach((polygon, index) => {
        const tempPoly = JSON.parse(JSON.stringify(polygon));
        delete tempPoly.properties.polygonType;
        const everyDayDeliveryHoursString = get(tempPoly, 'properties.everyDayDeliveryHours');
        let everyDayDeliveryHoursArray;
        if (pageFilters.polygonType === DELIVERY_SLOTS_GETIR_MARKET_POLYGON_TYPE) {
          everyDayDeliveryHoursArray = JSON.parse(everyDayDeliveryHoursString || '[]');
        }
        const polygonProperties = {
          _id: get(tempPoly, 'properties._id'),
          warehouse: get(tempPoly, 'properties.warehouse'),
          gorillasWarehouseId: get(tempPoly, 'properties.gorillasWarehouseId'),
          everyDayDeliveryHours: everyDayDeliveryHoursArray,
          region: get(tempPoly, 'properties.region'),
          regionName: get(tempPoly, 'properties.regionName'),
          centerLon: get(tempPoly, 'properties.centerLon'),
          centerLat: get(tempPoly, 'properties.centerLat'),
          isActive: get(tempPoly, 'properties.isActive', true),
        };
        // validations start
        if (pageFilters.polygonType === GORILLAS_ONLY_POLYGON_TYPE) {
          validateWarehouse(pageFilters.polygonType, polygonProperties.gorillasWarehouseId, gorillasWhMap, index);
        }
        else if (pageFilters.polygonType === DELIVERY_SLOTS_GETIR_MARKET_POLYGON_TYPE) {
          validateWarehouse(pageFilters.polygonType, polygonProperties.warehouse, warehouseMap, index);
        }
        else {
          validateWarehouse(pageFilters.polygonType, polygonProperties.warehouse, warehouseMap, index);
          checkWarehouseUniqueness(prevWarehouse, polygonProperties.warehouse, index);
        }
        // validations end

        // keep index values so we can show when it has error
        prevWarehouse[polygonProperties.warehouse] = { index };
        requestBody.geoJSON.features.push({
          geometry: tempPoly.geometry.coordinates,
          properties: polygonProperties,
        });
      });
    }
    catch (error) {
      // instead of toast, use modal so people can copy warehouse ids
      Modal.error({
        title: t('global:ERROR_TITLE'),
        content: error,
      });
      return { error: true };
    }

    dispatch(
      Creators.updatePolygonsRequest({
        polygonType: pageFilters.polygonType,
        updateData: requestBody,
      }),
    );
    return { error: false };
  };

  const handleOkButton = () => {
    const result = updateRequest();
    if (!result?.error) {
      setIsFormDisabled(false);
    }
    setIsModalVisible(false);
  };

  const handleCancelButton = () => {
    // reset the geoJson text on cancel
    handleGeoJSONGetButtonClick();
    setIsFormDisabled(false);
    setIsModalVisible(false);
  };

  const handleSetMapCenter = mapObj => {
    dispatch(Creators.setMapCenter(mapObj));
  };

  const handleMapZoomChange = mapObj => {
    dispatch(Creators.setMapZoom(mapObj));
  };

  const handleMapOptionsChange = ({ isShowWarehousesMarker }) => {
    dispatch(Creators.setMapOptions({ isShowWarehousesMarker }));
  };

  const handleFiltersChange = (filters = {}) => {
    dispatch(Creators.setFilters({ filters }));
  };

  const handleSwitchToggle = () => {
    if (isEmpty(deliveryFeeConfig)) {
      return;
    }
    setIsDefaultConfigApplied(!isDefaultConfigApplied);
  };

  return (
    <>
      <Col xs={24} sm={24} md={6} lg={6}>
        <Card className={classes.cardWrapper}>
          <Space direction="vertical" className={classes.filterWrapper}>
            <FilterForm
              cities={[allOptionForCities, ...cities]}
              getPolygons={handleGetPolygons}
              formStatus={!isFormDisabled}
              setMapCenter={handleSetMapCenter}
              handleSelectedCity={setSelectedCity}
              handleMapOptionsChange={handleMapOptionsChange}
              handleFiltersChange={handleFiltersChange}
              handleMapZoom={handleMapZoomChange}
              onConfigToggle={handleSwitchToggle}
              isConfigApplied={isDefaultConfigApplied}
            />
          </Space>
        </Card>
        <Can permKey={permKey.PAGE_POLYGON_MAP_UPDATE_GEOJSON}>
          <Card className={classes.cardWrapper}>
            <Space direction="vertical" className={classes.filterWrapper}>
              <Text>{t('polygonPage:GEO_JSON')}</Text>
              {!isFormDisabled
                ? [
                  <Button block type="primary" key="geoJSONGet" onClick={handleGeoJSONGetButtonClick}>
                    {t('button:GET')}
                  </Button>,
                  <Button block type="primary" key="geoJSONCopy" icon={isCopied ? <CheckOutlined /> : null} onClick={setCopied}>
                    {isCopied ? t('button:COPIED') : t('button:COPY')}
                  </Button>,
                  <Button
                    block
                    type="primary"
                    key="geoJSONAdd"
                    onClick={handleGeoJSONAddButtonClick}
                    disabled={!selectedCity || banPolygonTypesForMaps.includes(pageFilters.polygonType)}
                  >
                    {t('button:ADD')}
                  </Button>,
                ]
                : [
                  <Button block type="primary" key="geoJSONSave" onClick={handleGeoJSONSaveButtonClick}>
                    {t('button:SAVE')}
                  </Button>,
                  <Button block type="primary" key="geoJSONCancel" onClick={handleGeoJSONCancelButtonClick}>
                    {t('button:CANCEL')}
                  </Button>,
                ]}
              <TextArea
                value={geoJSON}
                className={classes.jsonView}
                disabled={!isFormDisabled || warehousesPending}
                onChange={handleGeoJSONChange}
                onBlur={handleGeoJSONBlur}
                autoSize={{ minRows: 18, maxRows: 18 }}
              />
            </Space>
          </Card>
        </Can>
      </Col>
      <Modal title={t('polygonPage:CONFIRM_MODAL_TITLE')} visible={isModalVisible} onOk={handleOkButton} onCancel={handleCancelButton} />
    </>
  );
}

export default Filter;
