import { useRef, useState, useEffect } from 'react';
import { get } from 'lodash';
import { ObjectManager } from 'react-yandex-maps';
import { useSelector } from 'react-redux';

import { VEHICLE_TYPE, COURIER_STATUS_BUSY, MARKER_Z_INDEXES } from '@shared/shared/constants';
import { courierIcons } from '@shared/shared/mapIcons';

import { showCourierTypeSelector } from '../../redux/selectors';
import { isGetirMarketRelatedCourier } from '../../utils';

const { E_BICYCLE, E_MOTORCYCLE, MITU, MOTO, ON_FOOT, VAN, E_CAR, MOTO_50CC } = VEHICLE_TYPE;

const CourierMarkers = ({ couriers, selectedDomainType, handlePlaceMarkClick, getReverseCoord }) => {
  const ymapsRef = useRef();
  const {
    showEMotorcycleCouriers,
    showMoto50ccCouriers,
    showMotoCouriers,
    showEBicycleCouriers,
    showCarCouriers,
    showOnFootCouriers,
    showBusyCouriers,
    showMiTuCouriers,
    showECarCouriers,
  } = useSelector(showCourierTypeSelector);

  const [visibleCouriers, setVisibleCouriers] = useState([]);

  useEffect(() => {
    const filteredCouriers = couriers
      .filter(courier => {
        if (!isGetirMarketRelatedCourier(courier)) return false;
        const courierDomainTypes = get(courier, 'domainTypes', []);
        if (selectedDomainType && !courierDomainTypes.includes(selectedDomainType)) return false;
        return true;
      })
      .filter(courier => {
        const { status, fleetVehicleType } = courier;

        let visible = true;

        if (status === COURIER_STATUS_BUSY && !showBusyCouriers) {
          visible = false;
        }
        else if (fleetVehicleType === VAN && !showCarCouriers) {
          visible = false;
        }
        else if (fleetVehicleType === MOTO && !showMotoCouriers) {
          visible = false;
        }
        else if (fleetVehicleType === MOTO_50CC && !showMoto50ccCouriers) {
          visible = false;
        }
        else if (fleetVehicleType === ON_FOOT && !showOnFootCouriers) {
          visible = false;
        }
        else if (fleetVehicleType === MITU && !showMiTuCouriers) {
          visible = false;
        }
        else if (fleetVehicleType === E_MOTORCYCLE && !showEMotorcycleCouriers) {
          visible = false;
        }
        else if (fleetVehicleType === E_BICYCLE && !showEBicycleCouriers) {
          visible = false;
        }
        else if (fleetVehicleType === E_CAR && !showECarCouriers) {
          visible = false;
        }
        else if (!fleetVehicleType) {
          visible = false;
        }
        return visible;
      });

    setVisibleCouriers(filteredCouriers);
  }, [
    couriers,
    showEMotorcycleCouriers,
    showMotoCouriers,
    showMoto50ccCouriers,
    showEBicycleCouriers,
    showCarCouriers,
    showOnFootCouriers,
    showBusyCouriers,
    showMiTuCouriers,
    showECarCouriers,
    selectedDomainType,
  ]);

  const handleCourierMarkerClick = e => {
    const overlay = e.get('overlay');
    const courier = get(overlay, ['_data', 'courier']);
    handlePlaceMarkClick(courier, 'courier');
  };

  const getFeatures = () => {
    const features = visibleCouriers.map(courier => {
      const { _id, location, status, courierType, fleetVehicleType } = courier;
      const { coordinates } = location;

      let iconImageHref = null;
      if (fleetVehicleType) {
        iconImageHref = courierIcons[courierType][fleetVehicleType][status];
      }
      else {
        iconImageHref = courierIcons.noVehicleIcons[status];
      }

      return {
        type: 'Feature',
        id: _id,
        markerType: 'courier',
        courier,
        geometry: {
          type: 'Point',
          coordinates: getReverseCoord(coordinates),
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref,
          iconImageSize: [24, 24],
          iconImageOffset: [-12, -24],
          zIndex: MARKER_Z_INDEXES.COURIER,
          draggable: false,
        },
      };
    });

    if (ymapsRef.current) {
      const objManager = ymapsRef.current;
      // eslint-disable-next-line no-underscore-dangle
      objManager.objects.events._clearType('click');
      objManager.objects.events.add('click', handleCourierMarkerClick);
      setTimeout(() => {
        // eslint-disable-next-line no-underscore-dangle
        objManager._objectControllerAddon.getController()._refresh();
      }, 500);
    }
    return {
      type: 'FeatureCollection',
      features,
    };
  };

  const features = getFeatures();
  return (
    <ObjectManager
      instanceRef={ref => {
        ymapsRef.current = ref;
      }}
      features={features}
    />
  );
};
export default CourierMarkers;
