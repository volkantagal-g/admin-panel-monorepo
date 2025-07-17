import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Divider, Switch } from 'antd';

import { useTranslation } from 'react-i18next';

import confirm from 'antd/lib/modal/confirm';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import { get } from 'lodash';

import BannedAreasList from '@app/pages/GIS/BannedAreas/components/MapSidebar/List';
import BannedAreaForm from '@app/pages/GIS/BannedAreas/components/MapSidebar/Form';
import ScheduledBannedAreaForm from '@app/pages/GIS/BannedAreas/components/MapSidebar//ScheduledBannedAreaForm';
import VectorialDataSwitchers from '@app/pages/GIS/BannedAreas/components/MapSidebar/VectorialDataSwitchers';
import useStyles from './styles';
import { bannedAreaPageSelector } from '@app/pages/GIS/BannedAreas/redux/selectors';
import { Creators } from '@app/pages/GIS/BannedAreas/redux/actions';
import { getCitiesSelector } from '@shared/redux/selectors/common';
import { createBannedPolygonRequestBody, transformTimeStringToTimeZone, transformScheduledBannedPolygonRequestBody } from '../../utils/helper';
import { getSelectedCountryV2 } from '@shared/redux/selectors/countrySelection';
import { optionClassNames } from '../../utils/constants';
import { usePermission } from '@shared/hooks';
import permKey from '@shared/shared/permKey.json';

const { success, danger } = optionClassNames;

