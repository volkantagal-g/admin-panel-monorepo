export const getWarehousesByCityMap = warehouses => {
  const warehousesByCityMap = {};
  warehouses.forEach(warehouse => {
    const cityId = warehouse?.city?._id;
    if (cityId) {
      if (!warehousesByCityMap[cityId]) {
        warehousesByCityMap[cityId] = [];
      }
      warehousesByCityMap[cityId].push(warehouse);
    }
  });
  return warehousesByCityMap;
};
