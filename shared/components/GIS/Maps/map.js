import { useState } from 'react';
import { MapContainer } from 'react-leaflet';
import * as Leaflet from 'leaflet';

import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

import BaseLayers from '@shared/components/GIS/Maps/components/baseLayers';
import { CENTER_OF_TURKEY, MAP_DEFAULT_ZOOM } from '@shared/components/GIS/Maps/utils/constants';

import useStyles from './styles';
import 'leaflet/dist/leaflet.css';
import './utils/leaflet/LeafletZoominfo';

// eslint-disable-next-line no-underscore-dangle
delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

const Maps = (
  {
    currentZoom = MAP_DEFAULT_ZOOM,
    center = CENTER_OF_TURKEY,
    showZoom = true,
    flyOnCenterChange = false,
    doubleClickZoomable = true,
    viewChange = true,
    classname = null,
    onGeoJsonClick,
    children,
    ...otherProps
  },
) => {
  const classes = useStyles();
  const [map, setMap] = useState(null);

  const handleFlyOnCenterChange = () => {
    if (flyOnCenterChange && map) {
      map.flyTo(center, currentZoom);
    }
    if (!flyOnCenterChange && map) {
      map.setView(center, currentZoom, { animate: false });
    }
    return undefined;
  };

  return (
    <MapContainer
      {...otherProps}
      center={center} // [lat, lon]
      zoom={currentZoom}
      className={classname === null ? classes.mapFlex : classname}
      whenCreated={setMap}
      zoomControl={false}
      doubleClickZoom={doubleClickZoomable}
    >
      <BaseLayers showZoom={showZoom} />
      {viewChange ? handleFlyOnCenterChange() : undefined}
      {children}
    </MapContainer>
  );
};

export default Maps;
