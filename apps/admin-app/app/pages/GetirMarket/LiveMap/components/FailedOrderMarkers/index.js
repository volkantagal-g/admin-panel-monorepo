import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import { ObjectManager } from 'react-yandex-maps';

import { getReversedCoordinate } from '@shared/utils/common';
import { MARKER_Z_INDEXES } from '@shared/shared/constants';
import { failMarketOrderIcons } from '@shared/shared/mapIcons';

import { DOMAIN_TYPE_Z_INDEX_IDENTIFIERS, FINANCIAL_ERROR_CODES } from '../../constants';
import { failedOrdersSelector } from '../../redux/selectors';

function FailedOrderMarkers(props) {
  const { handleFailedOrderClick, selectedDomainType } = props;
  const ymapsRef = useRef();

  const failedOrderMarkers = useSelector(failedOrdersSelector.getFailedOrderMarkers);

  const visibleFailedOrderMarkers = useMemo(() => {
    return failedOrderMarkers.filter((({ domainType }) => !(selectedDomainType && domainType !== selectedDomainType)));
  }, [failedOrderMarkers, selectedDomainType]);

  return (
    <ObjectManager
      instanceRef={ref => {
        ymapsRef.current = ref;
      }}
      features={getFeatures()}
    />
  );

  function getFeatures() {
    const features = visibleFailedOrderMarkers.map(failedOrder => {
      const { id, deliveryAddress, returnCode, domainType } = failedOrder;
      const { location: { coordinates } } = deliveryAddress;

      let iconImageHref = failMarketOrderIcons[domainType].RED;
      if (FINANCIAL_ERROR_CODES.includes(returnCode)) {
        iconImageHref = failMarketOrderIcons[domainType].FAIL;
      }
      return {
        type: 'Feature',
        id,
        markerType: 'failedOrder',
        failedOrder,
        geometry: {
          type: 'Point',
          coordinates: getReversedCoordinate(coordinates),
        },
        options: {
          iconLayout: 'default#image',
          iconImageHref,
          iconImageSize: [26, 26],
          iconImageOffset: [-13, -26],
          zIndex: MARKER_Z_INDEXES[`FAIL_${DOMAIN_TYPE_Z_INDEX_IDENTIFIERS[domainType]}_ORDER_MARKER`],
          draggable: false,
        },
      };
    });

    if (ymapsRef.current) {
      const objManager = ymapsRef.current;
      // eslint-disable-next-line no-underscore-dangle
      objManager.objects.events._clearType('click');
      objManager.objects.events.add('click', e => {
        const overlay = e.get('overlay');
        const failedOrder = get(overlay, ['_data', 'failedOrder']);
        handleFailedOrderClick(failedOrder, 'failedOrder');
      });
      setTimeout(() => {
        // eslint-disable-next-line no-underscore-dangle
        objManager._objectControllerAddon.getController()._refresh();
      }, 500);
    }

    return {
      type: 'FeatureCollection',
      features,
    };
  }
}

export default FailedOrderMarkers;
