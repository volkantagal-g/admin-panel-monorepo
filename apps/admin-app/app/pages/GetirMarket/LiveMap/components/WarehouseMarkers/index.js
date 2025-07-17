import { useRef } from 'react';
import { get, includes } from 'lodash';
import { ObjectManager } from 'react-yandex-maps';

import { warehouseMarkersByDomainTypeByStatus } from '@shared/shared/mapIcons';

import {
  WAREHOUSE_STATE,
  GETIR_10_DOMAIN_TYPE,
  GETIR_MARKET_DOMAIN_TYPE,
  GETIR_VOYAGER_DOMAIN_TYPE,
  MARKER_Z_INDEXES,
} from '@shared/shared/constants';
import { isGetirMarketRelatedWarehouse } from '../../utils';

const WarehouseMarkers = ({ warehousesData, selectedDomainType, selectedCity, getReverseCoord, handlePlaceMarkClick }) => {
  const ymapsRef = useRef();

  const handleWarehouseMarkerClick = e => {
    const overlay = e.get('overlay');
    const warehouse = get(overlay, ['_data', 'warehouse']);
    handlePlaceMarkClick(warehouse, 'warehouse');
  };

  const getFeatures = () => {
    const features = warehousesData
      .filter(warehouse => {
        if (!isGetirMarketRelatedWarehouse(warehouse)) return false;
        if (selectedDomainType && !warehouse.domainTypes.includes(selectedDomainType)) return false;
        if (warehouse?.city !== selectedCity) return false;
        if (warehouse?.state !== WAREHOUSE_STATE.ACTIVE) return false;
        if (warehouse?.isTestWarehouse) return false;
        return true;
      })
      .map(warehouse => {
        const { _id, status, domainTypes, location } = warehouse;
        const { coordinates } = location;
        let iconImageHref;

        const isServing10 = includes(domainTypes, GETIR_10_DOMAIN_TYPE);
        const isServing30 = includes(domainTypes, GETIR_MARKET_DOMAIN_TYPE);
        const isServingVoyager = includes(domainTypes, GETIR_VOYAGER_DOMAIN_TYPE);

        if (isServing10 && isServing30) {
          iconImageHref = warehouseMarkersByDomainTypeByStatus.MERGED[status];
        }
        else if (isServing30) {
          iconImageHref = warehouseMarkersByDomainTypeByStatus[GETIR_MARKET_DOMAIN_TYPE][status];
        }
        else if (isServingVoyager) {
          iconImageHref = warehouseMarkersByDomainTypeByStatus[GETIR_VOYAGER_DOMAIN_TYPE][status];
        }
        else iconImageHref = warehouseMarkersByDomainTypeByStatus[GETIR_10_DOMAIN_TYPE][status];

        return {
          type: 'Feature',
          id: _id,
          markerType: 'warehouse',
          warehouse,
          geometry: {
            type: 'Point',
            coordinates: getReverseCoord(coordinates),
          },
          options: {
            iconLayout: 'default#image',
            iconImageHref,
            iconImageSize: [12, 12],
            iconImageOffset: [-6, -12],
            zIndex: MARKER_Z_INDEXES.WAREHOUSE,
            draggable: false,
          },
        };
      });
    if (ymapsRef && ymapsRef.current) {
      // eslint-disable-next-line no-underscore-dangle
      ymapsRef.current.objects.events._clearType('click');
      ymapsRef.current.objects.events.add('click', handleWarehouseMarkerClick);
    }
    return {
      type: 'FeatureCollection',
      features,
    };
  };

  return (
    <ObjectManager
      instanceRef={ref => {
        ymapsRef.current = ref;
      }}
      features={getFeatures()}
    />
  );
};
export default WarehouseMarkers;
