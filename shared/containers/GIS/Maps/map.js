import maplibregl from 'maplibre-gl';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import
{
  Map as MapGL,
  NavigationControl,
  ScaleControl,
  FullscreenControl,
  GeolocateControl,
} from 'react-map-gl';

import 'maplibre-gl/dist/maplibre-gl.css';
import { useDispatch, useSelector } from 'react-redux';

import saga from '@shared/containers/GIS/Maps/redux/saga';
import reducer from '@shared/containers/GIS/Maps/redux/reducer';
import { Creators } from '@shared/containers/GIS/Maps/redux/actions';
import { gisMapsSelector } from '@shared/containers/GIS/Maps/redux/selectors';
import { useInjectReducer } from '@shared/utils/injectReducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import { REDUX_KEY } from '@shared/shared/constants';

import useStyles from './styles';

import BaseMapControl from './components/baseMapControl';

const Maps = forwardRef(({
  id = 'map',
  dataTestId = 'map-container',
  showScaleControl = true,
  showNavigationControl = true,
  showFullScreenControl = true,
  showGeoLocateControl = true,
  showBaseMapControl = true,
  latitude,
  longitude,
  zoom,
  mode = 'fly',
  classname = null,
  onClick = () => {},
  onMapEvents = () => {},
  bounds,
  children,
  ...otherProps
}, ref) => {
  const dispatch = useDispatch();
  const mapRef = useRef();
  const mapStyle = useSelector(gisMapsSelector.getMapStyle);
  const classes = useStyles();
  const reduxKey = REDUX_KEY.GIS.MAPS;
  useInjectSaga({ key: reduxKey, saga });
  useInjectReducer({ key: reduxKey, reducer });

  const handleMapOnLoad = e => {
    return e.target.resize();
  };
  const handleOnClick = e => {
    return onClick(e);
  };

  const handleMapIdleEvent = e => {
    const latLng = e.target.getCenter();
    const zoomLevel = e.target.getZoom();
    const { lat, lng } = latLng;

    if (!(lat && lng)) return null;
    return onMapEvents({ viewState: { latitude: lat, longitude: lng, zoom: zoomLevel } });
  };

  useEffect(() => {
    dispatch(Creators.initMaps());
    return () => {
      dispatch(Creators.destroyMaps());
    };
  }, [dispatch]);

  useEffect(() => {
    if (mode === 'fly') {
      mapRef.current?.flyTo({ center: [longitude, latitude], zoom, duration: 5000 });
    }
    if (mode === 'jump') {
      mapRef.current?.jumpTo({ center: [longitude, latitude], zoom });
    }
  }, [bounds, latitude, longitude, mode, zoom]);

  useImperativeHandle(ref, () => mapRef, [mapRef]);

  return (
    <div
      data-testid={dataTestId}
      className={classname === null ? classes.mapWrapper : classname}
    >
      <MapGL
        id={id}
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={{ latitude, longitude, zoom }}
        mapStyle={mapStyle}
        styleDiffing
        onIdle={handleMapIdleEvent}
        onLoad={handleMapOnLoad}
        onClick={handleOnClick}
        reuseMaps
        {...otherProps}
      >
        {showNavigationControl ? <NavigationControl visualizePitch /> : null}
        {showScaleControl ? <ScaleControl /> : null}
        {showFullScreenControl ? <FullscreenControl /> : null}
        {showGeoLocateControl ? <GeolocateControl /> : null}
        {showBaseMapControl ? <BaseMapControl /> : null}
        {children}
      </MapGL>
    </div>
  );
});

export default (Maps);
