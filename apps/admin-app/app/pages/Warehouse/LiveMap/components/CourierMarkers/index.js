import { useRef, useEffect, useCallback } from 'react';
import { ObjectManager } from 'react-yandex-maps';
import { useDispatch, useSelector } from 'react-redux';
import { get as _get } from 'lodash';

import { couriersSelector } from '../../redux/selectors';
import { Creators } from '../../redux/actions';

const CourierMarkers = () => {
  const objectManagerRef = useRef();
  const dispatch = useDispatch();
  const features = useSelector(couriersSelector.getMarkerFeatures);

  const memoizedHandleCourierMarketClick = useCallback(event => {
    const overlay = event.get('overlay');
    const courier = _get(overlay, ['_data', 'courier']);

    dispatch(Creators.setSelectedPlaceMark({
      data: courier,
      eventType: 'courier',
    }));
  }, [dispatch]);

  const updateObjectManager = newRef => {
    objectManagerRef.current = newRef;
  };

  useEffect(() => {
    if (objectManagerRef.current) {
      // eslint-disable-next-line no-underscore-dangle
      objectManagerRef.current.objects.events._clearType('click');
      objectManagerRef.current.objects.events.add('click', memoizedHandleCourierMarketClick);
      setTimeout(() => {
        // eslint-disable-next-line no-underscore-dangle
        objectManagerRef.current?._objectControllerAddon.getController()._refresh();
      }, 500);
    }
  }, [objectManagerRef, features, memoizedHandleCourierMarketClick]);

  return (
    <ObjectManager
      instanceRef={updateObjectManager}
      features={{
        type: 'FeatureCollection',
        features,
      }}
    />
  );
};

export default CourierMarkers;
