import { useState } from 'react';
import { Col, Button, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getCitiesSelector } from '@shared/redux/selectors/common';

import useStyles from './styles';
import FilterForm from '../FilterForm';
import { Creators } from '../../redux/actions';

const Filter = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const cities = useSelector(getCitiesSelector.getData);

  const [selectedCity, setSelectedCity] = useState();
  const classes = useStyles();

  const handleGetAppOpenLocations = () => {
    dispatch(Creators.setHeatMapData());
    dispatch(Creators.setIsPendingHeatMap());
    dispatch(Creators.getPolygonsRequest());
    dispatch(Creators.getAppOpenLocationsRequest());
  };

  const handleMissedOrderLocations = () => {
    dispatch(Creators.setHeatMapData());
    dispatch(Creators.setIsPendingHeatMap());
    dispatch(Creators.getPolygonsRequest());
    dispatch(Creators.getMissedOrderLocationsRequest());
  };

  const handleSuccessOrderLocations = () => {
    dispatch(Creators.setHeatMapData());
    dispatch(Creators.setIsPendingHeatMap());
    dispatch(Creators.getPolygonsRequest());
    dispatch(Creators.getSuccessOrderLocationsRequest());
  };

  const handleDownloadsLocations = () => {
    dispatch(Creators.setHeatMapData());
    dispatch(Creators.setIsPendingHeatMap());
    dispatch(Creators.getPolygonsRequest());
    dispatch(Creators.getDownloadLocationsRequest());
  };

  const handleMapCenter = center => {
    dispatch(Creators.setMapCenter(center));
  };

  const handlePolygonFiltersChange = (filters = {}) => {
    dispatch(Creators.setPolygonFilters({ filters }));
  };

  const handleHeatmapFiltersChange = (filters = {}) => {
    dispatch(Creators.setHeatMapFilters({ filters }));
  };

  const handleMapOptionsChange = ({ isShowWarehousesMarker }) => {
    dispatch(Creators.setMapOptions({ isShowWarehousesMarker }));
  };

  return (
    <Col xs={24} sm={24} md={6} lg={4}>
      <Card className={classes.cardWrapper}>
        <Col span={22} offset={1}>
          <FilterForm
            cities={[...cities]}
            mapCenter={handleMapCenter}
            mapOption={handleMapOptionsChange}
            handleSelectedCity={setSelectedCity}
            handleHeatmapFiltersChange={handleHeatmapFiltersChange}
            handlePolygonFiltersChange={handlePolygonFiltersChange}
          />
        </Col>
      </Card>
      <Card className={classes.cardWrapper}>
        <Col span={22} offset={1}>
          <Button
            block
            className={classes.buttonWrapper}
            type="primary"
            key="getAppOpen"
            onClick={handleGetAppOpenLocations}
            disabled={!selectedCity}
          >
            {t('gisHeatMapPage:APP_OPEN_LOCATIONS')}
          </Button>
          <Button
            block
            className={classes.buttonWrapper}
            type="primary"
            key="getSuccessOrder"
            onClick={handleSuccessOrderLocations}
            disabled={!selectedCity}
          >
            {t('gisHeatMapPage:SUCCESS_ORDERS_LOCATIONS')}
          </Button>
          <Button
            block
            className={classes.buttonWrapper}
            type="primary"
            key="getDownloadLocation"
            onClick={handleDownloadsLocations}
            disabled={!selectedCity}
          >
            {t('gisHeatMapPage:DOWNLOAD_LOCATIONS')}
          </Button>
          <Button
            block
            className={classes.buttonWrapper}
            type="primary"
            key="getMissedOrder"
            onClick={handleMissedOrderLocations}
            disabled={!selectedCity}
          >
            {t('gisHeatMapPage:MISSED_ORDERS_LOCATIONS')}
          </Button>
        </Col>
      </Card>
    </Col>
  );
};

export default Filter;
