import { Polygon } from 'react-yandex-maps';
import { useSelector } from 'react-redux';
import { find as _find } from 'lodash';

import { getReversedCoordinates } from '../../utils';
import { polygonsSelector, filtersSelector } from '../../redux/selectors';

const CourierMarkers = () => {
  const filters = useSelector(filtersSelector.getFilters);
  const polygons = useSelector(polygonsSelector.getData);
  const selectedPolygon = _find(polygons, polygon => polygon.polygonType === filters?.polygonType);

  return (
    <Polygon
      key={selectedPolygon?._id}
      geometry={getReversedCoordinates(selectedPolygon?.polygon?.coordinates)}
      options={{ fill: false, strokeColor: '#000' }}
    />
  );
};

export default CourierMarkers;
