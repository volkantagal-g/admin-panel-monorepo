import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getWarehousesSelector } from '@shared/containers/Select/Warehouse/redux/selectors';
import { getFranchisesSelector } from '@shared/containers/Select/Franchise/redux/selectors';

function MapField(props) {
  const { warehouseId, franchiseId } = props;

  const warehouses = useSelector(getWarehousesSelector.getData);
  const franchises = useSelector(getFranchisesSelector.getData);

  const name = useMemo(() => {
    const value = warehouseId ? warehouses?.find(obj => obj._id === warehouseId) :
      franchises?.find(obj => obj._id === franchiseId);
    return value?.name;
  }, [warehouseId, warehouses, franchiseId, franchises]);

  return (
    <span key={warehouseId}>
      { name }
    </span>
  );
}

export default MapField;
