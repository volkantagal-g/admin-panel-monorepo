import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Card } from 'antd';

import { FormatPainterOutlined } from '@ant-design/icons';

import { reverse } from 'lodash';

import { Creators } from '../../redux/actions';
import AvailableStatsForm from '../AvailableStatsForm';
import AnalysisForm from '../SpatialAnalysisForm';
import PolygonFilter from '../PolygonFilter';
import CustomStylingDrawer from '../CustomStylingDrawer';
import SelectStatsStyle from '../SelectStatsStyle';
import useStyles from './styles';
import { locationIntelligenceSelector } from '@app/pages/GIS/LocationIntelligence/redux/selectors';

import { getCitiesSelector } from '@shared/redux/selectors/common';
import { DEFAULT_MAP_OPTIONS } from '../../utils/constants';

const MapSideBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cities = useSelector(getCitiesSelector.getData);
  const availableStats = useSelector(locationIntelligenceSelector.getAvailableStatsData);
  const polygons = useSelector(locationIntelligenceSelector.getPolygons);
  const statsFilters = useSelector(locationIntelligenceSelector.getStatsLocationsFilters);
  const { statTypes } = statsFilters;

  const [isPolygonFormDisabled, setIsPolygonFormDisabled] = useState(true);
  const [isAnalysisFormDisabled, setIsAnalysisFormDisabled] = useState(true);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState(true);

  const [analyticTypesData, setAnalyticTypesData] = useState();
  const [polygonData, setPolygonData] = useState([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedStatType, setSelectedStatType] = useState();

  const handleAvailableStatsFilterChange = useCallback(filters => {
    dispatch(Creators.setAvailableStatsFilters({ filters }));
    setIsPolygonFormDisabled(false);
  }, [dispatch]);

  const handleFiltersChange = useCallback((filters = {}) => {
    setIsAnalysisFormDisabled(true);
    setAreButtonsDisabled(true);
    dispatch(Creators.resetPolygons());
    return dispatch(Creators.setPolygonFilters({ filters }));
  }, [dispatch]);

  const handleAvailableStatsFormOnFinish = useCallback(() => {
    dispatch(Creators.getAvailableStatsRequest());
  }, [dispatch]);

  const handleAnalysisFiltersChange = useCallback(filters => {
    dispatch(Creators.setStatsLocationsFilters({ filters }));
  }, [dispatch]);

  const handleAnalysisFormOnFinish = useCallback(() => {
    dispatch(Creators.getStatsLocationsRequest());
    setAreButtonsDisabled(false);
  }, [dispatch]);

  const handleGetPolygons = useCallback(() => {
    dispatch(Creators.getPolygonsRequest());
    setIsAnalysisFormDisabled(false);
  }, [dispatch]);

  const handleSelectedStyle = useCallback(buttonValue => {
    const type = buttonValue?.type;
    const styles = buttonValue?.styles;
    setSelectedStatType(type);
    dispatch(Creators.setMapOptions({ isShowCustomStyledPolygons: false }));
    dispatch(Creators.setSelectedStyle({ style: styles }));
  }, [dispatch]);

  const handleMapOptionsChange = ({ isShowWarehousesMarker }) => {
    dispatch(Creators.setMapOptions({ isShowWarehousesMarker }));
  };

  const handleOnCustomStyleApply = useCallback(customStyleProps => {
    dispatch(Creators.setMapOptions({ isShowCustomStyledPolygons: true }));
    dispatch(Creators.setCustomStyleProps({ customStyleProps }));
  }, [dispatch]);

  const handleSetCustomStyle = useCallback(style => {
    dispatch(Creators.setSelectedStyle({ style }));
  }, [dispatch]);

  const handleCityChange = useCallback(({ selectedCity }) => {
    const center = reverse([...selectedCity.center.coordinates]);
    dispatch(Creators.setMapZoom({ zoom: DEFAULT_MAP_OPTIONS.ZOOM_LEVEL }));
    dispatch(Creators.setMapCenter({ center }));
  }, [dispatch]);

  useEffect(() => {
    if (availableStats) {
      const { analyticTypes } = availableStats;
      setAnalyticTypesData(analyticTypes);
    }
    if (polygons) {
      const polygonIds = polygons.map(polygon => polygon.id);
      setPolygonData(polygonIds);
    }
  }, [availableStats, polygons]);

  return (
    <div className={classes.sideBar}>
      <Card size="small">
        <AvailableStatsForm
          onFieldsChange={handleAvailableStatsFilterChange}
          onFinish={handleAvailableStatsFormOnFinish}
        />
      </Card>
      <Card size="small">
        <PolygonFilter
          cities={[...cities]}
          getPolygons={handleGetPolygons}
          isFormDisabled={isPolygonFormDisabled}
          onFiltersChange={handleFiltersChange}
          onMapOptionsChange={handleMapOptionsChange}
          onCityChange={handleCityChange}
        />
      </Card>
      <Card size="small">
        <AnalysisForm
          onFieldsChange={handleAnalysisFiltersChange}
          onFinish={handleAnalysisFormOnFinish}
          analyticTypes={analyticTypesData}
          polygons={polygonData}
          isFormDisabled={isAnalysisFormDisabled}
        />
      </Card>
      <Card size="small" className={areButtonsDisabled ? classes.radioCard : undefined}>
        <SelectStatsStyle
          onSelect={handleSelectedStyle}
          selectableTypes={statTypes}
          allStatTypes={analyticTypesData}
          statsFilters={statsFilters}
          isDisabled={areButtonsDisabled}
          onStyleUpdaterVisibilityChange={e => setIsDrawerVisible(e)}
        />
        <Button
          data-testid="custom-styler-button"
          block
          type="primary"
          ghost
          onClick={() => setIsDrawerVisible(true)}
          icon={<FormatPainterOutlined />}
        />
      </Card>
      <CustomStylingDrawer
        isVisible={isDrawerVisible}
        onVisibilityChange={e => setIsDrawerVisible(e)}
        setSelectedStyle={handleSetCustomStyle}
        selectedStatType={selectedStatType}
        onApply={handleOnCustomStyleApply}
      />
    </div>
  );
};

export default MapSideBar;
