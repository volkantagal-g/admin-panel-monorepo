import { useMapEvents, useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { Creators } from '../../../redux/actions';

const MapZoomCenter = () => {
  const map = useMap();
  const dispatch = useDispatch();

  const handleMapZoom = mapObj => {
    dispatch(Creators.setMapZoom(mapObj));
  };

  const handleSetMapCenter = mapObj => {
    dispatch(Creators.setMapCenter(mapObj));
  };

  useMapEvents({
    zoom: () => {
      const mapCenter = map.getCenter();
      const zoomLevel = map.getZoom();
      handleMapZoom({ zoom: zoomLevel });
      handleSetMapCenter({ center: [mapCenter.lat, mapCenter.lng] });
    },
    dragend: () => {
      const mapCenter = map.getCenter();
      const zoomLevel = map.getZoom();
      handleMapZoom({ zoom: zoomLevel });
      handleSetMapCenter({ center: [mapCenter.lat, mapCenter.lng] });
    },
    popupopen: () => {
      const mapCenter = map.getCenter();
      const zoomLevel = map.getZoom();
      handleMapZoom({ zoom: zoomLevel });
      handleSetMapCenter({ center: [mapCenter.lat, mapCenter.lng] });
    },
    popupclose: () => {
      const mapCenter = map.getCenter();
      const zoomLevel = map.getZoom();
      handleMapZoom({ zoom: zoomLevel });
      handleSetMapCenter({ center: [mapCenter.lat, mapCenter.lng] });
    },
  });
  return null;
};

export default MapZoomCenter;