function MapSidebar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { t } = useTranslation('gisBannedAreasPage');
  const { Can } = usePermission();

  const [selectedCity, setSelectedCity] = useState();
  const featureCollection = useSelector(bannedAreaPageSelector.getFeatureCollection);
  const cities = useSelector(getCitiesSelector.getData);
  const values = useSelector(bannedAreaPageSelector.getFormValues);
  const scheduledBanFormValues = useSelector(bannedAreaPageSelector.getscheduledBanFormValues);
  const geometry = useSelector(bannedAreaPageSelector.getGeometry);
  const tempFeatureCollection = useSelector(bannedAreaPageSelector.getTempGeoJson);
  const bannedAreas = useSelector(bannedAreaPageSelector.getBannedAreas);
  const scheduledBannedAreas = useSelector(bannedAreaPageSelector.getScheduledBannedAreas);
  const isBannedAreasPending = useSelector(bannedAreaPageSelector.getBannedAreasLoading);
  const isScheduledBannedAreasPending = useSelector(bannedAreaPageSelector.getScheduledBannedAreasLoading);
  const selectedCountry = useSelector(getSelectedCountryV2);
  const selectedTimeZone = get(selectedCountry, 'timezones.0.timezone');

  const [isScheduledBanFormShow, setIsScheduledBanFormShow] = useState(false);

  const handleCreateBannedArea = () => {
    if (geometry[0] !== undefined) {
      const requestBody = tempFeatureCollection.features.map(feature => createBannedPolygonRequestBody({ formValues: values, geometry: feature.geometry }));
      dispatch(Creators.createMultiBannedAreaRequest({ features: requestBody }));
    }
    else {
      const requestBody = createBannedPolygonRequestBody({ formValues: values, geometry });
      dispatch(Creators.createBannedAreaRequest({ reqBody: requestBody }));
    }
    featureCollection.clearLayers();
  };

  const handleFieldsChange = (formValues = {}) => {
    dispatch(Creators.setFormValues({ formValues }));
  };

  const handleCreateScheduledBannedArea = useCallback(() => {
    let reqBody;
    const polygons = (geometry[0] === undefined) ? [{ geometry }] : tempFeatureCollection.features;
    reqBody = { ...scheduledBanFormValues, polygons, isActive: true };
    reqBody = transformScheduledBannedPolygonRequestBody({ body: reqBody });
    featureCollection.clearLayers();
    return dispatch(Creators.createScheduledBannedAreaRequest({ reqBody }));
  }, [dispatch, featureCollection, geometry, scheduledBanFormValues, tempFeatureCollection?.features]);

  const showConfirm = useCallback(() => {
    const startTime = transformTimeStringToTimeZone(scheduledBanFormValues.startTime, selectedTimeZone);
    const endTime = transformTimeStringToTimeZone(scheduledBanFormValues.endTime, selectedTimeZone);

    confirm({
      title: t('gisBannedAreasPage:CREATE_SCHEDULED_BANNED_AREA'),
      icon: <ExclamationCircleOutlined />,
      content: t('TIME_ZONE_INFORMATION', {
        startTime,
        endTime,
        timeZone: selectedTimeZone,
      }),
      onOk() {
        handleCreateScheduledBannedArea();
      },
    });
  }, [
    handleCreateScheduledBannedArea,
    scheduledBanFormValues.endTime,
    scheduledBanFormValues.startTime,
    selectedTimeZone,
    t,
  ]);

  const handleScheduledBanFieldsChange = (formValues = {}) => {
    dispatch(Creators.setScheduledBanFormValues({ scheduledBanFormValues: formValues }));
  };

  const handleMapCenterChange = center => {
    dispatch(Creators.setMapCenter(center));
  };

  const handleClearSubregions = () => {
    dispatch(Creators.getG10PolygonsSuccess([]));
    dispatch(Creators.getGbPolygonsSuccess([]));
    dispatch(Creators.getGsPolygonsSuccess([]));
  };

  const handleFormSwitch = useCallback(status => {
    setIsScheduledBanFormShow(status);
    dispatch(Creators.setIsScheduledBanFormShow({ isScheduledBanFormShow: status }));
    dispatch(Creators.setFormValues({}));
    dispatch(Creators.setScheduledBanFormValues({}));
    dispatch(Creators.setMapOptions({ isShowG10Areas: false, isShowGBAreas: false, isShowGSAreas: false }));
    setSelectedCity();
  }, [dispatch]);

  return (
    <Col xs={24} sm={24} md={24} lg={6}>
      <Card
        title={t(isScheduledBanFormShow ? 'CREATE_SCHEDULED_BANNED_AREA' : 'CREATE_BANNED_AREA')}
        className={classes.cardWrapper}
        extra={(
          <Can permKey={permKey.PAGE_GIS_BANNED_AREAS_COMPONENT_SCHEDULED_BAN_SWITCH}>
            <Switch
              data-testid="form-switcher"
              checked={isScheduledBanFormShow}
              onChange={handleFormSwitch}
              className={isScheduledBanFormShow ? success : danger}
              disabled={isBannedAreasPending && isScheduledBannedAreasPending}
            />
          </Can>
        )}
      >
        {isScheduledBanFormShow ? (
          <ScheduledBannedAreaForm
            cities={[...cities]}
            handleSelectedCity={setSelectedCity}
            handleMapCenter={handleMapCenterChange}
            handleClearSubregions={handleClearSubregions}
            createScheduledBannedArea={() => showConfirm()}
            handleFieldsChange={handleScheduledBanFieldsChange}
          />
        ) : (
          <BannedAreaForm
            cities={[...cities]}
            handleSelectedCity={setSelectedCity}
            handleMapCenter={handleMapCenterChange}
            handleClearSubregions={handleClearSubregions}
            createBannedArea={handleCreateBannedArea}
            handleFieldsChange={handleFieldsChange}
          />
        )}
        <VectorialDataSwitchers disableSwitcher={!selectedCity} />
        <Divider />
        <Can permKey={permKey.PAGE_GIS_BANNED_AREAS_COMPONENT_LIST}>
          <BannedAreasList
            isScheduledBanList={isScheduledBanFormShow}
            bannedAreas={
              isScheduledBanFormShow ?
                scheduledBannedAreas :
                bannedAreas
            }
            isPending={
              isScheduledBanFormShow ?
                isScheduledBannedAreasPending :
                isBannedAreasPending
            }
          />
        </Can>
      </Card>
    </Col>
  );
}

export default MapSidebar;
