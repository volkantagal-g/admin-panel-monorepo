import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.GIS.BANNED_AREAS;

export const bannedAreaPageSelector = {
  getBannedAreas: state => state?.[reducerKey]?.bannedAreas?.data,
  getBannedAreasLoading: state => state?.[reducerKey]?.bannedAreas?.isPending,
  getFilters: state => state?.[reducerKey]?.filters,
  getFormValues: state => state?.[reducerKey]?.formValues,
  getGeometry: state => state?.[reducerKey]?.geometry,
  getFeatureCollection: state => state?.[reducerKey]?.featureCollection,
  getMapOptions: state => state?.[reducerKey]?.mapOptions,
  getTempGeoJson: state => state?.[reducerKey]?.tempGeoJson,
  getG10Polygons: state => state?.[reducerKey]?.g10Polygons?.data,
  getGbPolygons: state => state?.[reducerKey]?.gbPolygons?.data,
  getGsPolygons: state => state?.[reducerKey]?.gsPolygons?.data,
  getScheduledBannedAreas: state => state?.[reducerKey]?.scheduledBannedAreas?.data,
  getScheduledBannedAreasLoading: state => state?.[reducerKey]?.scheduledBannedAreas?.isPending,
  getscheduledBanFormValues: state => state?.[reducerKey]?.scheduledBanFormValues,
  getIsScheduledBanFormShow: state => state?.[reducerKey]?.isScheduledBanFormShow,
};
