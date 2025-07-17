import { memo, useCallback, useEffect, useRef, useState } from 'react';

import WarehouseTotalCounts from '../WarehouseTotalCounts';

const ITEM_PER_SCROLL = 50;

const WarehouseListByCountry = ({
  getWarehouseListByCountry,
  warehouseMap,
  courierPlanAndCounts,
  searchTerm,
  countryId,
  domainType,
  domainTypeForSort,
  classes,
}) => {
  const lastItemRef = useRef(null);
  const [allWarehouses, setAllWarehouses] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);

  const loadMoreWarehouses = useCallback(() => {
    const hasMoreWarehouses = warehouseList.length < allWarehouses.length;
    if (hasMoreWarehouses) {
      const newWarehouses = allWarehouses.slice(
        warehouseList.length,
        warehouseList.length + ITEM_PER_SCROLL,
      );
      setWarehouseList(prevWarehouseList => [
        ...prevWarehouseList,
        ...newWarehouses,
      ]);
    }
  }, [allWarehouses, warehouseList.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          loadMoreWarehouses();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(lastItemRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadMoreWarehouses]);

  useEffect(() => {
    const allWarehousesByCountry = getWarehouseListByCountry({
      countryId,
      domainType,
      domainTypeForSort,
    });
    setWarehouseList(allWarehousesByCountry.slice(0, ITEM_PER_SCROLL));
    setAllWarehouses(allWarehousesByCountry);
  }, [countryId, domainType, domainTypeForSort, getWarehouseListByCountry]);

  return (
    <>
      {warehouseList.map(warehouseId => (
        <WarehouseTotalCounts
          key={warehouseId}
          warehouseMap={warehouseMap}
          courierPlanAndCounts={courierPlanAndCounts}
          countryId={countryId}
          domainType={domainType}
          warehouseId={warehouseId}
          searchTerm={searchTerm}
          classes={classes}
        />
      ))}
      <tr ref={lastItemRef} className={classes.parentTableRow} />
    </>
  );
};

export default memo(WarehouseListByCountry);
