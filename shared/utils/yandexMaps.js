import { COURIER_TYPE, MARKER_Z_INDEXES } from '@shared/shared/constants';
import { courierIcons } from '@shared/shared/mapIcons';

export const createCourierMarkerFeature = (
  courier,
  {
    zIndex = MARKER_Z_INDEXES.COURIER,
    draggable = false,
    iconLayout = 'default#image',
    iconImageSize = [24, 24],
    iconImageOffset = [-12, -24],
    hintContentKey,
  } = {},
) => {
  const { courierType = COURIER_TYPE.GM, location, status, fleetVehicleType } = courier;

  if (!location || !location.coordinates || !status || !fleetVehicleType) {
    // eslint-disable-next-line no-console
    console.warn('Some mandatory parameters not found', { courier });
  }

  const { coordinates } = location;
  const reversedCoordinates = [...coordinates].reverse();

  let iconImageHref = null;

  if (fleetVehicleType) {
    iconImageHref = courierIcons[courierType][fleetVehicleType][status];
  }

  return {
    courier,
    id: courier._id || courier.id,
    key: courier._id || courier.id,
    type: 'Feature',
    markerType: 'courier',
    geometry: {
      type: 'Point',
      coordinates: reversedCoordinates,
    },
    options: {
      iconImageHref,
      zIndex,
      draggable,
      iconLayout,
      iconImageSize,
      iconImageOffset,
    },
    modules: [...(hintContentKey ? ['geoObject.addon.hint'] : [])],
    properties: { ...(hintContentKey && { hintContent: courier[hintContentKey] }) },
  };
};
